import { DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { randomCards } from '../../lib/cards'
import Header from '../header'
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

  const cardIds = (cards) => cards.map((c) => c.id)

  const [cards, setCards] = useState({
    enemies: cardIds(initialEnemies),
    deck: cardIds(initialDeck),
    hand: cardIds(initialHand),
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

  const resetGame = () => {
    const newEnemies = randomCards(2, { minRarity: 2, maxRarity: 3 })
    const newDeck = randomCards(4, { minRarity: 1, maxRarity: 1 })
    const newHand = randomCards(4, { minRarity: 1, maxRarity: 1 })

    setCards({
      enemies: cardIds(newEnemies),
      deck: cardIds(newDeck),
      hand: cardIds(newHand),
      void: []
    })

    setCardMap({
      ...buildIdMap(newEnemies),
      ...buildIdMap(newDeck),
      ...buildIdMap(newHand)
    })

    setMana(10)
    setIsBattlePhase(false)
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

  return (
    <>
      <Header reset={resetGame} />
      {isBattlePhase ? battlePhase : winReady && buyPhase}
    </>
  )
}
