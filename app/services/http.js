import axios from 'axios'

const http = axios.create({
  baseURL: 'https://thatsmontreal.com/api'
})

export default http