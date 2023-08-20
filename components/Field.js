import classNames from 'classnames'
import { typeToLightBackground } from '../lib/cards'

export default function Field({ startBattle }) {
  const trainers = [
    {
      id: '01-13',
      name: 'Youngster Joey',
      type: 'normal'
    },
    {
      id: '01-14',
      name: 'Bug-catcher Lewis',
      type: 'bug'
    },
    {
      id: '01-19',
      name: 'Swimmer Melissa',
      type: 'water'
    },
    {
      id: '01-31',
      name: 'Lady Penelope',
      type: 'grass'
    },
    {
      id: '01-27',
      name: 'Blacksmith Harry',
      type: 'fire'
    },
    {
      id: '02-03',
      name: 'Captain Engleworth',
      type: 'dragon'
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
