import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Card({ card }) {
  const { icon, attack, health } = card

  const twBase = 'flex w-20 h-28 p-1 border border-gray-500 select-none bg-white rounded-md'
  const twOpacity = card.health > 0 ? '' : 'opacity-50'

  const className = classNames(twBase, twOpacity)

  return (
    <div className={className}>
      <div className="flex flex-col justify-start items-center text-center">
        <div className="text-xl font-bold">{attack}</div>
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="w-8">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>

      <div className="flex flex-col justify-end items-center text-center">
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="text-xl font-bold">{health}</div>
      </div>
    </div>
  )
}
