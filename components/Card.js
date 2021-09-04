import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Card({ card }) {
  const { pid, name, attack, health } = card

  const twBase = 'relative flex w-20 h-28 border border-gray-500 select-none bg-white rounded-md'
  const twOpacity = card.health > 0 ? '' : 'opacity-50'

  const className = classNames(twBase, twOpacity)

  return (
    <div className={className}>
      <div className="absolute top-1 left-1 flex flex-col justify-start items-center text-center">
        <div className="text-xl font-bold">{attack}</div>
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="w-full">
          <img alt={`${name} sprite`} src={`/sprites/${pid}.png`} />
        </div>
      </div>

      <div className="absolute bottom-1 right-1 flex flex-col justify-end items-center text-center">
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="text-xl font-bold">{health}</div>
      </div>
    </div>
  )
}
