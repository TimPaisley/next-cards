import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Discard from '../components/discard'
import { Enemies } from '../components/enemies'
import Header from '../components/header'
import Layout from '../components/layout'
import Phase from '../components/phase'
import Row from '../components/row'
import { addToHand, isHandFull, randomCards, remove, reorder } from '../lib/cards'

export default function Home() {
  const initialEnemies = randomCards(2, { id: 'enemies', minRarity: 2, maxRarity: 3 })
  const initialDeck = randomCards(4, { id: 'deck', minRarity: 1, maxRarity: 1 })
  const initialHand = randomCards(4, { id: 'hand', minRarity: 1, maxRarity: 1 })

  const [enemies] = useState(initialEnemies)
  const [deck, setDeck] = useState(initialDeck)
  const [hand, setHand] = useState(initialHand)
  const [winReady, setWinReady] = useState(false)
  const [isDraggingHand, setIsDraggingHand] = useState(false)

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
      if (source.droppableId === 'deck') {
        const newDeck = reorder(deck, source.index, destination.index)
        setDeck(newDeck)
      } else if (source.droppableId === 'hand') {
        const newHand = reorder(hand, source.index, destination.index)
        setHand(newHand)
      }
    } else if (source.droppableId === 'deck' && destination.droppableId === 'hand') {
      const result = addToHand(deck, hand, source.index, destination.index)
      setHand(result.hand)
      setDeck(result.deck)
    } else if (source.droppableId === 'hand' && destination.droppableId === 'discard') {
      const result = remove(hand, source.index)
      setHand(result)
    } else {
      return
    }
  }

  const buyPhase = (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="relative flex flex-col h-full py-4 overflow-hidden">
        <div className="relative flex-1 flex flex-col mx-4">
          <Discard disabled={!isDraggingHand} />
          <Enemies enemies={enemies} />
          <Phase />
          <Row disabled={isDraggingHand} droppableId="deck" cards={deck} />
        </div>

        <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
          <Row disabled={isHandFull(hand)} droppableId="hand" cards={hand} />
        </div>
      </div>
    </DragDropContext>
  )

  return (
    <Layout>
      <Header />
      {winReady && buyPhase}
    </Layout>
  )
}
