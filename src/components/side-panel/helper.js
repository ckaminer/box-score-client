/* eslint-disable arrow-body-style */
const highestTotal = (collection, category) => {
  const initialMax = {}
  initialMax[category] = 0
  return collection.reduce((max, player) => {
    return player[category] > max[category] ? player : max
  }, initialMax)
}

export default highestTotal
