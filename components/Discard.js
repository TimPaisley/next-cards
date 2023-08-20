import { useDroppable } from '@dnd-kit/core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Discard() {
  const positioning = 'absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center'
  const appearance = 'bg-white opacity-80 uppercase font-black'
  const appearanceIsOver = 'text-lg'

  const { setNodeRef, isOver } = useDroppable({
    id: 'void'
  })

  return (
    <div
      ref={setNodeRef}
      className={classNames(positioning, appearance, isOver && appearanceIsOver)}>
      <div className="w-4 mr-2">
        <FontAwesomeIcon icon={faTrash} />
      </div>{' '}
      Drop here to discard
    </div>
  )
}
