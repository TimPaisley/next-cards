import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import Row from './Row'
import SortableItem from './SortableItem'

export default function SortableContainer({ id, highlight = false, items, itemMap, activeId }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={horizontalListSortingStrategy}>
      <div ref={setNodeRef}>
        <Row
          highlight={highlight}
          items={items}
          renderItem={(id) => (
            <SortableItem key={id} card={itemMap[id]} isActive={id === activeId} />
          )}
        />
      </div>
    </SortableContext>
  )
}
