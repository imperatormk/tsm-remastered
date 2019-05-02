import axios from 'axios'

const http = axios.create({
  baseURL: 'https://thatsmontreal.ca:3080/api'
})

export default http