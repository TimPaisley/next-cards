import { useState } from 'react'
import Battle from './Battle'
import Field from './Field'
import Header from './Header'

export default function Game() {
  const [gameState, setGameState] = useState('field')
  const [battleSettings, setBattleSettings] = useState(null)

  const resetGame = () => {
    setGameState('field')
    setBattleSettings(null)
  }

  const startBattle = (trainer) => {
    setBattleSettings({ trainer })
    setGameState('battle')
  }

  const endBattle = (result) => {
    setGameState('field')
    setBattleSettings(null)
    console.log('Battle results', result)
  }

  return (
    <>
      <Header reset={resetGame} />

      {gameState === 'field' && <Field startBattle={startBattle} />}

      {gameState === 'battle' && <Battle endBattle={endBattle} {...battleSettings} />}
    </>
  )
}
