import Card from './card'

export function Enemies({ enemies }) {
  return (
    <div className="flex-1 flex">
      {enemies.map((enemy) => (
        <Card key={enemy.id} card={enemy} />
      ))}
    </div>
  )
}
