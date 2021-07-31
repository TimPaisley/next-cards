import { v4 as uuid } from 'uuid'

import cat from './cards/cat'
import dragon from './cards/dragon'
import hippo from './cards/hippo'
import kiwi from './cards/kiwi'
import spider from './cards/spider'

const all = [cat, dragon, hippo, kiwi, spider]

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

export const randomCards = (n, { minRarity = 1, maxRarity = 1 }) => {
  const commons = all.filter((c) => c.rarity >= minRarity && c.rarity <= maxRarity)
  const hand = []

  for (var i = 0; i < n; i++) {
    const randomCommon = commons[Math.floor(Math.random() * commons.length)]
    hand.push({
      id: uuid(),
      ...randomCommon
    })
  }

  return hand
}
