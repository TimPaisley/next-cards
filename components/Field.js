export default function Field({ startBattle }) {
  const trainers = [
    {
      id: '01-13',
      name: 'Youngster Joey'
    },
    {
      id: '01-14',
      name: 'Bug-catcher Lewis'
    },
    {
      id: '01-19',
      name: 'Swimmer Melissa'
    },
    {
      id: '01-31',
      name: 'Lady Penelope'
    },
    {
      id: '01-27',
      name: 'Blacksmith Harry'
    },
    {
      id: '02-03',
      name: 'Captain Engleworth'
    }
  ]

  const Card = ({ trainer }) => (
    <button onClick={startBattle} className="border-2 border-black rounded-md mb-4">
      <img src={`/trainers/${trainer.id}.png`} />
    </button>
  )

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
