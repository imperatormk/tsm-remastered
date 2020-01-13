import firebase from 'nativescript-plugin-firebase'
import config from '@/shared/firebase-config'

export default {
  initService() {
    return firebase.init(config)
  },
  instance() {
    return firebase
  }
}