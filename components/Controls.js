import { faFistRaised, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Controls({ mana = 0, refresh, endTurn }) {
  return (
    <div className="py-4 flex space-x-4 align-middle justify-center">
      <div className="flex-1 flex items-center">
        <button
          onClick={endTurn}
          className="mr-4 border border-black w-10 h-10 rounded-full flex justify-center items-center">
          <div className="w-4">
            <FontAwesomeIcon icon={faFistRaised} />
          </div>
        </button>
      </div>

      <div className="flex space-x-2">
        <div className="flex items-center font-bold pr-4">Buy Phase</div>
        <div className="border border-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
          {mana}
        </div>
        <button
          onClick={refresh}
          className="border border-black w-10 h-10 rounded-full flex justify-center items-center">
          <div className="w-4">
            <FontAwesomeIcon icon={faSyncAlt} />
          </div>
        </button>
      </div>
    </div>
  )
}
