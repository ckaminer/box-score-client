import { shallow } from 'enzyme'

import leagueDisplays from './leagueDisplays'

describe('Boxscore', () => {
  describe('MLB Displays', () => {
    const { gameStatus, gameSummary } = leagueDisplays.MLB
    describe('#mlbGameStatus', () => {
      // assume that scores in baseball are only reported upon completion of each half inning
      it('should return the bottom of the inning if more away scores have been reported', () => {
        const awayPeriodScores = [2, 0, 1, 0]
        const homePeriodScores = [0, 0, 1]

        const status = gameStatus(awayPeriodScores, homePeriodScores)

        expect(status).toEqual('BOT 4')
      })

      it('should return the top of the next inning if the same amount of home/away scores reported', () => {
        const awayPeriodScores = [2, 0, 1, 0]
        const homePeriodScores = [0, 0, 1, 1]

        const status = gameStatus(awayPeriodScores, homePeriodScores)

        expect(status).toEqual('TOP 5')
      })
    })

    describe('#mlbGameSummary', () => {
      it('should return add a summary of hits runs and errors to the given linescore object', () => {
        const awayTotals = { runs: 5, hits: 11, errors: 1 }
        const homeTotals = { runs: 6, hits: 9, errors: 0 }
        const lineScores = {
          header: [],
          away: [],
          home: [],
        }

        const summary = gameSummary(awayTotals, homeTotals, lineScores)

        expect(summary.header.length).toEqual(3)
        expect(summary.away.length).toEqual(3)
        expect(summary.home.length).toEqual(3)

        summary.header.concat(summary.away).concat(summary.home).forEach((cell) => {
          const element = shallow(cell)
          expect(element.find('td').exists()).toBe(true)
        })

        const element1 = shallow(summary.header[0])
        expect(element1.text()).toEqual('R')

        const element2 = shallow(summary.away[0])
        expect(element2.text()).toEqual('5')

        const element3 = shallow(summary.home[0])
        expect(element3.text()).toEqual('6')
      })
    })
  })

  describe('NBA Displays', () => {
    const { gameStatus, gameSummary } = leagueDisplays.NBA
    describe('#nbaGameStatus', () => {
      it('should return the current quarter if that total is less than 5', () => {
        const awayPeriodScores = [31, 32, 33, 34]
        const homePeriodScores = [21, 22, 23, 24]

        const status = gameStatus(awayPeriodScores, homePeriodScores)

        expect(status).toEqual('QTR 4')
      })

      it('should return OT if the game is in overtime aka beyond four quarters', () => {
        const awayPeriodScores = [31, 32, 33, 34, 10]
        const homePeriodScores = [21, 22, 23, 24, 10]

        const status = gameStatus(awayPeriodScores, homePeriodScores)

        expect(status).toEqual('OT')
      })
    })

    describe('#nbaGameSummary', () => {
      it('should return add a summary of total points to the given linescore object', () => {
        const awayTotals = { points: 102 }
        const homeTotals = { points: 99 }
        const lineScores = {
          header: [],
          away: [],
          home: [],
        }

        const summary = gameSummary(awayTotals, homeTotals, lineScores)

        expect(summary.header.length).toEqual(1)
        expect(summary.away.length).toEqual(1)
        expect(summary.home.length).toEqual(1)

        summary.header.concat(summary.away).concat(summary.home).forEach((cell) => {
          const element = shallow(cell)
          expect(element.find('td').exists()).toBe(true)
        })

        const element1 = shallow(summary.header[0])
        expect(element1.text()).toEqual('T')

        const element2 = shallow(summary.away[0])
        expect(element2.text()).toEqual('102')

        const element3 = shallow(summary.home[0])
        expect(element3.text()).toEqual('99')
      })
    })
  })
})
