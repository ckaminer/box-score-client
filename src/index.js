import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ALL_LEAGUES from './consts'
import Router from './Router'
import Navbar from './components/navbar/Navbar'
import './styles.css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'

class App extends Component {
  state = {
    activeLeague: ALL_LEAGUES,
  }

  setActiveLeague = (league) => {
    const { activeLeague } = this.state
    const newLeague = activeLeague === league ? ALL_LEAGUES : league
    this.setState({ activeLeague: newLeague })
  }

  render = () => {
    const { activeLeague } = this.state
    return (
      <div>
        <Navbar toggleActiveLeague={this.setActiveLeague} activeLeague={activeLeague} />
        <Router activeLeague={activeLeague} />
      </div>
    )
  }
}

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
