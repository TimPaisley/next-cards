import classNames from 'classnames'
import { typeToLightBackground } from '../lib/cards'

export default function Field({ startBattle }) {
  const trainers = [
    {
      id: '01-13',
      name: 'Youngster Joey',
      type: 'normal',
      minRarity: 1,
      maxRarity: 2
    },
    {
      id: '01-14',
      name: 'Bug-catcher Lewis',
      type: 'bug',
      minRarity: 1,
      maxRarity: 3
    },
    {
      id: '01-19',
      name: 'Swimmer Melissa',
      type: 'water',
      minRarity: 1,
      maxRarity: 4
    },
    {
      id: '01-31',
      name: 'Lady Penelope',
      type: 'grass',
      minRarity: 1,
      maxRarity: 4
    },
    {
      id: '01-27',
      name: 'Blacksmith Harry',
      type: 'fire',
      minRarity: 1,
      maxRarity: 4
    },
    {
      id: '02-03',
      name: 'Captain Engleworth',
      type: 'dragon',
      party: [148, 149, 148],
      minRarity: 4,
      maxRarity: 6
    }
  ]

  const Card = ({ trainer }) => {
    const base = 'relative border-2 border-black rounded-md mb-4'
    const background = typeToLightBackground[trainer.type]

    return (
      <button onClick={() => startBattle(trainer)} className={classNames(base, background)}>
        <img src={`/trainers/${trainer.id}.png`} />
      </button>
    )
  }

  return (
    <div className="px-4">
      {trainers.map((trainer) => (
        <div key={trainer.id}>
          <Card trainer={trainer} />
        </div>
      ))}
    </div>
  )
}
