import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-materialize'

import './teamTile.css'

const TeamTile = (props) => {
  const { teamName } = props

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
      title={teamName}>
      56-38
    </Card>
  )
}

TeamTile.propTypes = {
  teamName: PropTypes.string,
}

TeamTile.defaultProps = {
  teamName: '',
}

export default TeamTile
