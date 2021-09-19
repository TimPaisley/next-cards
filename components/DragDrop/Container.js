import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import Row from '../Row'
import Item from './Item'
import { strategy } from './Strategy'

export default function Container({ id, highlight = false, items, itemMap, activeId }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={strategy}>
      <div ref={setNodeRef}>
        <Row
          highlight={highlight}
          items={items}
          renderItem={(id) => <Item key={id} card={itemMap[id]} isActive={id === activeId} />}
        />
      </div>
    </SortableContext>
  )
}
