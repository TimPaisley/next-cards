import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import classNames from 'classnames'

import SortableItem from './SortableItem'

export default function SortableContainer({ id, highlight = false, items, itemMap, activeId }) {
  const { setNodeRef } = useDroppable({ id })

  const twBase = 'py-2 pl-2 mb-4 flex justify-center space-x-2 rounded-md'
  const twHighlight = 'bg-gray-100'

  const className = classNames(twBase, { [twHighlight]: highlight })

  return (
    <SortableContext id={id} items={items} strategy={horizontalListSortingStrategy}>
      <div ref={setNodeRef} className={className}>
        {items.map((id) => (
          <SortableItem key={id} card={itemMap[id]} isActive={id === activeId} />
        ))}

        <div className="h-28" />
      </div>
    </SortableContext>
  )
}
