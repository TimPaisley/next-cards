import classNames from 'classnames'

import { getCardById } from '../lib/cards'
import { typeToBackground, typeToLightBackground } from '../lib/cards'

export default function CardPreview({ card, close }) {
  const { pid, name, evolvesInto, evolvesFrom, type, health, attack, rarity } = card
  const evolvesFromPokemon = getCardById(evolvesFrom)
  const evolvesIntoPokemon = getCardById(evolvesInto)

  const rarityLabels = {
    1: 'Very Common',
    2: 'Common',
    3: 'Uncommon',
    4: 'Rare',
    5: 'Epic',
    6: 'Legendary'
  }

  const background = 'absolute z-40 top-0 left-0 w-full h-full bg-white opacity-80'

  const cardBase = 'w-64 h-96 border-2 border-black rounded-md flex flex-col items-center'
  const cardBackground = typeToLightBackground[type]

  const cardClass = classNames(cardBase, cardBackground)

  const pillBase = 'absolute bottom-40 mb-1 w-48 border-2 border-black rounded-full'
  const pillBackground = typeToBackground[type]

  const pillClass = classNames(pillBase, pillBackground)

  return (
    <>
      <div className={background}></div>
      <button onClick={close} className="absolute w-full h-full z-50">
        <div className="flex h-full justify-center items-center">
          <div className={cardClass}>
            <img
              className="pointer-events-none w-48"
              alt={`${name} sprite`}
              src={`/sprites/${pid}.png`}
            />

            <div className={pillClass}>
              <h4 className="text-lg font-black">{type.toUpperCase()}</h4>
            </div>

            <div className="flex justify-between w-full px-2">
              <div>
                <h5 className="text-2xl font-bold">{attack}</h5>
                <div className="text-xs">ATTACK</div>
              </div>

              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <h2 className="text-xs mb-4">{rarityLabels[rarity].toUpperCase()}</h2>
              </div>

              <div>
                <h5 className="text-2xl font-bold">{health}</h5>
                <div className="text-xs">HEALTH</div>
              </div>
            </div>

            {evolvesFromPokemon && <h3>Evolves from {evolvesFromPokemon.name}</h3>}
            {evolvesIntoPokemon && <h3>Evolves into {evolvesIntoPokemon.name}</h3>}
          </div>
        </div>
      </button>
    </>
  )
}
