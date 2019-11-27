/* eslint-disable no-unused-vars */
import React from 'react'
import uuidv1 from 'uuid/v1'

// MLB SPECIFIC FUNCTIONS
const mlbGameStatus = (awayPeriodScores, homePeriodScores) => {
  if (awayPeriodScores.length > homePeriodScores.length) {
    return `BOT ${awayPeriodScores.length}`
  }
  return `TOP ${homePeriodScores.length + 1}`
}

const mlbGameSummary = (awayTeamTotals, homeTeamTotals, lineScores) => {
  lineScores.header.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>R</td>)
  lineScores.header.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>H</td>)
  lineScores.header.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>E</td>)
  lineScores.away.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{awayTeamTotals.runs}</td>)
  lineScores.away.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{awayTeamTotals.hits}</td>)
  lineScores.away.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{awayTeamTotals.errors}</td>)
  lineScores.home.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{homeTeamTotals.runs}</td>)
  lineScores.home.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{homeTeamTotals.hits}</td>)
  lineScores.home.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{homeTeamTotals.errors}</td>)

  return lineScores
}

// NBA SPECIFIC FUNCTIONS
// eslint-disable-next-line arrow-body-style
const nbaGameStatus = (awayPeriodScores, homePeriodScores) => {
  return awayPeriodScores.length < 5
    ? `QTR ${awayPeriodScores.length}`
    : 'OT'
}

const nbaGameSummary = (awayTeamTotals, homeTeamTotals, lineScores) => {
  lineScores.header.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>T</td>)
  lineScores.away.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{awayTeamTotals.points}</td>)
  lineScores.home.push(<td className="boxscore-cell grey lighten-2" key={uuidv1()}>{homeTeamTotals.points}</td>)

  return lineScores
}

const leagueDisplays = {
  MLB: {
    minColumnCount: 9,
    gameStatus: mlbGameStatus,
    gameSummary: mlbGameSummary,
  },
  NBA: {
    minColumnCount: 4,
    gameStatus: nbaGameStatus,
    gameSummary: nbaGameSummary,
  },
}

export default leagueDisplays
