import React from 'react'
import { shallow } from 'enzyme'

import Boxscore from './Boxscore'

describe('Boxscore', () => {
  describe('#render', () => {
    it('should render a grid with three rows', () => {
      const wrapper = shallow(<Boxscore />)

      expect(wrapper.find('Row').exists()).toBe(true)
      expect(wrapper.find('Col').exists()).toBe(true)
      expect(wrapper.find('CardPanel').exists()).toBe(true)
      expect(wrapper.find('TeamTile').exists()).toBe(true)
      expect(wrapper.find('tr').length).toEqual(3)
    })
  })

  describe('lineScores', () => {
    it('should return an object of equal length arrays representing the cells for each row', () => {
      const awayScores = [11, 22, 33, 44, 55]
      const homeScores = [66, 77, 88, 99, 10]
      const awayTeam = { abbreviation: 'EDH' }
      const homeTeam = { abbreviation: 'DIL' }

      const wrapper = shallow(<Boxscore
        awayPeriodScores={awayScores}
        homePeriodScores={homeScores}
        awayTeam={awayTeam}
        homeTeam={homeTeam} />)

      const lines = wrapper.instance().lineScores()

      expect(lines.header.length).toEqual(7)
      expect(lines.away.length).toEqual(7)
      expect(lines.home.length).toEqual(7)

      const element = shallow(lines.header[0])
      expect(element.find('td').exists()).toBe(true)
    })

    it('should handle a variadic amount of period scores', () => {
      const awayScores = [11, 22, 33, 44, 55, 9, 8, 5, 3, 3]
      const homeScores = [66, 77, 88, 99, 10, 9, 8, 5, 3, 3]
      const awayTeam = { abbreviation: 'EDH' }
      const homeTeam = { abbreviation: 'DIL' }

      const wrapper = shallow(<Boxscore
        awayPeriodScores={awayScores}
        homePeriodScores={homeScores}
        awayTeam={awayTeam}
        homeTeam={homeTeam} />)

      const lines = wrapper.instance().lineScores()

      expect(lines.header.length).toEqual(12)
      expect(lines.away.length).toEqual(12)
      expect(lines.home.length).toEqual(12)
    })
  })

  describe('#gameSummary', () => {
    it('should return the final box score columns for the game', () => {
      const awayTotals = { points: 123 }
      const homeTotals = { points: 98 }

      const wrapper = shallow(<Boxscore
        awayTeamTotals={awayTotals}
        homeTeamTotals={homeTotals}
        league="NBA" />)

      const summary = wrapper.instance().gameSummary()

      expect(summary.header.length).toEqual(1)
      expect(summary.away.length).toEqual(1)
      expect(summary.home.length).toEqual(1)

      const element = shallow(summary.header[0])
      expect(element.find('td').exists()).toBe(true)
      expect(element.text()).toEqual('T')
    })

    it('should return a different summary for MLB games', () => {
      const awayTotals = { runs: 5, hits: 11, errors: 1 }
      const homeTotals = { runs: 6, hits: 9, errors: 0 }

      const wrapper = shallow(<Boxscore
        awayTeamTotals={awayTotals}
        homeTeamTotals={homeTotals}
        league="MLB" />)

      const summary = wrapper.instance().gameSummary()

      expect(summary.header.length).toEqual(3)
      expect(summary.away.length).toEqual(3)
      expect(summary.home.length).toEqual(3)

      const element1 = shallow(summary.header[0])
      expect(element1.find('td').exists()).toBe(true)
      expect(element1.text()).toEqual('R')

      const element2 = shallow(summary.header[1])
      expect(element2.find('td').exists()).toBe(true)
      expect(element2.text()).toEqual('H')

      const element3 = shallow(summary.header[2])
      expect(element3.find('td').exists()).toBe(true)
      expect(element3.text()).toEqual('E')
    })
  })

  describe('#gameStatus', () => {
    it('should return Final if the game status is completed', () => {
      const awayPeriodScores = [31, 32, 33, 34]
      const homePeriodScores = [21, 22, 23, 24]

      const wrapper = shallow(<Boxscore
        completed
        awayPeriodScores={awayPeriodScores}
        homePeriodScores={homePeriodScores}
        league="NBA" />)

      const status = wrapper.instance().gameStatus()

      expect(status).toEqual('Final')
    })

    describe('NBA behavior', () => {
      it('should return the current quarter if that total is less than 5', () => {
        const awayPeriodScores = [31, 32, 33, 34]
        const homePeriodScores = [21, 22, 23, 24]

        const wrapper = shallow(<Boxscore
          completed={false}
          awayPeriodScores={awayPeriodScores}
          homePeriodScores={homePeriodScores}
          league="NBA" />)

        const status = wrapper.instance().gameStatus()

        expect(status).toEqual('QTR 4')
      })

      it('should return OT if the game is in overtime aka beyond four quarters', () => {
        const awayPeriodScores = [31, 32, 33, 34, 10]
        const homePeriodScores = [21, 22, 23, 24, 10]

        const wrapper = shallow(<Boxscore
          completed={false}
          awayPeriodScores={awayPeriodScores}
          homePeriodScores={homePeriodScores}
          league="NBA" />)

        const status = wrapper.instance().gameStatus()

        expect(status).toEqual('OT')
      })
    })

    describe('MLB behavior', () => {
      // assume that scores in baseball are only reported upon completion of each half inning
      it('should return the bottom of the inning if more away scores have been reported', () => {
        const awayPeriodScores = [2, 0, 1, 0]
        const homePeriodScores = [0, 0, 1]

        const wrapper = shallow(<Boxscore
          completed={false}
          awayPeriodScores={awayPeriodScores}
          homePeriodScores={homePeriodScores}
          league="MLB" />)

        const status = wrapper.instance().gameStatus()

        expect(status).toEqual('BOT 4')
      })

      it('should return the top of the next inning if the same amount of home/away scores reported', () => {
        const awayPeriodScores = [2, 0, 1, 0]
        const homePeriodScores = [0, 0, 1, 1]

        const wrapper = shallow(<Boxscore
          completed={false}
          awayPeriodScores={awayPeriodScores}
          homePeriodScores={homePeriodScores}
          league="MLB" />)

        const status = wrapper.instance().gameStatus()

        expect(status).toEqual('TOP 5')
      })
    })
  })
})
