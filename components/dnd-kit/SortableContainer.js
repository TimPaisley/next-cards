import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

export default function SortableContainer({ id, items, itemMap, activeId }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={horizontalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className="py-2 mb-4 flex justify-center space-x-2 bg-gray-100 rounded-md">
        {items.map((id) => (
          <SortableItem key={id} card={itemMap[id]} isActive={id === activeId} />
        ))}
      </div>
    </SortableContext>
  )
}
