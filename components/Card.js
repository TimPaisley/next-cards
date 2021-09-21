import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { typeToBackground, typeToLightBackground } from '../lib/cards'

export default function Card({ card, setPreview }) {
  const { pid, name, type, health, attack } = card

  const outerBase = 'relative flex w-20 h-28 border-2 select-none rounded-md border-black'
  const outerOpacity = card.health > 0 ? '' : 'opacity-50'

  const outerBackground = typeToBackground[type]

  const outerClassName = classNames(outerBase, outerOpacity, outerBackground)

  const circleBase = 'absolute rounded-full w-12 h-12'
  const circleBackground = typeToLightBackground[type]

  const circleClassName = classNames(circleBase, circleBackground)

  return (
    <button onClick={() => setPreview?.(card)} className={outerClassName}>
      <div className="z-10 absolute top-1 left-1 flex flex-col justify-start items-center text-center">
        <div className="text-xl font-bold">{attack}</div>
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
      </div>

      <div className="relative flex flex-col flex-grow justify-center items-center">
        <div className="z-10 w-full">
          <img className="pointer-events-none" alt={`${name} sprite`} src={`/sprites/${pid}.png`} />
        </div>

        <div className={circleClassName} />
      </div>

      <div className="z-10 absolute bottom-1 right-1 flex flex-col justify-end items-center text-center">
        <div className="w-2">
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="text-xl font-bold">{health}</div>
      </div>
    </button>
  )
}
