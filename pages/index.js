import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Discard from '../components/discard'
import Header from '../components/header'
import Layout from '../components/layout'
import Row from '../components/row'

export default function Home() {
  const initialEnemies = [
    {
      id: 'enemy-1',
      type: 'dragon',
      number: 8
    },
    {
      id: 'enemy-2',
      type: 'dragon',
      number: 9
    }
  ]

  const initialDeck = [
    {
      id: 'deck-1',
      type: 'cat',
      number: 4
    },
    {
      id: 'deck-2',
      type: 'cat',
      number: 1
    },
    {
      id: 'deck-3',
      type: 'kiwi',
      number: 4
    },
    {
      id: 'deck-4',
      type: 'cat',
      number: 7
    }
  ]

  const initialHand = [
    {
      id: 'hand-1',
      type: 'kiwi',
      number: 1
    },
    {
      id: 'hand-2',
      type: 'cat',
      number: 5
    },
    {
      id: 'hand-3',
      type: 'cat',
      number: 8
    },
    {
      id: 'hand-4',
      type: 'kiwi',
      number: 3
    }
  ]

  const [enemies, setEnemies] = useState(initialEnemies)
  const [deck, setDeck] = useState(initialDeck)
  const [hand, setHand] = useState(initialHand)
  const [winReady, setWinReady] = useState(false)
  const [isDraggingHand, setIsDraggingHand] = useState(false)

  useEffect(() => {
    setWinReady(true)
  }, [])

  const addToHand = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const remove = (list, index) => {
    const result = Array.from(list)
    result.splice(index, 1)

    return result
  }

  const onDragStart = (start) => {
    if (start.source.droppableId === 'hand') {
      setIsDraggingHand(true)
    }
  }

  const onDragEnd = (result) => {
    console.log(result)
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
        <title>Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {winReady && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <section className="relative flex flex-col h-full py-4 overflow-hidden">
            <div className="relative flex-1 flex flex-col">
              <Discard disabled={!isDraggingHand} />

              <div className="flex-1">Enemies</div>

              <div className="mx-4 flex-grow"></div>
              <div className="p-4 flex space-x-4 justify-center items-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <div className="w-3 h-3 border border-black rounded-full"></div>
                <div className="w-3 h-3 border border-black rounded-full"></div>
                <div className="w-3 h-3 border border-red-500 rounded-full"></div>
              </div>
              <div className="mx-4">
                <Row disabled={isDraggingHand} droppableId="deck" cards={deck} />
              </div>
            </div>
            <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
              <Row droppableId="hand" cards={hand} />
            </div>
          </section>
        </DragDropContext>
      )}
    </Layout>
  )
}
