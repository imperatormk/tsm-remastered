import axios from 'axios'
import * as lib from 'nativescript-https'

const serverUrl = 'https://thatsmontreal.com/api'

const getAxiosApi = () => {
  const httpAxios = axios.create({
    baseURL: serverUrl
  })
  httpAxios.defaults.timeout = 5 * 1000
  return httpAxios
}

const getLibApi = () => {
  const getFullUrl = endpoint => `${serverUrl}${endpoint}`
  
  const get = (url) => {
    return lib.request({
      url: getFullUrl(url),
      method: 'GET'
    })
  }
  const post = (url) => {
    return lib.request({
      url: getFullUrl(url),
      method: 'POST'
    })
  }

  const httpLib = {
    get,
    post
  }
  return httpLib
}

const http = getAxiosApi()
export default http