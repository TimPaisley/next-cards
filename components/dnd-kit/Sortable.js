import { DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { randomCards } from '../../lib/cards'
import Context from './Context'
import Controls from './Controls'
import Row from './Row'
import SortableContainer from './SortableContainer'
import { Item } from './SortableItem'
import Trash from './Trash'

export default function Sortable() {
  const initialEnemies = randomCards(2, { minRarity: 2, maxRarity: 3 })
  const initialDeck = randomCards(4, { minRarity: 1, maxRarity: 1 })
  const initialHand = randomCards(4, { minRarity: 1, maxRarity: 1 })

  const [cards, setCards] = useState({
    enemies: initialEnemies.map((c) => c.id),
    deck: initialDeck.map((c) => c.id),
    hand: initialHand.map((c) => c.id),
    void: []
  })

  const buildIdMap = (cards) => {
    return Object.fromEntries(cards.map((c) => [c.id, c]))
  }

  const [cardMap, setCardMap] = useState({
    ...buildIdMap(initialEnemies),
    ...buildIdMap(initialDeck),
    ...buildIdMap(initialHand)
  })

  const [winReady, setWinReady] = useState(false)
  const [activeId, setActiveId] = useState()

  const [mana, setMana] = useState(10)
  const [isBattlePhase, setIsBattlePhase] = useState(false)

  useEffect(() => {
    setWinReady(true)
  }, [])

  const refreshDeck = () => {
    const newCards = randomCards(4, { minRarity: 1, maxRarity: 1 })
    const newIds = newCards.map((c) => c.id)

    setCardMap({ ...cardMap, ...buildIdMap(newCards) })
    setCards({ ...cards, deck: newIds })
    setMana(mana - 1)
  }

  const buyPhase = (
    <Context id="dnd-context" items={cards} setItems={setCards} setActiveId={setActiveId}>
      <div className="flex-grow flex justify-center">
        <Row items={cards.enemies} renderItem={(id) => <Item card={cardMap[id]} />} />
        {activeId && <Trash />}
      </div>

      <div className="px-4">
        <Controls
          mana={mana}
          refresh={refreshDeck}
          isBattlePhase={isBattlePhase}
          endTurn={() => setIsBattlePhase(!isBattlePhase)}
        />
      </div>

      <div className="flex flex-col items-center">
        <SortableContainer id="deck" items={cards.deck} itemMap={cardMap} activeId={activeId} />
        <SortableContainer
          id="hand"
          items={cards.hand}
          itemMap={cardMap}
          activeId={activeId}
          highlight
        />
      </div>
      <DragOverlay>{activeId ? <Item card={cardMap[activeId]} /> : null}</DragOverlay>
    </Context>
  )

  const battlePhase = (
    <>
      <div className="flex-grow flex justify-center items-end">
        <Row items={cards.enemies} renderItem={(id) => <Item card={cardMap[id]} />} />
      </div>

      <div className="flex-grow">
        <Row items={cards.hand} renderItem={(id) => <Item card={cardMap[id]} />} highlight />
      </div>
    </>
  )

  return isBattlePhase ? battlePhase : winReady && buyPhase
}
