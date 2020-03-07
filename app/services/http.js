import axios from 'axios'
import EventBus from '@/services/event-bus'

const serverUrl = 'https://thatsmontreal.com/api'

const getAxiosApi = () => {
  const httpAxios = axios.create({
    baseURL: serverUrl
  })

  httpAxios.interceptors.response.use((response) => {
    if (!response.data) {
      EventBus.$emit('onApiFailed')
      return Promise.reject({ status: 'emptyResp' })
    }
    return response
  }, (error) => {
    EventBus.$emit('onApiFailed')
    return Promise.reject(error)
  })
  return httpAxios
}

const http = getAxiosApi()
export default http