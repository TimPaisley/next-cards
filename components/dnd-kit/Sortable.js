import { DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'

import Context from './Context'
import SortableContainer from './SortableContainer'
import { Item } from './SortableItem'
import Trash from './Trash'

export default function Sortable() {
  const [items, setItems] = useState({
    animals: ['cat', 'dog', 'rabbit', 'chicken'],
    fruit: ['apple', 'banana', 'orange', 'kiwifruit'],
    void: []
  })
  const [activeId, setActiveId] = useState()

  return (
    <Context id="dnd-context" items={items} setItems={setItems} setActiveId={setActiveId}>
      <div className="flex-grow flex justify-end">{activeId && <Trash />}</div>
      <div className="flex flex-col">
        <SortableContainer id="animals" items={items.animals} activeId={activeId} />
        <SortableContainer id="fruit" items={items.fruit} activeId={activeId} />
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </Context>
  )
}
