import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel } from 'react-materialize'
import uuidv1 from 'uuid/v1'

import leagueDisplays from './leagueDisplays'
import TeamTile from '../team-tile/TeamTile'
import './boxscore.css'
import {
  thunderInfo, heatInfo,
} from '../../team-data'

class Boxscore extends Component {
  static propTypes = {
    completed: PropTypes.bool,
    awayPeriodScores: PropTypes.arrayOf(PropTypes.number),
    homePeriodScores: PropTypes.arrayOf(PropTypes.number),
    awayTeam: PropTypes.object,
    homeTeam: PropTypes.object,
    awayTeamTotals: PropTypes.object,
    homeTeamTotals: PropTypes.object,
    league: PropTypes.string,
  }

  static defaultProps = {
    completed: true,
    awayPeriodScores: [0, 0, 2, 1, 0, 0, 0, 0, 0],
    homePeriodScores: [0, 2, 0, 0, 0, 0, 1, 0, 1],
    awayTeam: thunderInfo,
    homeTeam: heatInfo,
    awayTeamTotals: {},
    homeTeamTotals: {},
    league: 'NBA',
  }

  lineScores = () => {
    const {
      awayPeriodScores, homePeriodScores,
      awayTeam, homeTeam,
    } = this.props
    const lineScores = {
      header: [],
      away: [],
      home: [],
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= awayPeriodScores.length; i++) {
      if (i === 0) {
        lineScores.header.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()} />)
        lineScores.away.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{awayTeam.abbreviation}</td>)
        lineScores.home.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{homeTeam.abbreviation}</td>)
      } else {
        const idx = i - 1
        lineScores.header.push(<td className="boxscore-cell  grey lighten-2" key={uuidv1()}>{i}</td>)
        lineScores.away.push(<td className="boxscore-cell" key={uuidv1()}>{awayPeriodScores[idx]}</td>)
        lineScores.home.push(<td className="boxscore-cell" key={uuidv1()}>{homePeriodScores[idx]}</td>)
      }
    }

    const summary = this.gameSummary()
    lineScores.header = lineScores.header.concat(summary.header)
    lineScores.away = lineScores.away.concat(summary.away)
    lineScores.home = lineScores.home.concat(summary.home)

    return lineScores
  }

  gameSummary = () => {
    const { awayTeamTotals, homeTeamTotals, league } = this.props

    const lineScores = {
      header: [],
      away: [],
      home: [],
    }

    return leagueDisplays[league].gameSummary(awayTeamTotals, homeTeamTotals, lineScores)
  }

  gameStatus = () => {
    const {
      completed,
      league,
      awayPeriodScores,
      homePeriodScores,
    } = this.props

    if (!completed) {
      return leagueDisplays[league].gameStatus(awayPeriodScores, homePeriodScores)
    }
    return 'Final'
  }

  render = () => {
    const { awayTeam, homeTeam } = this.props
    const lineScores = this.lineScores()

    return (
      <div className="boxscore-container">
        <Row>
          <Col m={12} s={12}>
            <CardPanel
              className="grey lighten-4 with-footer"
              textClassName="black-text">
              <Row>
                <table>
                  <tbody>
                    <tr className="boxscore-row">{lineScores.header}</tr>
                    <tr className="boxscore-row">{lineScores.away}</tr>
                    <tr className="boxscore-row">{lineScores.home}</tr>
                  </tbody>
                </table>
              </Row>
              <Row className="grey lighten-2" style={{ display: 'flex' }}>
                <Col className="boxscore-footer" m={5}>
                  <TeamTile teamName={awayTeam.last_name} teamCity={awayTeam.first_name} />
                </Col>
                <Col className="boxscore-footer game-duration-status" m={2}>
                  {this.gameStatus()}
                </Col>
                <Col className="boxscore-footer" m={5}>
                  <TeamTile teamName={homeTeam.last_name} teamCity={homeTeam.first_name} />
                </Col>
              </Row>
            </CardPanel>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Boxscore
