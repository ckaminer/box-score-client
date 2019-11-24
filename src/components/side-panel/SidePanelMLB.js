import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sidePanel.css'

class SidePanelMLB extends Component {
  static propTypes = {
    awayPitchers: PropTypes.arrayOf(PropTypes.object),
    homePitchers: PropTypes.arrayOf(PropTypes.object),
    awayBatters: PropTypes.arrayOf(PropTypes.object),
    homeBatters: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    awayPitchers: [{}],
    homePitchers: [{}],
    awayBatters: [{}],
    homeBatters: [{}],
  }

  getPerformingPitcher = (category) => {
    const { awayPitchers, homePitchers } = this.props
    const allPitchers = awayPitchers.concat(homePitchers)
    let foundPitcher
    allPitchers.forEach((pitcher) => {
      if (pitcher[category]) {
        foundPitcher = pitcher
      }
    })
    return foundPitcher
  }

  getPerformingHitter = (collection) => {
    const initialMax = { ...collection[0], rating: 0 }
    return collection.reduce((max, player) => {
      const playerRating = 0.5 * player.home_runs + 0.25 * (player.doubles + player.triples) + 0.25 * player.hits
      return playerRating > max.rating ? { ...player, rating: playerRating } : max
    }, initialMax)
  }

  render = () => {
    const { homeBatters, awayBatters } = this.props
    const wp = this.getPerformingPitcher('win')
    const lp = this.getPerformingPitcher('loss')
    const homeHitter = this.getPerformingHitter(homeBatters)
    const awayHitter = this.getPerformingHitter(awayBatters)

    return (
      <main className="mlb-panel-container">
        <section className="mlb-panel-column">
          <div className="mlb-panel-child">
            <p className="mlb-panel-line-item">
              <b>WIN: </b>
              {`${wp.display_name[0]}. ${wp.last_name}`}
            </p>
            <p className="mlb-team-position-subtitle mlb-panel-line-item">
              {`${wp.team_abbreviation} - ${wp.pitch_order === 1 ? 'SP' : 'RP'}`}
            </p>
            <p className="mlb-stat-line mlb-panel-line-item">
              {`${wp.innings_pitched} IP, ${wp.hits_allowed} H, ${wp.runs_allowed} R, ${wp.earned_runs} ER, ${wp.strike_outs} K`}
            </p>
          </div>
          <div className="mlb-panel-child">
            <p className="mlb-panel-line-item">
              <b>LOSS: </b>
              {`${lp.display_name[0]}. ${lp.last_name}`}
            </p>
            <p className="mlb-team-position-subtitle mlb-panel-line-item">
              {`${lp.team_abbreviation} - ${lp.pitch_order === 1 ? 'SP' : 'RP'}`}
            </p>
            <p className="mlb-stat-line mlb-panel-line-item">
              {`${lp.innings_pitched} IP, ${lp.hits_allowed} H, ${lp.runs_allowed} R, ${lp.earned_runs} ER, ${lp.strike_outs} K`}
            </p>
          </div>
        </section>
        <section className="mlb-panel-column">
          <div className="mlb-panel-child">
            <p className="mlb-panel-line-item">
              {`${awayHitter.display_name[0]}. ${awayHitter.last_name}`}
            </p>
            <p className="mlb-team-position-subtitle  mlb-panel-line-item">
              {`${awayHitter.team_abbreviation} - ${awayHitter.position}`}
            </p>
            <p className="mlb-stat-line mlb-panel-line-item">
              {awayHitter.batting_highlights}
            </p>
          </div>
          <div className="mlb-panel-child">
            <p className="mlb-panel-line-item">
              {`${homeHitter.display_name[0]}. ${homeHitter.last_name}`}
            </p>
            <p className="mlb-team-position-subtitle mlb-panel-line-item">
              {`${homeHitter.team_abbreviation} - ${homeHitter.position}`}
            </p>
            <p className="mlb-stat-line mlb-panel-line-item">
              {homeHitter.batting_highlights}
            </p>
          </div>
        </section>
      </main>
    )
  }
}

export default SidePanelMLB
