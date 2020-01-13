import axios from 'axios'

const serverUrl = 'https://thatsmontreal.com/api'

const getAxiosApi = () => {
  const httpAxios = axios.create({
    baseURL: serverUrl
  })
  return httpAxios
}

const http = getAxiosApi()
export default http