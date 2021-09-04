import { faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

const backgroundLightTypeMap = {
  bug: 'bg-bug-light',
  dragon: 'bg-dragon-light',
  electric: 'bg-electric-light',
  fighting: 'bg-fighting-light',
  fire: 'bg-fire-light',
  flying: 'bg-flying-light',
  ghost: 'bg-ghost-light',
  grass: 'bg-grass-light',
  ground: 'bg-ground-light',
  ice: 'bg-ice-light',
  normal: 'bg-normal-light',
  poison: 'bg-poison-light',
  psychic: 'bg-psychic-light',
  rock: 'bg-rock-light',
  water: 'bg-water-light'
}

const backgroundTypeMap = {
  bug: 'bg-bug',
  dragon: 'bg-dragon',
  electric: 'bg-electric',
  fighting: 'bg-fighting',
  fire: 'bg-fire',
  flying: 'bg-flying',
  ghost: 'bg-ghost',
  grass: 'bg-grass',
  ground: 'bg-ground',
  ice: 'bg-ice',
  normal: 'bg-normal',
  poison: 'bg-poison',
  psychic: 'bg-psychic',
  rock: 'bg-rock',
  water: 'bg-water'
}

export default function Card({ card }) {
  const { pid, name, type, health, attack } = card

  const outerBase = 'relative flex w-20 h-28 border-2 select-none rounded-md border-black'
  const outerOpacity = card.health > 0 ? '' : 'opacity-50'

  const outerBackground = backgroundTypeMap[type]

  const outerClassName = classNames(outerBase, outerOpacity, outerBackground)

  const circleBase = 'absolute rounded-full w-12 h-12'
  const circleBackground = backgroundLightTypeMap[type]

  const circleClassName = classNames(circleBase, circleBackground)

  return (
    <div className={outerClassName}>
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
    </div>
  )
}
