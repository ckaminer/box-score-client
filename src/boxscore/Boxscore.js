import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel } from 'react-materialize'

import TeamTile from '../team-tile/TeamTile'
import './boxscore.css'
import {
  thunderInfo, heatInfo, marinerInfo, angelInfo,
} from '../team-data'

class Boxscore extends Component {
  static propTypes = {
    awayPeriodScores: PropTypes.arrayOf(PropTypes.number),
    homePeriodScores: PropTypes.arrayOf(PropTypes.number),
    awayTeam: PropTypes.objectOf(PropTypes.object),
    homeTeam: PropTypes.objectOf(PropTypes.object),
  }

  static defaultProps = {
    awayPeriodScores: [0, 0, 2, 1, 0, 0, 0, 0, 0],
    homePeriodScores: [0, 2, 0, 0, 0, 0, 1, 0, 1],
    awayTeam: thunderInfo,
    homeTeam: heatInfo,
  }

  state = {}

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
        lineScores.header.push(<td className="boxscore-cell grey lighten-2" />)
        lineScores.away.push(<td className="boxscore-cell grey lighten-2">{awayTeam.abbreviation}</td>)
        lineScores.home.push(<td className="boxscore-cell grey lighten-2">{homeTeam.abbreviation}</td>)
      } else {
        const idx = i - 1
        lineScores.header.push(<td className="boxscore-cell  grey lighten-2">{i}</td>)
        lineScores.away.push(<td className="boxscore-cell">{awayPeriodScores[idx]}</td>)
        lineScores.home.push(<td className="boxscore-cell">{homePeriodScores[idx]}</td>)
      }
    }
    return lineScores
  }

  render() {
    const { awayTeam, homeTeam } = this.props
    const lineScores = this.lineScores()

    return (
      <div>
        <Row>
          <Col m={6} s={12}>
            <CardPanel
              className="grey lighten-4 with-footer"
              textClassName="black-text"
              title="Card title">
              <Row>
                <table>
                  <tr className="boxscore-row">{lineScores.header}</tr>
                  <tr className="boxscore-row">{lineScores.away}</tr>
                  <tr className="boxscore-row">{lineScores.home}</tr>
                </table>
              </Row>
              <Row className="grey lighten-2">
                <Col className="boxscore-footer" m={5}>
                  <TeamTile teamName={awayTeam.last_name} teamCity={awayTeam.first_name} />
                </Col>
                <Col className="boxscore-footer game-duration-status" m={2}>
                  Final
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
