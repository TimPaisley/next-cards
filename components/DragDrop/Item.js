import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Card from '../Card'

export default function Item({ card, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const className = isActive ? 'opacity-50' : ''

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      <Card card={card} />
    </div>
  )
}
