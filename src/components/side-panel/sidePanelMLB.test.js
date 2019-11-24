import React from 'react'
import { mount } from 'enzyme'

import SidePanelMLB from './SidePanelMLB'

describe('SidePanelMLB', () => {
  const awayPitchers = [
    {
      last_name: 'Hernández',
      first_name: 'Félix',
      display_name: 'Felix Hernández',
      win: true,
      loss: false,
      innings_pitched: 6,
      hits_allowed: 5,
      runs_allowed: 2,
      earned_runs: 2,
      strike_outs: 9,
      team_abbreviation: 'SEA',
    },
    {
      last_name: 'Kinney',
      first_name: 'Joshua',
      display_name: 'Josh Kinney',
      win: false,
      loss: false,
      innings_pitched: 0.2,
      hits_allowed: 3,
      runs_allowed: 1,
      earned_runs: 1,
      strike_outs: 0,
      team_abbreviation: 'SEA',
    },
    {
      last_name: 'Pérez',
      first_name: 'Óliver',
      display_name: 'Oliver Perez',
      win: false,
      loss: false,
      innings_pitched: 0.1,
      hits_allowed: 0,
      runs_allowed: 0,
      earned_runs: 0,
      strike_outs: 0,
      team_abbreviation: 'SEA',
    },
  ]
  const homePitchers = [
    {
      last_name: 'Wilson',
      first_name: 'Christopher',
      display_name: 'C.J. Wilson',
      win: false,
      loss: true,
      innings_pitched: 5.1,
      hits_allowed: 5,
      runs_allowed: 3,
      earned_runs: 3,
      strike_outs: 5,
      team_abbreviation: 'LAA',
    },
    {
      last_name: 'Williams',
      first_name: 'Jerome',
      display_name: 'Jerome Williams',
      win: false,
      loss: false,
      innings_pitched: 1.2,
      hits_allowed: 0,
      runs_allowed: 0,
      earned_runs: 0,
      strike_outs: 1,
      team_abbreviation: 'LAA',
    },
    {
      last_name: 'Jepsen',
      first_name: 'Kevin',
      display_name: 'Kevin Jepsen',
      win: false,
      loss: false,
      innings_pitched: 1,
      hits_allowed: 0,
      runs_allowed: 0,
      earned_runs: 0,
      strike_outs: 0,
      team_abbreviation: 'LAA',
    },
  ]
  const awayBatters = [
    {
      last_name: 'Ackley',
      first_name: 'Dustin',
      display_name: 'Dustin Ackley',
      position: '2B',
      doubles: 0,
      triples: 0,
      home_runs: 0,
      hits: 2,
      team_abbreviation: 'SEA',
      batting_highlights: '0-4',
    },
    {
      last_name: 'Gutierrez',
      first_name: 'Franklin',
      display_name: 'Franklin Gutierrez',
      position: 'CF',
      doubles: 1,
      triples: 0,
      home_runs: 0,
      hits: 1,
      team_abbreviation: 'SEA',
      batting_highlights: '0-3, RBI',
    },
    {
      last_name: 'Seager',
      first_name: 'Kyle',
      display_name: 'Kyle Seager',
      position: '3B',
      doubles: 0,
      triples: 0,
      home_runs: 1,
      hits: 1,
      team_abbreviation: 'SEA',
      batting_highlights: '0-3',
    },
  ]
  const homeBatters = [
    {
      last_name: 'Trout',
      first_name: 'Michael',
      display_name: 'Mike Trout',
      position: 'CF-LF',
      doubles: 0,
      triples: 0,
      home_runs: 0,
      hits: 0,
      team_abbreviation: 'LAA',
      batting_highlights: '0-3',
    },
    {
      last_name: 'Hunter',
      first_name: 'Torii',
      display_name: 'Torii Hunter',
      position: 'RF',
      doubles: 0,
      triples: 0,
      home_runs: 0,
      hits: 2,
      team_abbreviation: 'LAA',
      batting_highlights: '2-5, 2 RBI',
    },
    {
      last_name: 'Pujols',
      first_name: 'Jose',
      display_name: 'Albert Pujols',
      position: 'DH',
      doubles: 0,
      triples: 0,
      home_runs: 0,
      hits: 1,
      team_abbreviation: 'LAA',
      batting_highlights: '1-4',
    },
  ]
  const wrapper = mount(<SidePanelMLB
    awayPitchers={awayPitchers}
    homePitchers={homePitchers}
    awayBatters={awayBatters}
    homeBatters={homeBatters} />)
  describe('#render', () => {
    it('should render two sections with top performers', () => {
      expect(wrapper.find('section.mlb-panel-column').length).toBe(2)
      expect(wrapper.find('.mlb-panel-child').length).toBe(4)
    })

    it('should render the winning and losing pitcher names', () => {
      expect(wrapper.text().includes('WIN - F. Hernández')).toBe(true)
      expect(wrapper.text().includes('LOSS - C. Wilson')).toBe(true)
    })

    it('should render the most productive hitters for each team', () => {
      expect(wrapper.text().includes('K. Seager')).toBe(true)
      expect(wrapper.text().includes('T. Hunter')).toBe(true)
    })
  })

  describe('#getPerformingPitcher', () => {
    it('should return the winning pitcher when the category is win', () => {
      const winningPitcher = wrapper.instance().getPerformingPitcher('win')
      expect(winningPitcher.display_name).toBe('Felix Hernández')
    })

    it('should return the losing pitcher when the category is loss', () => {
      const winningPitcher = wrapper.instance().getPerformingPitcher('loss')
      expect(winningPitcher.display_name).toBe('C.J. Wilson')
    })
  })

  describe('#getPerformingHitter', () => {
    it('should return the hitter with the best stats for the given collection', () => {
      const performingHitter = wrapper.instance().getPerformingHitter(awayBatters)
      expect(performingHitter.display_name).toBe('Kyle Seager')
    })

    it('should return the first hitter if no one records a hit', () => {
      const hitters = [
        {
          display_name: 'leadoff',
          doubles: 0,
          triples: 0,
          home_runs: 0,
          hits: 0,
        },
        {
          display_name: 'two hole',
          doubles: 0,
          triples: 0,
          home_runs: 0,
          hits: 0,
        },
        {
          display_name: 'third hitter',
          doubles: 0,
          triples: 0,
          home_runs: 0,
          hits: 0,
        },
      ]
      const performingHitter = wrapper.instance().getPerformingHitter(hitters)
      expect(performingHitter.display_name).toBe('leadoff')
    })
  })
})
