import { faDragon, faGripLines } from '@fortawesome/free-solid-svg-icons'
import { faCat, faKiwiBird } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Card({ card }) {
  const icons = {
    cat: faCat,
    kiwi: faKiwiBird,
    dragon: faDragon
  }

  return (
    <div className="flex w-20 h-28 border border-gray-500 bg-white p-1 rounded">
      <div className="flex flex-col justify-start items-center text-center">
        <div className="text-xl font-bold">{card.number}</div>
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="w-8">
          <FontAwesomeIcon icon={icons[card.type]} />
        </div>
      </div>

      <div className="flex flex-col justify-end items-center text-center">
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="text-xl font-bold">{card.number}</div>
      </div>
    </div>
  )
}
