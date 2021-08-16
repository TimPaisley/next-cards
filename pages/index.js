import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Card from '../components/card'
import Discard from '../components/discard'
import Sortable from '../components/dnd-kit/Sortable'
import { Enemies } from '../components/enemies'
import Header from '../components/header'
import Layout from '../components/layout'
import BuyPhase from '../components/phase'
import Row from '../components/row'
import { addToHand, fight, isHandFull, randomCards, remove, reorder } from '../lib/cards'

export default function Home() {
  const initialEnemies = randomCards(2, { minRarity: 2, maxRarity: 3 })
  const initialDeck = randomCards(4, { minRarity: 1, maxRarity: 1 })
  const initialHand = randomCards(4, { minRarity: 1, maxRarity: 1 })

  const [enemies, setEnemies] = useState(initialEnemies)
  const [deck, setDeck] = useState(initialDeck)
  const [hand, setHand] = useState(initialHand)
  const [winReady, setWinReady] = useState(false)
  const [isDraggingHand, setIsDraggingHand] = useState(false)
  const [mana, setMana] = useState(10)
  const [isBattlePhase, setIsBattlePhase] = useState(false)

  const reset = () => {
    setEnemies(randomCards(2, { minRarity: 2, maxRarity: 3 }))
    setDeck(randomCards(4, { minRarity: 1, maxRarity: 1 }))
    setHand(randomCards(4, { minRarity: 1, maxRarity: 1 }))
    setIsDraggingHand(false)
    setMana(10)
    setIsBattlePhase(false)
  }

  useEffect(() => {
    setWinReady(true)
  }, [])

  const onDragStart = (start) => {
    if (start.source.droppableId === 'hand') {
      setIsDraggingHand(true)
    }
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    setIsDraggingHand(false)

    if (!destination) {
      return
    }

    if (source.droppableId == destination.droppableId) {
      // Reorder deck
      if (source.droppableId === 'deck') {
        const newDeck = reorder(deck, source.index, destination.index)
        setDeck(newDeck)
      }

      // Reorder hand
      else if (source.droppableId === 'hand') {
        const newHand = reorder(hand, source.index, destination.index)
        setHand(newHand)
      }
    }

    // Add card from deck to hand
    else if (source.droppableId === 'deck' && destination.droppableId === 'hand') {
      const result = addToHand(deck, hand, source.index, destination.index)
      setHand(result.hand)
      setDeck(result.deck)
    }

    // Discard card from hand
    else if (source.droppableId === 'hand' && destination.droppableId === 'discard') {
      const result = remove(hand, source.index)
      setHand(result)
    }

    // Invalid drag
    else {
      return
    }
  }

  const refresh = () => {
    setDeck(randomCards(4, { minRarity: 1, maxRarity: 1 }))
    setMana(mana - 1)
  }

  const enterBattlePhase = async () => {
    setIsBattlePhase(true)
    const result = fight(hand, enemies)
    await stepThroughBattle(result.battle)
    console.log(result)
  }

  const stepThroughBattle = async (battle) => {
    await sleep(1000)

    for (var i = 0; i < battle.length; i++) {
      if (battle[i].handAttacking) {
        setHand(battle[i].attackers)
        setEnemies(battle[i].defenders)
      } else {
        setHand(battle[i].defenders)
        setEnemies(battle[i].attackers)
      }
      await sleep(1000)
    }
  }

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const buyPhase = (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="relative flex flex-col h-full py-4 overflow-hidden">
        <div className="relative flex-1 flex flex-col mx-4">
          <Discard disabled={!isDraggingHand} />
          <Enemies enemies={enemies} />
          <BuyPhase mana={mana} refresh={refresh} endTurn={enterBattlePhase} />
          <Row disabled={isDraggingHand} droppableId="deck" cards={deck} />
        </div>

        <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
          <Row disabled={isHandFull(hand) && !isDraggingHand} droppableId="hand" cards={hand} />
        </div>
      </div>
    </DragDropContext>
  )

  const battlePhase = (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Enemies enemies={enemies} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex">
          {hand.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <Header reset={reset} />
      <Sortable />
    </Layout>
  )
}
