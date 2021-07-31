import cat from './cards/cat'
import dragon from './cards/dragon'
import hippo from './cards/hippo'
import kiwi from './cards/kiwi'
import spider from './cards/spider'

const all = [cat, dragon, hippo, kiwi, spider]

export const addToHand = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
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

export const randomCards = (n, { id = 'cards', minRarity = 1, maxRarity = 1 }) => {
  const commons = all.filter((c) => c.rarity >= minRarity && c.rarity <= maxRarity)
  const hand = []

  for (var i = 0; i < n; i++) {
    const randomCommon = commons[Math.floor(Math.random() * commons.length)]
    hand.push({
      id: id + i,
      ...randomCommon
    })
  }

  return hand
}
