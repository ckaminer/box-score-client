import React from 'react'
import { shallow } from 'enzyme'

import SidePanel from './SidePanel'

describe('SidePanel', () => {
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
