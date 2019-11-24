/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { CardPanel } from 'react-materialize'
import SidePanelNBA from './SidePanelNBA'
import SidePanelMLB from './SidePanelMLB'
import './sidePanel.css'

const SidePanel = (props) => {
  const leaguePanel = () => {
    const { game } = props
    switch (game.league) {
      case 'NBA':
        return (
          <SidePanelNBA
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

  return (
    <CardPanel
      style={{ height: '100%', outline: 'solid', outlineWidth: 'thin' }}
      className="grey lighten-4">
      <h5 className="side-panel-title">Top Performers</h5>
      <div className="performer-container">
        {leaguePanel()}
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
