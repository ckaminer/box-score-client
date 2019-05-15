import React from 'react'

import Boxscore from '../boxscore/Boxscore'
import {
  thunderInfo, heatInfo, marinerInfo, angelInfo,
} from '../team-data'
import './dashboard.css'

const Dashboard = () => (
  <div>
    <div className="dashboard-item">
      <Boxscore
        homeTeam={heatInfo}
        awayTeam={thunderInfo}
        homePeriodScores={[31, 28, 36, 26]}
        awayPeriodScores={[26, 23, 22, 35]} />
    </div>
    <div className="dashboard-item">
      <Boxscore
        homeTeam={angelInfo}
        awayTeam={marinerInfo} />
    </div>
  </div>
)

export default Dashboard
