import Card from './card'

export default function Row({ cards }) {
  return (
    <div className="flex justify-center space-x-2 mb-2">
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>
  )
}
