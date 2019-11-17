import highestTotal from './helper'

describe('helpers', () => {
  describe('highestTotal', () => {
    it('should return the object with the maximum value for the given category', async () => {
      const dennis = {
        name: 'Dennis',
        points: 28,
        rebounds: 7,
        assists: 4,
      }
      const dee = {
        name: 'Dee',
        points: 26,
        rebounds: 11,
        assists: 7,
      }
      const mac = {
        name: 'Mac',
        points: 27,
        rebounds: 9,
        assists: 11,
      }
      const playerStats = [dennis, dee, mac]

      const mostPoints = highestTotal(playerStats, 'points')
      const mostRebounds = highestTotal(playerStats, 'rebounds')
      const mostAssists = highestTotal(playerStats, 'assists')

      expect(mostPoints).toBe(dennis)
      expect(mostRebounds).toBe(dee)
      expect(mostAssists).toBe(mac)
    })
  })
})
