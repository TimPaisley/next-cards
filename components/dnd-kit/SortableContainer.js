import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

export default function SortableContainer({ id, items, activeId }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={horizontalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className="p-2 mb-4 flex justify-center space-x-2 bg-gray-100 rounded-md">
        {items.map((id) => (
          <SortableItem key={id} id={id} active={id === activeId} />
        ))}
      </div>
    </SortableContext>
  )
}
