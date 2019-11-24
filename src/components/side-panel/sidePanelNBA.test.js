import React from 'react'
import { shallow } from 'enzyme'

import SidePanelNBA from './SidePanelNBA'

describe('SidePanelNBA', () => {
  const durant = {
    last_name: 'Durant',
    first_name: 'Kevin',
    points: 32,
    assists: 3,
    defensive_rebounds: 9,
    offensive_rebounds: 2,
    rebounds: 11,
    team_abbreviation: 'OKC',
  }
  const russ = {
    last_name: 'Westbrook',
    first_name: 'Russell',
    points: 19,
    assists: 6,
    defensive_rebounds: 4,
    offensive_rebounds: 10,
    rebounds: 14,
    team_abbreviation: 'OKC',
  }
  const lebron = {
    last_name: 'James',
    first_name: 'LeBron',
    points: 26,
    assists: 4,
    defensive_rebounds: 7,
    offensive_rebounds: 4,
    rebounds: 11,
    team_abbreviation: 'MIA',
  }
  const wade = {
    last_name: 'Wade',
    first_name: 'Dwyane',
    points: 20,
    assists: 6,
    defensive_rebounds: 6,
    offensive_rebounds: 2,
    rebounds: 8,
    team_abbreviation: 'MIA',
  }

  const awayTeamStats = [durant, russ]
  const homeTeamStats = [lebron, wade]

  const highestTotalMockImpl = (coll, cat) => {
    if (coll[0].team_abbreviation === 'MIA') {
      if (cat === 'points' || cat === 'rebounds') {
        return lebron
      }
      return wade
    }
    if (cat === 'points') {
      return durant
    }
    return russ
  }
  const mockHighestTotal = jest.fn().mockImplementation(highestTotalMockImpl)

  const wrapper = shallow(<SidePanelNBA
    highestTotal={mockHighestTotal}
    awayTeamStats={awayTeamStats}
    homeTeamStats={homeTeamStats} />)

  const mockAddRebounds = jest.spyOn(wrapper.instance(), 'addUpRebounds')

  describe('#addUpRebounds', () => {
    it('should calculate rebounds totals for each player and return the updated collection', () => {
      const coll = [
        {
          offensive_rebounds: 2,
          defensive_rebounds: 5,
        },
        {
          offensive_rebounds: 3,
          defensive_rebounds: 9,
        },
      ]

      const updatedColl = wrapper.instance().addUpRebounds(coll)
      expect(updatedColl[0]).toEqual({ ...coll[0], rebounds: 7 })
      expect(updatedColl[1]).toEqual({ ...coll[1], rebounds: 12 })
    })
  })

  describe('#render', () => {
    it('should render a panel with top performers', () => {
      expect(wrapper.find('main.nba-panel-container').exists()).toBe(true)
      const categoryLabels = wrapper.find('.align-center').getElements()
      expect(categoryLabels[0].props.children).toBe('Points')
      expect(categoryLabels[1].props.children).toBe('Assists')
      expect(categoryLabels[2].props.children).toBe('Rebounds')
    })

    it('should display the names and stats of top performers', () => {
      wrapper.instance().forceUpdate()
      expect(mockAddRebounds).toBeCalledTimes(2)

      const homePerformersColumn = wrapper.find('.nba-panel-column').getElements()[2]
      const homePerformers = homePerformersColumn.props.children
      expect(homePerformers[0].props.children).toBe('L. James - 26')
      expect(homePerformers[1].props.children).toBe('D. Wade - 6')
      expect(homePerformers[2].props.children).toBe('L. James - 11')

      const awayPerformersColumn = wrapper.find('.nba-panel-column').getElements()[0]
      const awayPerformers = awayPerformersColumn.props.children
      expect(awayPerformers[0].props.children).toBe('K. Durant - 32')
      expect(awayPerformers[1].props.children).toBe('R. Westbrook - 6')
      expect(awayPerformers[2].props.children).toBe('R. Westbrook - 14')
    })
  })
})
