import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar as MaterialNav, NavItem } from 'react-materialize'

import './navbar.css'
import bssLogo from './bss-logo.png'

class Navbar extends Component {
  // eslint-disable-next-line arrow-body-style
  navItemStyle = (league) => {
    const { activeLeague } = this.props
    return activeLeague === league
      ? { color: 'yellow', textDecoration: 'underline' }
      : { color: 'white' }
  }

  render = () => {
    const { toggleActiveLeague } = this.props

    return (
      <div>
        <MaterialNav brand={<span><img src={bssLogo} alt="BarstoolBoxScores" /></span>} alignLinks="right">
          <NavItem onClick={() => (toggleActiveLeague('NBA'))} style={this.navItemStyle('NBA')}>
            NBA
          </NavItem>
          <NavItem onClick={() => (toggleActiveLeague('MLB'))} style={this.navItemStyle('MLB')}>
            MLB
          </NavItem>
        </MaterialNav>
      </div>
    )
  }
}

Navbar.propTypes = {
  toggleActiveLeague: PropTypes.func,
  activeLeague: PropTypes.string,
}

Navbar.defaultProps = {
  toggleActiveLeague: () => { },
  activeLeague: 'NBA',
}

export default Navbar
