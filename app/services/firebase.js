import firebase from 'nativescript-plugin-firebase'
import config from '@/shared/firebase-config'

export default {
  initService() {
    firebase.init(config)
    return Promise.resolve()
  },
  instance() {
    return firebase
  }
}