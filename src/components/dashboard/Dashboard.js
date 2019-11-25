/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import ALL_LEAGUES from '../../consts'
import Boxscore from '../boxscore/Boxscore'
import SidePanel from '../side-panel/SidePanel'
import './dashboard.css'
import { getGameData } from '../../api/games'

class Dashboard extends Component {
  state = {
    games: [],
  }

  static propTypes = {
    activeLeague: PropTypes.string,
  }

  static defaultProps = {
    activeLeague: ALL_LEAGUES,
  }

  componentDidMount = async () => {
    const response = await getGameData()

    this.setState({ games: response.payload.body })
  }

  boxscores = () => {
    const { games } = this.state
    const { activeLeague } = this.props

    const dashboardItems = []
    // eslint-disable-next-line consistent-return
    games.forEach((game) => {
      if (activeLeague === game.league || activeLeague === ALL_LEAGUES) {
        const item = (
          <div className="dashboard-item" key={uuidv1()}>
            <div className="boxscore">
              <Boxscore
                completed={game.event_information.status === 'completed'}
                league={game.league}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                homePeriodScores={game.home_period_scores}
                awayPeriodScores={game.away_period_scores}
                homeTeamTotals={this.totals(game).home}
                awayTeamTotals={this.totals(game).away} />
            </div>
            <div className="sidepanel">
              <SidePanel game={game} />
            </div>
          </div>
        )
        dashboardItems.push(item)
      }
    })

    return dashboardItems
  }

  totals = (game) => {
    let homeTotals = game.home_totals
    let awayTotals = game.away_totals

    if (game.league === 'MLB') {
      homeTotals = { ...game.home_batter_totals, errors: game.home_errors }
      awayTotals = { ...game.away_batter_totals, errors: game.away_errors }
    }

    return {
      home: homeTotals,
      away: awayTotals,
    }
  }

  render = () => (
    <div>
      {
        this.boxscores()
      }
    </div>
  )
}

export default Dashboard
