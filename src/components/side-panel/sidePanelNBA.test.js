import React from 'react'
import { shallow } from 'enzyme'

import SidePanelNBA from './SidePanelNBA'

describe('SidePanelNBA', () => {
  const awayStats = [
    {
      last_name: 'Durant',
      first_name: 'Kevin',
      points: 32,
      assists: 3,
      defensive_rebounds: 9,
      offensive_rebounds: 2,
      team_abbreviation: 'OKC',
    },
    {
      last_name: 'Westbrook',
      first_name: 'Russell',
      points: 19,
      assists: 6,
      defensive_rebounds: 4,
      offensive_rebounds: 0,
      team_abbreviation: 'OKC',
    },
    {
      last_name: 'Ibaka',
      first_name: 'Serge',
      points: 9,
      assists: 0,
      defensive_rebounds: 0,
      offensive_rebounds: 4,
      team_abbreviation: 'OKC',
    },
  ]
  const homeStats = [
    {
      last_name: 'James',
      first_name: 'LeBron',
      points: 26,
      assists: 13,
      defensive_rebounds: 7,
      offensive_rebounds: 4,
      team_abbreviation: 'MIA',
    },
    {
      last_name: 'Wade',
      first_name: 'Dwyane',
      points: 20,
      assists: 3,
      defensive_rebounds: 6,
      offensive_rebounds: 2,
      team_abbreviation: 'MIA',
    },
    {
      last_name: 'Bosh',
      first_name: 'Chris',
      points: 24,
      assists: 0,
      defensive_rebounds: 7,
      offensive_rebounds: 0,
      team_abbreviation: 'MIA',
    },
  ]
  describe('#render', () => {
    const wrapper = shallow(<SidePanelNBA
      awayTeamStats={awayStats}
      homeTeamStats={homeStats} />)
    it('should render a panel with top performers', () => {
      expect(wrapper.find('main.nba-panel-container').exists()).toBe(true)
      const categoryLabels = wrapper.find('.align-center').getElements()
      expect(categoryLabels[0].props.children).toBe('Points')
      expect(categoryLabels[1].props.children).toBe('Assists')
      expect(categoryLabels[2].props.children).toBe('Rebounds')
    })

    it('should display the names and stats of top performers', () => {
      const homePerformersColumn = wrapper.find('.nba-panel-column').getElements()[2]
      const homePerformers = homePerformersColumn.props.children
      expect(homePerformers[0].props.children).toBe('L. James - 26')
      expect(homePerformers[1].props.children).toBe('L. James - 13')
      expect(homePerformers[2].props.children).toBe('L. James - 11')

      const awayPerformersColumn = wrapper.find('.nba-panel-column').getElements()[0]
      const awayPerformers = awayPerformersColumn.props.children
      expect(awayPerformers[0].props.children).toBe('K. Durant - 32')
      expect(awayPerformers[1].props.children).toBe('R. Westbrook - 6')
      expect(awayPerformers[2].props.children).toBe('K. Durant - 11')
    })
  })
})
