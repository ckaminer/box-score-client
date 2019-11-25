import React from 'react'
import { shallow, mount } from 'enzyme'
import { Navbar as MaterialNav, NavItem } from 'react-materialize'

import Navbar from './Navbar'

describe('Navbar', () => {
  describe('#navItemStyle', () => {
    it('should return yellow and underline if the given league is active', () => {
      const wrapper = shallow(<Navbar activeLeague="MLB" />)

      const activeColor = wrapper.instance().navItemStyle('MLB')
      expect(activeColor).toEqual({ color: 'yellow', textDecoration: 'underline' })
    })

    it('should return white if the given league is not active', () => {
      const wrapper = shallow(<Navbar activeLeague="NBA" />)

      const activeColor = wrapper.instance().navItemStyle('MLB')
      expect(activeColor).toEqual({ color: 'white' })
    })
  })

  describe('#render', () => {
    it('should wrap navbar from materialize with nav items', () => {
      const wrapper = shallow(<Navbar />)

      expect(wrapper.find(MaterialNav).exists()).toBe(true)
      expect(wrapper.find(NavItem).exists()).toBe(true)
    })

    it('should call toogleActiveLeague when a NavItem is clicked', () => {
      const mockToggleLeague = jest.fn()
      const wrapper = mount(<Navbar toggleActiveLeague={mockToggleLeague} />)

      const navItem = wrapper.find(NavItem).first()
      navItem.simulate('click')
      expect(mockToggleLeague).toHaveBeenCalledWith('NBA')
    })
  })
})
