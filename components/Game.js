import { useState } from 'react'
import Battle from './Battle'
import { randomCards } from '../lib/cards'
import Field from './Field'
import Header from './Header'

export default function Game() {
  const [gameState, setGameState] = useState('field')

  const resetGame = () => {
    // const newEnemies = randomCards(2, { minRarity: 1, maxRarity: 6 })
    // const newDeck = randomCards(4, { minRarity: 1, maxRarity: 6 })
    // const newHand = randomCards(4, { minRarity: 1, maxRarity: 6 })
    // setCards({
    //   enemies: cardIds(newEnemies),
    //   deck: cardIds(newDeck),
    //   hand: cardIds(newHand),
    //   void: []
    // })
    // setCardMap({
    //   ...buildIdMap(newEnemies),
    //   ...buildIdMap(newDeck),
    //   ...buildIdMap(newHand)
    // })
    // setMana(10)
    // setIsBattlePhase(false)
  }

  const startBattle = () => {
    setGameState('battle')
  }

  return (
    <>
      <Header reset={resetGame} />

      {gameState === 'field' && <Field startBattle={startBattle} />}

      {gameState === 'battle' && (
        <Battle
          initialEnemies={randomCards(2, { minRarity: 1, maxRarity: 6 })}
          initialDeck={randomCards(4, { minRarity: 1, maxRarity: 6 })}
          initialHand={randomCards(3, { minRarity: 1, maxRarity: 6 })}
        />
      )}
    </>
  )
}
