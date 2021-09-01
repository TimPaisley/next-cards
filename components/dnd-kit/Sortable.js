import { DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { randomCards } from '../../lib/cards'
import Context from './Context'
import Controls from './Controls'
import SortableContainer from './SortableContainer'
import { Item } from './SortableItem'
import Trash from './Trash'

export default function Sortable() {
  const initialDeck = randomCards(4, { minRarity: 1, maxRarity: 1 })
  const initialAllies = randomCards(4, { minRarity: 1, maxRarity: 1 })

  const [cards, setCards] = useState({
    deck: initialDeck.map((c) => c.id),
    allies: initialAllies.map((c) => c.id),
    void: []
  })

  const [cardMap] = useState({
    ...Object.fromEntries(initialDeck.map((d) => [d.id, d])),
    ...Object.fromEntries(initialAllies.map((a) => [a.id, a]))
  })

  const [winReady, setWinReady] = useState(false)
  const [activeId, setActiveId] = useState()

  useEffect(() => {
    setWinReady(true)
  }, [])

  return (
    winReady && (
      <Context id="dnd-context" items={cards} setItems={setCards} setActiveId={setActiveId}>
        <div className="flex-grow flex justify-end">{activeId && <Trash />}</div>

        <div className="px-4">
          <Controls />
        </div>

        <div className="flex flex-col items-center">
          <SortableContainer id="deck" items={cards.deck} itemMap={cardMap} activeId={activeId} />
          <SortableContainer
            id="allies"
            items={cards.allies}
            itemMap={cardMap}
            activeId={activeId}
            highlight
          />
        </div>
        <DragOverlay>{activeId ? <Item card={cardMap[activeId]} /> : null}</DragOverlay>
      </Context>
    )
  )
}
