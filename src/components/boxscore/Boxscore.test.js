import React from 'react'
import { shallow } from 'enzyme'

import Boxscore from './Boxscore'
import * as leagueDisplays from './leagueDisplays'

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
        league="NBA"
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
        league="NBA"
        awayPeriodScores={awayScores}
        homePeriodScores={homeScores}
        awayTeam={awayTeam}
        homeTeam={homeTeam} />)

      const lines = wrapper.instance().lineScores()

      expect(lines.header.length).toEqual(12)
      expect(lines.away.length).toEqual(12)
      expect(lines.home.length).toEqual(12)
    })

    it('should have a different amount of columns depending on the league', () => {
      const awayScores = [11, 22, 33, 44, 55, 9, 8, 5, 3, 3]
      const homeScores = [66, 77, 88, 99, 10, 9, 8, 5, 3, 3]
      const awayTeam = { abbreviation: 'EDH' }
      const homeTeam = { abbreviation: 'DIL' }

      let wrapper = shallow(<Boxscore
        league="NBA"
        awayPeriodScores={awayScores}
        homePeriodScores={homeScores}
        awayTeam={awayTeam}
        homeTeam={homeTeam} />)
      let lines = wrapper.instance().lineScores()
      expect(lines.header.length).toEqual(12)
      expect(lines.away.length).toEqual(12)
      expect(lines.home.length).toEqual(12)

      wrapper = shallow(<Boxscore
        league="MLB"
        awayPeriodScores={awayScores}
        homePeriodScores={homeScores}
        awayTeam={awayTeam}
        homeTeam={homeTeam} />)
      lines = wrapper.instance().lineScores()
      expect(lines.header.length).toEqual(14)
      expect(lines.away.length).toEqual(14)
      expect(lines.home.length).toEqual(14)
    })
  })

  describe('#gameSummary', () => {
    it('should return the game summary for the given league - NBA', () => {
      const mockReturnValue = {
        header: [<td key="1">T</td>],
        away: [<td key="2">102</td>],
        home: [<td key="3">99</td>],
      }
      const mockNBASummary = jest.fn()
        .mockReturnValue(mockReturnValue)

      leagueDisplays.default.NBA.gameSummary = mockNBASummary

      const awayTotals = { points: 123 }
      const homeTotals = { points: 98 }

      const wrapper = shallow(<Boxscore
        awayTeamTotals={awayTotals}
        homeTeamTotals={homeTotals}
        league="NBA" />)

      const summary = wrapper.instance().gameSummary()

      expect(mockNBASummary).toHaveBeenCalled()
      expect(summary).toEqual(mockReturnValue)
    })

    it('should return the game summary for the given league - MLB', () => {
      const mockReturnValue = {
        header: [<td key="1">R</td>, <td key="2">H</td>, <td key="3">E</td>],
        away: [<td key="4">2</td>, <td key="5">10</td>, <td key="6">1</td>],
        home: [<td key="7">6</td>, <td key="8">9</td>, <td key="9">0</td>],
      }
      const mockMLBSummary = jest.fn()
        .mockReturnValue(mockReturnValue)

      leagueDisplays.default.MLB.gameSummary = mockMLBSummary

      const awayTotals = { runs: 2, hits: 10, errors: 1 }
      const homeTotals = { runs: 6, hits: 9, errors: 0 }

      const wrapper = shallow(<Boxscore
        awayTeamTotals={awayTotals}
        homeTeamTotals={homeTotals}
        league="MLB" />)

      const summary = wrapper.instance().gameSummary()

      expect(mockMLBSummary).toHaveBeenCalled()
      expect(summary).toEqual(mockReturnValue)
    })
  })

  describe('#gameStatus', () => {
    it('should call the league specific game summary function if game is not completed- NBA', () => {
      const mockNBAStatus = jest.fn()
        .mockReturnValue('QTR 4')

      leagueDisplays.default.NBA.gameStatus = mockNBAStatus

      const awayPeriodScores = [31, 32, 33, 34]
      const homePeriodScores = [21, 22, 23, 24]

      const wrapper = shallow(<Boxscore
        completed={false}
        awayPeriodScores={awayPeriodScores}
        homePeriodScores={homePeriodScores}
        league="NBA" />)

      const status = wrapper.instance().gameStatus()

      expect(mockNBAStatus).toHaveBeenCalled()
      expect(status).toEqual('QTR 4')
    })

    it('should call the league specific game summary function if game is not completed - MLB', () => {
      const mockMLBStatus = jest.fn()
        .mockReturnValue('TOP 5')

      leagueDisplays.default.MLB.gameStatus = mockMLBStatus

      const awayPeriodScores = [0, 0, 0, 1]
      const homePeriodScores = [2, 1, 0, 0]

      const wrapper = shallow(<Boxscore
        completed={false}
        awayPeriodScores={awayPeriodScores}
        homePeriodScores={homePeriodScores}
        league="MLB" />)

      const status = wrapper.instance().gameStatus()

      expect(mockMLBStatus).toHaveBeenCalled()
      expect(status).toEqual('TOP 5')
    })

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
  })
})
