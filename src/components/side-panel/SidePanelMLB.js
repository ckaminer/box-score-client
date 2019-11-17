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
      <div>
        <div className="mlb-panel-table" style={{ float: 'left' }}>
          <table>
            <tbody>
              <tr>
                <td className="align-center">
                  {`W: ${wp.display_name[0]}. ${wp.last_name} - ${wp.team_abbreviation}`}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {`${wp.innings_pitched} IP, ${wp.hits_allowed} H, ${wp.runs_allowed} R, ${wp.earned_runs} ER, ${wp.strike_outs} K`}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {`L: ${lp.display_name[0]}. ${lp.last_name} - ${lp.team_abbreviation}`}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {`${lp.innings_pitched} IP, ${lp.hits_allowed} H, ${lp.runs_allowed} R, ${lp.earned_runs} ER, ${lp.strike_outs} K`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mlb-panel-table" style={{ float: 'right' }}>
          <table>
            <tbody>
              <tr>
                <td className="align-center">
                  {`${homeHitter.display_name[0]}. ${homeHitter.last_name} - ${homeHitter.team_abbreviation}`}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {homeHitter.batting_highlights}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {`${awayHitter.display_name[0]}. ${awayHitter.last_name} - ${awayHitter.team_abbreviation}`}
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  {awayHitter.batting_highlights}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SidePanelMLB
