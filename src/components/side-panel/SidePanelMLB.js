import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MLBHitterBox from './mlbHitterBox'
import MLBPitcherBox from './mlbPitcherBox'
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
    const winningPitcher = this.getPerformingPitcher('win')
    const losingPitcher = this.getPerformingPitcher('loss')
    const homeHitter = this.getPerformingHitter(homeBatters)
    const awayHitter = this.getPerformingHitter(awayBatters)

    return (
      <main className="mlb-panel-container">
        <section className="mlb-panel-column">
          <MLBPitcherBox pitcher={winningPitcher} winner />
          <MLBPitcherBox pitcher={losingPitcher} />
        </section>
        <section className="mlb-panel-column">
          <MLBHitterBox hitter={awayHitter} />
          <MLBHitterBox hitter={homeHitter} />
        </section>
      </main>
    )
  }
}

export default SidePanelMLB
