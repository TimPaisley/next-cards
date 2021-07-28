import Head from 'next/head'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Card from '../components/card'
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
      id: 'card-1',
      type: 'kiwi',
      number: 1
    },
    {
      id: 'card-2',
      type: 'cat',
      number: 5
    },
    {
      id: 'card-3',
      type: 'cat',
      number: 8
    },
    {
      id: 'card-4',
      type: 'kiwi',
      number: 3
    }
  ]

  const [enemies, setEnemies] = useState(initialEnemies)
  const [deck, setDeck] = useState(initialDeck)
  const [hand, setHand] = useState(initialHand)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const newHand = reorder(hand, result.source.index, result.destination.index)

    setHand(newHand)
  }

  return (
    <Layout>
      <Head>
        <title>Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <DragDropContext onDragEnd={onDragEnd}>
        <section className="flex flex-col h-full py-4 overflow-hidden">
          <div className="mx-4 flex-grow">
            <Row cards={enemies} />
          </div>

          <div className="p-4 flex space-x-4 justify-center items-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 border border-black rounded-full"></div>
            <div className="w-3 h-3 border border-black rounded-full"></div>
            <div className="w-3 h-3 border border-red-500 rounded-full"></div>
          </div>

          <div className="">
            <Row cards={deck} />
          </div>

          <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="flex justify-center space-x-2 mb-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {hand.map((card, i) => (
                    <Draggable key={card.id} draggableId={card.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          card={card}>
                          <Card card={card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </section>
      </DragDropContext>
    </Layout>
  )
}
