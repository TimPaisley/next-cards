import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function SortableItem({ card, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const className = isActive ? 'opacity-50' : ''

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      <Item card={card} />
    </div>
  )
}

export function Item({ card }) {
  const twBase = 'flex w-20 h-28 p-1 border border-gray-500 select-none bg-white rounded-md'
  const twOpacity = card.health > 0 ? '' : 'opacity-50'

  const className = classNames(twBase, twOpacity)

  return (
    <div className={className}>
      <div className="flex flex-col justify-start items-center text-center">
        <div className="text-xl font-bold">{card.attack}</div>
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="w-8">
          <FontAwesomeIcon icon={card.icon} />
        </div>
      </div>

      <div className="flex flex-col justify-end items-center text-center">
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="text-xl font-bold">{card.health}</div>
      </div>
    </div>
  )
}
