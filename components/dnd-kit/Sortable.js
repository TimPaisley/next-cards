import { DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'

import Context from './Context'
import SortableContainer from './SortableContainer'
import { Item } from './SortableItem'

export default function Sortable() {
  const [items, setItems] = useState({
    animals: ['cat', 'dog', 'rabbit', 'chicken'],
    fruit: ['apple', 'banana', 'orange', 'kiwifruit']
  })
  const [activeId, setActiveId] = useState()

  return (
    <Context id="dnd-context" items={items} setItems={setItems} setActiveId={setActiveId}>
      <div className="flex-grow flex flex-col justify-end">
        <SortableContainer id="animals" items={items.animals} activeId={activeId} />
        <SortableContainer id="fruit" items={items.fruit} activeId={activeId} />
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </Context>
  )
}
