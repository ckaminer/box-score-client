/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CardPanel } from 'react-materialize'
import SidePanelNBA from './SidePanelNBA'
import SidePanelMLB from './SidePanelMLB'
import './sidePanel.css'

class SidePanel extends Component {
  /* eslint-disable arrow-body-style */
  highestTotal = (collection, category) => {
    const initialMax = {}
    initialMax[category] = 0
    return collection.reduce((max, player) => {
      return player[category] > max[category] ? player : max
    }, initialMax)
  }

  leaguePanel = () => {
    const { game } = this.props
    switch (game.league) {
      case 'NBA':
        return (
          <SidePanelNBA
            highestTotal={this.highestTotal}
            awayTeam={game.away_team}
            homeTeam={game.home_team}
            awayTeamStats={game.away_stats}
            homeTeamStats={game.home_stats} />
        )
      case 'MLB':
        return (
          <SidePanelMLB
            awayPitchers={game.away_pitchers}
            homePitchers={game.home_pitchers}
            awayBatters={game.away_batters}
            homeBatters={game.home_batters} />
        )
      default:
        return <CardPanel />
    }
  }

  render = () => (
    <CardPanel
      style={{ height: '100%', boxShadow: '5px 5px 10px lightGrey' }}
      className="grey lighten-4">
      <h5 className="side-panel-title">Top Performers</h5>
      <div className="performer-container">
        {this.leaguePanel()}
      </div>
    </CardPanel>
  )
}

SidePanel.propTypes = {
  game: PropTypes.object,
}

SidePanel.defaultProps = {
  game: {},
}

export default SidePanel
