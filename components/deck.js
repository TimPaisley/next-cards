import Row from './row'

export default function Deck({ deck }) {
  const rows = []
  for (var i = 0; i < deck.length; i += 4) {
    rows.push(deck.slice(i, i + 4));
  }

  return (
    <div>
      {rows.map((row, i) => (
        <Row key={i} cards={row} />
      ))}
    </div>
  )
}