import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel } from 'react-materialize'

import TeamTile from '../team-tile/TeamTile'
import './boxscore.css'

class Boxscore extends Component {
  static propTypes = {
    awayPeriodScores: PropTypes.arrayOf(PropTypes.number),
    homePeriodScores: PropTypes.arrayOf(PropTypes.number),
    awayTeamName: PropTypes.string,
    homeTeamName: PropTypes.string,
  }

  static defaultProps = {
    awayPeriodScores: [0, 0, 2, 1, 0, 0, 0, 0, 0],
    homePeriodScores: [0, 2, 0, 0, 0, 0, 1, 0, 1],
    awayTeamName: 'Mariners',
    homeTeamName: 'Angels',
  }

  state = {}

  lineScores = () => {
    const {
      awayPeriodScores, homePeriodScores,
      awayTeamName, homeTeamName,
    } = this.props
    const lineScores = {
      header: [],
      away: [],
      home: [],
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= awayPeriodScores.length; i++) {
      if (i === 0) {
        lineScores.header.push(<td />)
        lineScores.away.push(<td>{awayTeamName}</td>)
        lineScores.home.push(<td>{homeTeamName}</td>)
      } else {
        lineScores.header.push(<td>{i}</td>)
        lineScores.away.push(<td>{awayPeriodScores[i]}</td>)
        lineScores.home.push(<td>{homePeriodScores[i]}</td>)
      }
    }
    return lineScores
  }

  render() {
    const { awayTeamName, homeTeamName } = this.props
    const lineScores = this.lineScores()

    return (
      <div>
        <Row>
          <Col m={6} s={12}>
            <CardPanel
              className="grey lighten-3 with-footer"
              textClassName="black-text"
              title="Card title">
              <Row>
                <table>
                  <tr>{lineScores.header}</tr>
                  <tr>{lineScores.away}</tr>
                  <tr>{lineScores.home}</tr>
                </table>
              </Row>
              <Row>
                <Col style={{ margin: 0 }} m={5}><TeamTile teamName={awayTeamName} /></Col>
                <Col m={2}>Top 9</Col>
                <Col style={{ margin: 0 }} m={5}><TeamTile teamName={homeTeamName} /></Col>
              </Row>
            </CardPanel>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Boxscore
