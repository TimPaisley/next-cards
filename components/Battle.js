import { DragOverlay } from '@dnd-kit/core'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { fight, getCardById, idsToSet, randomCards, typeToLightBackground } from '../lib/cards'
import Card from './Card'
import CardPreview from './CardPreview'
import Controls from './Controls'
import Discard from './Discard'
import Container from './DragDrop/Container'
import Context from './DragDrop/Context'
import Row from './Row'

export default function Battle({ endBattle, trainer }) {
  const initialEnemies = trainer.party
    ? idsToSet(trainer.party)
    : randomCards(2, {
        minRarity: trainer.minRarity,
        maxRarity: trainer.maxRarity,
        type: trainer.type
      })

  const initialDeck = randomCards(4, { minRarity: trainer.minRarity, maxRarity: trainer.maxRarity })
  const initialHand = randomCards(1, { minRarity: trainer.minRarity, maxRarity: trainer.maxRarity })

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
  const [preview, setPreview] = useState()

  useEffect(() => {
    setWinReady(true)
  }, [])

  const setCardsDragEnd = (result) => {
    const newCards = result(cards)
    const newHand = newCards.hand.map((c) => cardMap[c])

    // Evolve any consecutive pairs
    for (var i = 0; i < newHand.length - 1; i++) {
      const currentCard = newHand[i]
      const nextCard = newHand[i + 1]

      if (currentCard.pid === nextCard.pid && currentCard.evolvesInto !== null) {
        console.log('match', currentCard.name)

        const evolution = getCardById(currentCard.evolvesInto)
        newHand.splice(i, 2, evolution)
      }
    }

    setCardMap({ ...cardMap, ...buildIdMap(newHand) })

    setCards({ ...newCards, hand: cardIds(newHand) })
  }

  const refreshDeck = () => {
    const newCards = randomCards(4, { minRarity: trainer.minRarity, maxRarity: trainer.maxRarity })
    const newIds = newCards.map((c) => c.id)

    setCardMap({ ...cardMap, ...buildIdMap(newCards) })
    setCards({ ...cards, deck: newIds })
    setMana(mana - 1)
  }

  const enterBattlePhase = async () => {
    setIsBattlePhase(true)
    const result = fight(
      cards.hand.map((id) => cardMap[id]),
      cards.enemies.map((id) => cardMap[id])
    )

    await stepThroughBattle(result.battle)
    endBattle(result)
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

  const renderCard = (id) => <Card card={cardMap[id]} setPreview={setPreview} />

  const trainerBackground = typeToLightBackground[trainer.type]

  const buyPhase = (
    <Context
      id="dnd-context"
      items={cards}
      setItems={setCards}
      setItemsDragEnd={setCardsDragEnd}
      setActive={setActive}>
      <div className="flex justify-center">
        <img
          className={classNames('w-60 border-2 border-black rounded-md', trainerBackground)}
          src={`/trainers/${trainer.id}.png`}
          alt=""
        />
      </div>
      <div className="relative flex-grow flex justify-center">
        <Row
          items={cards.enemies}
          renderItem={(id) => <Card card={cardMap[id]} setPreview={setPreview} />}
        />
      </div>

      <div className="px-4">
        <Controls
          mana={mana}
          refresh={refreshDeck}
          isBattlePhase={isBattlePhase}
          endTurn={enterBattlePhase}
        />
      </div>

      <div className="flex flex-col">
        {active?.containerId === 'hand' ? (
          <div className="relative">
            <Discard />
            <Row
              items={cards.deck}
              renderItem={(id) => <Card card={cardMap[id]} setPreview={setPreview} />}
            />
          </div>
        ) : (
          <Container id="deck" items={cards.deck} renderItem={renderCard} activeId={active?.id} />
        )}

        <Container
          id="hand"
          items={cards.hand}
          renderItem={renderCard}
          activeId={active?.id}
          highlight
        />
      </div>
      <DragOverlay>{active ? <Card card={cardMap[active.id]} /> : null}</DragOverlay>
    </Context>
  )

  const battlePhase = (
    <>
      <div className="flex-grow flex justify-center items-end">
        <Row items={cards.enemies} renderItem={renderCard} />
      </div>

      <div className="flex-grow">
        <Row items={cards.hand} renderItem={renderCard} highlight />
      </div>
    </>
  )

  return (
    <>
      {isBattlePhase ? battlePhase : winReady && buyPhase}
      {preview && <CardPreview card={preview} close={() => setPreview(null)} />}
    </>
  )
}
