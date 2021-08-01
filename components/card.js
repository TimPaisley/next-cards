import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Card(props) {
  const card = props.card
  const style = `flex w-20 h-28 border border-gray-500 bg-white p-1 m-1 rounded ${
    card.health > 0 ? '' : 'opacity-50'
  }`
  return (
    <div className={style} {...props}>
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
