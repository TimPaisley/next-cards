import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import classNames from 'classnames'

import Card from '../Card'

export default function Item({ card, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const twBase = 'touch-action-none'
  const twActive = isActive ? 'opacity-50' : ''

  const className = classNames(twBase, twActive)

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      <Card card={card} />
    </div>
  )
}
