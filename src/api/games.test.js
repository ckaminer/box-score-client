import axios from 'axios'

import { getGameData, SUCCESS, FAILURE } from './games'

describe('getGameData', () => {
  it('should return a formatted response with type success and payload body of the api response', async () => {
    const resData = {
      league: 'MLB',
      team_hitting_totals: {},
      away_hitting_totals: {},
    }
    const axiosMock = jest.spyOn(axios, 'request').mockResolvedValueOnce({ data: resData })

    const req = {
      method: 'get',
      url: 'http://localhost:8081/api/v1/games',
    }
    const res = await getGameData()

    expect(axiosMock).toHaveBeenCalledWith(req)
    expect(res.payload.body).toEqual(resData)
    expect(res.type).toEqual(SUCCESS)
  })

  it('should add a query param for the specified league', async () => {
    const resData = {
      league: 'MLB',
      team_hitting_totals: {},
      away_hitting_totals: {},
    }
    const axiosMock = jest.spyOn(axios, 'request').mockResolvedValueOnce({ data: resData })

    const req = {
      method: 'get',
      url: 'http://localhost:8081/api/v1/games?league=MLB',
    }
    const res = await getGameData('MLB')

    expect(axiosMock).toHaveBeenCalledWith(req)
    expect(res.payload.body).toEqual(resData)
    expect(res.type).toEqual(SUCCESS)
  })

  it('should return a formatted error if the call is not successful', async () => {
    const resError = {
      response: { data: { message: 'Invalid league' } },
      status: 424,
    }
    jest.spyOn(axios, 'request').mockRejectedValueOnce(resError)

    const res = await getGameData()

    expect(res.payload.error.message).toEqual(resError.response.data.message)
    expect(res.payload.error.status).toEqual(resError.response.data.status)
    expect(res.type).toEqual(FAILURE)
  })
})
