import React from 'react'
import { shallow } from 'enzyme'
import { Navbar as MaterialNav, NavItem } from 'react-materialize'

import Navbar from './Navbar'

describe('Navbar', () => {
  describe('#render', () => {
    it('should wrap navbar from materialize with nav items', () => {
      const wrapper = shallow(<Navbar />)

      expect(wrapper.find(MaterialNav).exists()).toBe(true)
      expect(wrapper.find(NavItem).exists()).toBe(true)
    })
  })
})
