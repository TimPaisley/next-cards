import classNames from 'classnames'

export default function Row({ items, renderItem, highlight }) {
  const twBase = 'py-2 pl-2 flex justify-center space-x-2'
  const twHighlight = 'bg-gray-400'

  const className = classNames(twBase, { [twHighlight]: highlight })

  return (
    <div className={className}>
      {items.map((id) => (
        <div key={id}>{renderItem(id)}</div>
      ))}
      <div className="h-28" />
    </div>
  )
}
