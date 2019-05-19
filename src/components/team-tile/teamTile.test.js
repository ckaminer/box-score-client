import React from 'react'
import { shallow } from 'enzyme'

import TeamTile from './TeamTile'

describe('TeamTile', () => {
  describe('#render', () => {
    it('should wrap a Card component', () => {
      const wrapper = shallow(<TeamTile />)

      expect(wrapper.find('Card').exists()).toBe(true)
    })
  })
})
