import React, { Component } from 'react'
import highestTotal from './helper'
import './sidePanel.css'

class SidePanelNBA extends Component {
  addUpRebounds = (collection) => collection.map((player) => {
    const rebounds = player.offensive_rebounds + player.defensive_rebounds
    return { ...player, rebounds }
  })

  render = () => {
    // eslint-disable-next-line react/prop-types
    let { awayTeamStats, homeTeamStats } = this.props
    awayTeamStats = this.addUpRebounds(awayTeamStats)
    homeTeamStats = this.addUpRebounds(homeTeamStats)
    const awayPoints = highestTotal(awayTeamStats, 'points')
    const homePoints = highestTotal(homeTeamStats, 'points')
    const awayAssists = highestTotal(awayTeamStats, 'assists')
    const homeAssists = highestTotal(homeTeamStats, 'assists')
    const awayRebounds = highestTotal(awayTeamStats, 'rebounds')
    const homeRebounds = highestTotal(homeTeamStats, 'rebounds')

    return (
      <table>
        <thead>
          <tr>
            <th className="third-width performer-header">{`${awayPoints.team_abbreviation}`}</th>
            <th className="third-width performer-header" />
            <th className="third-width performer-header" style={{ textAlign: 'right' }}>{`${homePoints.team_abbreviation}`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="third-width performer-away">
              {`${awayPoints.first_name[0]}. ${awayPoints.last_name} - ${awayPoints.points}`}
            </td>
            <td className="third-width align-center">
              Points
            </td>
            <td className="third-width performer-home">
              {`${homePoints.first_name[0]}. ${homePoints.last_name} - ${homePoints.points}`}
            </td>
          </tr>
          <tr>
            <td className="third-width performer-away">
              {`${awayAssists.first_name[0]}. ${awayAssists.last_name} - ${awayAssists.assists}`}
            </td>
            <td className="third-width align-center">
              Assists
            </td>
            <td className="third-width performer-home">
              {`${homeAssists.first_name[0]}. ${homeAssists.last_name} - ${homeAssists.assists}`}
            </td>
          </tr>
          <tr>
            <td className="third-width performer-away">
              {`${awayRebounds.first_name[0]}. ${awayRebounds.last_name} - ${awayRebounds.rebounds}`}
            </td>
            <td className="third-width align-center">
              Rebounds
            </td>
            <td className="third-width performer-home">
              {`${homeRebounds.first_name[0]}. ${homeRebounds.last_name} - ${homeRebounds.rebounds}`}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default SidePanelNBA
