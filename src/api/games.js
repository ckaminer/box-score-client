import axios from 'axios'

export const SUCCESS = 'success'
export const FAILURE = 'failure'

export const getGameData = async (league) => {
  let url = 'http://localhost:8081/api/v1/games'
  if (league) {
    url = `${url}?league=${league}`
  }
  const req = {
    method: 'get',
    url,
  }

  let formattedResponse

  try {
    const res = await axios.request(req)

    formattedResponse = {
      type: SUCCESS,
      payload: { body: res.data },
    }
  } catch (err) {
    const { response } = err
    formattedResponse = {
      type: FAILURE,
      payload: {
        error: {
          message: response.data.message ? response.data.message : 'Request failed',
          status: response.status,
        },
      },
    }
  }

  return formattedResponse
}

export default getGameData
