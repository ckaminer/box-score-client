import React from 'react'
import { shallow } from 'enzyme'

import TeamTile from './TeamTile'

describe('TeamTile', () => {
  describe('#render', () => {
    it('should wrap a Card component', () => {
      const wrapper = shallow(<TeamTile />)

      expect(wrapper.find('Card').exists()).toBe(true)
    })

    it('should display the team color', () => {
      const wrapper = shallow(<TeamTile teamName="Heat" teamCity="Miami" />)

      const cardColor = wrapper.find('Card').prop('style').backgroundColor
      expect(cardColor).toBe('#98002E')
    })
  })
})
