import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Discard from '../components/discard'
import { Enemies } from '../components/enemies'
import Header from '../components/header'
import Layout from '../components/layout'
import Phase from '../components/phase'
import Row from '../components/row'
import { addToHand, randomCards, remove, reorder } from '../lib/cards'

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
      const result = addToHand(deck, hand, source, destination)
      setHand(result.hand)
      setDeck(result.deck)
    } else if (source.droppableId === 'hand' && destination.droppableId === 'discard') {
      const result = remove(hand, source.index)
      setHand(result)
    } else {
      return
    }
  }

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Cards" />
        <meta name="keywords" content="cards" />
        <title>Cards</title>
        <link href="/favicon.ico" rel="icon" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/152.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>

      <Header />

      {winReady && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="relative flex flex-col h-full py-4 overflow-hidden">
            <div className="relative flex-1 flex flex-col mx-4">
              <Discard disabled={!isDraggingHand} />
              <Enemies enemies={enemies} />
              <Phase />
              <Row disabled={isDraggingHand} droppableId="deck" cards={deck} />
            </div>

            <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
              <Row droppableId="hand" cards={hand} />
            </div>
          </div>
        </DragDropContext>
      )}
    </Layout>
  )
}
