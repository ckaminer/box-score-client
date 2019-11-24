import React from 'react'
import { shallow } from 'enzyme'

import SidePanel from './SidePanel'

describe('SidePanel', () => {
  describe('#highestTotal', () => {
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

      const wrapper = shallow(<SidePanel />)
      const mostPoints = wrapper.instance().highestTotal(playerStats, 'points')
      const mostRebounds = wrapper.instance().highestTotal(playerStats, 'rebounds')
      const mostAssists = wrapper.instance().highestTotal(playerStats, 'assists')

      expect(mostPoints).toBe(dennis)
      expect(mostRebounds).toBe(dee)
      expect(mostAssists).toBe(mac)
    })
  })

  describe('#render', () => {
    it('should render a card with an NBA panel if league is NBA', () => {
      const game = {
        league: 'NBA',
        away_stats: [{}],
        home_stats: [{}],
      }
      const wrapper = shallow(<SidePanel game={game} />)
      const card = wrapper.find('CardPanel')

      expect(card.exists()).toBe(true)

      expect(wrapper.find('.side-panel-title').text()).toBe('Top Performers')
      expect(wrapper.find('SidePanelNBA').exists()).toBe(true)
    })

    it('should render a card with an MLB panel if league is MLB', () => {
      const game = {
        league: 'MLB',
        away_stats: [{}],
        home_stats: [{}],
      }
      const wrapper = shallow(<SidePanel game={game} />)
      const card = wrapper.find('CardPanel')

      expect(card.exists()).toBe(true)

      expect(wrapper.find('.side-panel-title').text()).toBe('Top Performers')
      expect(wrapper.find('SidePanelMLB').exists()).toBe(true)
    })
  })
})
