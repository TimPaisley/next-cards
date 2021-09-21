import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import classNames from 'classnames'

export default function Item({ itemId, renderItem, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: itemId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const twBase = 'touch-action-none'
  const twActive = isActive ? 'opacity-50' : ''

  const className = classNames(twBase, twActive)

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      {renderItem(itemId)}
    </div>
  )
}
