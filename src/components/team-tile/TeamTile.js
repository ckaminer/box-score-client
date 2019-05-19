import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-materialize'

import './teamTile.css'

const TeamTile = (props) => {
  const { teamName, teamCity } = props

  const teamColorMap = {
    Thunder: '#007AC1',
    Heat: '#98002E',
    Mariners: '#0C2C56',
    Angels: '#BA0021',
  }

  return (
    <Card
      style={{ backgroundColor: teamColorMap[teamName], margin: 0 }}
      textClassName="white-text"
      className="team-tile"
      title={teamName.toUpperCase()}>
      {teamCity}
    </Card>
  )
}

TeamTile.propTypes = {
  teamName: PropTypes.string,
  teamCity: PropTypes.string,
}

TeamTile.defaultProps = {
  teamName: '',
  teamCity: '',
}

export default TeamTile
