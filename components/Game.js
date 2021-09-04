import { DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { fight, randomCards } from '../lib/cards'
import Card from './Card'
import Controls from './Controls'
import Discard from './Discard'
import Container from './DragDrop/Container'
import Context from './DragDrop/Context'
import Header from './Header'
import Row from './Row'

export default function Game() {
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
  const [active, setActive] = useState()

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

  const enterBattlePhase = async () => {
    setIsBattlePhase(true)
    const result = fight(
      cards.hand.map((id) => cardMap[id]),
      cards.enemies.map((id) => cardMap[id])
    )
    await stepThroughBattle(result.battle)
    console.log('Battle results', result)
  }

  const stepThroughBattle = async (battle) => {
    await sleep(1000)

    for (var i = 0; i < battle.length; i++) {
      setCardMap({
        ...cardMap,
        ...buildIdMap(battle[i].attackers),
        ...buildIdMap(battle[i].defenders)
      })

      await sleep(1000)
    }
  }

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const buyPhase = (
    <Context id="dnd-context" items={cards} setItems={setCards} setActive={setActive}>
      <div className="relative flex-grow flex justify-center">
        <Row items={cards.enemies} renderItem={(id) => <Card card={cardMap[id]} />} />
        {active?.containerId === 'hand' && <Discard />}
      </div>

      <div className="px-4">
        <Controls
          mana={mana}
          refresh={refreshDeck}
          isBattlePhase={isBattlePhase}
          endTurn={enterBattlePhase}
        />
      </div>

      <div className="flex flex-col items-center">
        <Container id="deck" items={cards.deck} itemMap={cardMap} activeId={active?.id} />
        <Container id="hand" items={cards.hand} itemMap={cardMap} activeId={active?.id} highlight />
      </div>
      <DragOverlay>{active ? <Card card={cardMap[active.id]} /> : null}</DragOverlay>
    </Context>
  )

  const battlePhase = (
    <>
      <div className="flex-grow flex justify-center items-end">
        <Row items={cards.enemies} renderItem={(id) => <Card card={cardMap[id]} />} />
      </div>

      <div className="flex-grow">
        <Row items={cards.hand} renderItem={(id) => <Card card={cardMap[id]} />} highlight />
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
