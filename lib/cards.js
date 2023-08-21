import { v4 as uuid } from 'uuid'

import all from './pokemon'

export const typeToLightBackground = {
  bug: 'bg-bug-light',
  dragon: 'bg-dragon-light',
  electric: 'bg-electric-light',
  fighting: 'bg-fighting-light',
  fire: 'bg-fire-light',
  flying: 'bg-flying-light',
  ghost: 'bg-ghost-light',
  grass: 'bg-grass-light',
  ground: 'bg-ground-light',
  ice: 'bg-ice-light',
  normal: 'bg-normal-light',
  poison: 'bg-poison-light',
  psychic: 'bg-psychic-light',
  rock: 'bg-rock-light',
  water: 'bg-water-light'
}

export const typeToBackground = {
  bug: 'bg-bug',
  dragon: 'bg-dragon',
  electric: 'bg-electric',
  fighting: 'bg-fighting',
  fire: 'bg-fire',
  flying: 'bg-flying',
  ghost: 'bg-ghost',
  grass: 'bg-grass',
  ground: 'bg-ground',
  ice: 'bg-ice',
  normal: 'bg-normal',
  poison: 'bg-poison',
  psychic: 'bg-psychic',
  rock: 'bg-rock',
  water: 'bg-water'
}

export const isHandFull = (hand) => {
  return hand.length >= 4
}

export const addToHand = (deck, hand, deckIndex, handIndex) => {
  if (isHandFull(hand)) {
    return { deck, hand }
  }

  const newDeck = Array.from(deck)
  const newHand = Array.from(hand)
  const [card] = newDeck.splice(deckIndex, 1)

  newHand.splice(handIndex, 0, card)

  return { deck: newDeck, hand: newHand }
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const remove = (list, index) => {
  const result = Array.from(list)
  result.splice(index, 1)

  return result
}

export const update = (list, id, newCard) => {
  const result = Array.from(list)
  const index = result.findIndex((c) => c.id === id)

  result.splice(index, 1)
  result.splice(index, 0, newCard)

  return result
}

export const randomCards = (n, { minRarity = 1, maxRarity = 1, type }) => {
  const filteredRarity = all.filter((c) => c.rarity >= minRarity && c.rarity <= maxRarity)
  const filteredType = type ? filteredRarity.filter((c) => c.type === type) : filteredRarity
  const hand = []

  for (var i = 0; i < n; i++) {
    const random = filteredType[Math.floor(Math.random() * filteredType.length)]
    hand.push({
      id: uuid(),
      ...random
    })
  }

  return hand
}

export const idsToSet = (ids) => {
  return ids.map((id) => ({
    id: uuid(),
    ...all.filter((c) => c.pid === id)[0]
  }))
}

export const getCardById = (id) => {
  const match = all.find((p) => p.pid === id)

  return match ? { id: uuid(), ...match } : null
}

export const fight = (initialHand, initialEnemies) => {
  const battle = []
  const maxTurns = 100

  var hand = Array.from(initialHand)
  var enemies = Array.from(initialEnemies)

  while (isStillAlive(hand) && isStillAlive(enemies) && battle.length <= maxTurns) {
    if (isStillAlive(hand)) {
      // Hand attacks enemies
      const handAttack = attack(hand, enemies)
      hand = handAttack.attackers
      enemies = handAttack.defenders
      handAttack.handAttacking = true
      battle.push(handAttack)
    }

    if (isStillAlive(enemies)) {
      // Enemies attack hand
      const enemyAttack = attack(enemies, hand)
      hand = enemyAttack.defenders
      enemies = enemyAttack.attackers
      enemyAttack.handAttacked = false
      battle.push(enemyAttack)
    }
  }

  return {
    battle,
    hand,
    enemies,
    battleWon: isStillAlive(hand)
  }
}

const isStillAlive = (cards) => {
  return cards.filter((c) => c.health > 0).length > 0
}

const attack = (initialAttackers, initialDefenders) => {
  // Clone lists
  const attackers = Array.from(initialAttackers)
  const defenders = Array.from(initialDefenders)

  // Find cards that are still valid attackers/targets
  const validAttackers = attackers.filter((a) => a.health > 0)
  const validDefenders = defenders.filter((d) => d.health > 0)

  // Find a random attacker and defender
  const randomAttackerIndex = Math.floor(Math.random() * validAttackers.length)
  var randomAttacker = validAttackers[randomAttackerIndex]

  const randomDefenderIndex = Math.floor(Math.random() * validDefenders.length)
  var randomDefender = validDefenders[randomDefenderIndex]

  // Subtract each card's attack from the opposition's health
  randomAttacker = { ...randomAttacker, health: randomAttacker.health - randomDefender.attack }
  randomDefender = { ...randomDefender, health: randomDefender.health - randomAttacker.attack }

  // Update attacker and defender list
  const newAttackers = update(attackers, randomAttacker.id, randomAttacker)
  const newDefenders = update(defenders, randomDefender.id, randomDefender)

  // Return results
  return {
    attacker: randomAttacker,
    defender: randomDefender,
    attackers: newAttackers,
    defenders: newDefenders
  }
}
