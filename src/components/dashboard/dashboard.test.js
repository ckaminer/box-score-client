import React from 'react'
import { shallow } from 'enzyme'

import ALL_LEAGUES from '../../consts'
import Dashboard from './Dashboard'
import * as api from '../../api/games'

describe('Dashboard', () => {
  const games = [
    {
      league: 'MLB',
      event_information: {
        status: 'completed',
      },
      home_team: {},
      away_team: {},
      home_period_scores: [],
      away_period_scores: [],
    },
    {
      league: 'NBA',
      event_information: {
        status: 'completed',
      },
      home_team: {},
      away_team: {},
      home_period_scores: [],
      away_period_scores: [],
    },
  ]
  const mockApiCall = jest.fn().mockResolvedValue(
    {
      payload: {
        body: games,
      },
    },
  )
  api.getGameData = mockApiCall

  describe('#boxscores', () => {
    it('should return a list of box scores if all leagues are active', () => {
      const wrapper = shallow(<Dashboard activeLeague={ALL_LEAGUES} />)
      wrapper.instance().setState({ games })

      const lineItems = wrapper.instance().boxscores()
      expect(lineItems.length).toBe(2)

      const firstSidePanel = lineItems[0].props.children[1].props.children
      expect(firstSidePanel.props.game.league).toBe('MLB')
      const secondSidePanel = lineItems[1].props.children[1].props.children
      expect(secondSidePanel.props.game.league).toBe('NBA')
    })

    it('should return only MLB scores if activeLeague is MLB', () => {
      const wrapper = shallow(<Dashboard activeLeague="MLB" />)
      wrapper.instance().setState({ games })

      const lineItems = wrapper.instance().boxscores()
      expect(lineItems.length).toBe(1)

      const firstSidePanel = lineItems[0].props.children[1].props.children
      expect(firstSidePanel.props.game.league).toBe('MLB')
    })

    it('should return only NBA scores if activeLeague is NBA', () => {
      const wrapper = shallow(<Dashboard activeLeague="NBA" />)
      wrapper.instance().setState({ games })

      const lineItems = wrapper.instance().boxscores()
      expect(lineItems.length).toBe(1)

      const firstSidePanel = lineItems[0].props.children[1].props.children
      expect(firstSidePanel.props.game.league).toBe('NBA')
    })
  })

  describe('#totals', () => {
    it('should return game totals for NBA games', () => {
      const game = {
        league: 'NBA',
        home_totals: {
          points: 100,
        },
        away_totals: {
          points: 103,
        },
      }

      const expectedTotals = {
        home: game.home_totals,
        away: game.away_totals,
      }

      const wrapper = shallow(<Dashboard activeLeague={ALL_LEAGUES} />)
      const totals = wrapper.instance().totals(game)

      expect(totals).toEqual(expectedTotals)
    })

    it('should return batter totals and errors for MLB games', () => {
      const game = {
        league: 'MLB',
        home_batter_totals: {
          hits: 8,
          runs: 4,
        },
        away_batter_totals: {
          hits: 7,
          runs: 5,
        },
        home_errors: 0,
        away_errors: 1,
      }

      const expectedTotals = {
        home: { ...game.home_batter_totals, errors: game.home_errors },
        away: { ...game.away_batter_totals, errors: game.away_errors },
      }

      const wrapper = shallow(<Dashboard activeLeague={ALL_LEAGUES} />)
      const totals = wrapper.instance().totals(game)

      expect(totals).toEqual(expectedTotals)
    })
  })

  describe('#render', () => {
    it('should render a list of boxscores with their associated side panels', () => {
      const wrapper = shallow(<Dashboard activeLeague={ALL_LEAGUES} />)
      wrapper.instance().setState({ games })

      expect(mockApiCall).toHaveBeenCalled()
      expect(wrapper.find('.dashboard-item').length).toBe(2)
      expect(wrapper.find('Boxscore').length).toBe(2)
      expect(wrapper.find('SidePanel').length).toBe(2)
    })
  })
})
