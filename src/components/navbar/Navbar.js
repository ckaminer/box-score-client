import React from 'react'
import { Navbar as MaterialNav, NavItem } from 'react-materialize'

import './navbar.css'
import bssLogo from './bss-logo.png'

const Navbar = () => (
  <div>
    <MaterialNav brand={<span><img src={bssLogo} alt="BarstoolBoxScores" /></span>} alignLinks="right">
      <NavItem>NBA</NavItem>
      <NavItem>MLB</NavItem>
    </MaterialNav>
  </div>
)

export default Navbar
