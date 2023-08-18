import { faFistRaised, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Controls({ mana = 0, refresh, endTurn }) {
  return (
    <div className="py-4 flex space-x-2 justify-center">
      <ControlButton onClick={endTurn}>
        <div className="w-4">
          <FontAwesomeIcon icon={faFistRaised} />
        </div>
      </ControlButton>
      <Control />
      <Control className="flex-1">Buy Phase</Control>
      <Control>{mana}</Control>
      <ControlButton onClick={refresh}>
        <div className="w-4">
          <FontAwesomeIcon icon={faSyncAlt} />
        </div>
      </ControlButton>
    </div>
  )
}

const baseClass =
  'border-2 border-black w-10 h-10 rounded-full flex items-center justify-center font-bold'

function Control({ children, className }) {
  return <div className={classNames(baseClass, className)}>{children}</div>
}

function ControlButton({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={classNames(baseClass, className)}>
      {children}
    </button>
  )
}
