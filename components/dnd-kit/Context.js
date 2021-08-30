import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'

export default function Context({ children, id, items, setItems, setActiveId }) {
  const [clonedItems, setClonedItems] = useState()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function findContainer(id) {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) => items[key].includes(id))
  }

  function validMove(overContainer, activeContainer) {
    if (!overContainer || !activeContainer) {
      return false
    }

    if (overContainer !== activeContainer) {
      if (overContainer === 'animals' && items.animals.length >= 4) {
        return false
      }
    }

    return true
  }

  function handleDragStart({ active }) {
    setActiveId(active.id)
    setClonedItems(items)
  }

  function handleDragOver({ active, over }) {
    const overId = over?.id
    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(overId)

    if (!validMove(overContainer, activeContainer)) {
      return
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer]
        const overItems = items[overContainer]
        const overIndex = overItems.indexOf(overId)
        const activeIndex = activeItems.indexOf(active.id)

        let newIndex

        if (overId in items) {
          newIndex = overItems.length + 1
        } else {
          const isBelowLastItem =
            over &&
            overIndex === overItems.length - 1 &&
            active.rect.current.translated &&
            active.rect.current.translated.offsetTop > over.rect.offsetTop + over.rect.height

          const modifier = isBelowLastItem ? 1 : 0

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
        }

        return {
          ...items,
          [activeContainer]: [...items[activeContainer].filter((item) => item !== active.id)],
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(newIndex, items[overContainer].length)
          ]
        }
      })
    }
  }

  function handleDragCancel() {
    if (clonedItems) {
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }

  function handleDragEnd({ active, over }) {
    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id || 'void'

    if (overId === 'void') {
      setItems((items) => ({
        ...(over?.id === 'void' ? items : clonedItems),
        ['void']: []
      }))
      setActiveId(null)
      return
    }

    const overContainer = findContainer(overId)

    if (!validMove(overContainer, activeContainer)) {
      setActiveId(null)
      return
    }

    if (activeContainer && overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id)
      const overIndex = items[overContainer].indexOf(overId)

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
        }))
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}
