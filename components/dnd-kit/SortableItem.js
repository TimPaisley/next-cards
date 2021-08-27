import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const className = props.active ? 'opacity-50' : ''

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  )
}

export function Item(props) {
  return (
    <div className="w-20 h-28 p-4 border border-gray-500 select-none bg-white rounded-md">
      {props.id}
    </div>
  )
}
