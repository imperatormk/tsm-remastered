import auth from './auth'
import http from './http'

const getAuthHeaders = (opts) => {
  const options = opts || {}
  return auth.getUserToken()
    .then((token) => {
      const optionsRes = options
      optionsRes.headers = {
        Authorization: `Bearer ${token}`
      }
      return optionsRes
    })
}

export default {
  getStations(line) {
    return http.get('/locations', { params: { line } })
  },
  getMedia() {
    return http.get('/media')
  },
  getLatestMedia() {
    return http.get('/media/latest')
  },
  getMediaForLocation(stationId) {
    return http.get(`/locations/${stationId}/media`)
      .then(resp => resp.data)
  },
  getLatestMediaForLocation(stationId) {
    return http.get(`/locations/${stationId}/media`)
      .then(resp => resp.data)
  },
  getComments(mediaId) {
    return http.get(`/media${mediaId}/comments`)
      .then(resp => resp.data)
  },
  postComment(mediaId, comment) {
    return getAuthHeaders()
      .then(options => http.post(`/media${mediaId}/comments`, comment, options))
      .then(resp => resp.data)
  },
}