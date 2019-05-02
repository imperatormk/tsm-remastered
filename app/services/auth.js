import firebase from 'nativescript-plugin-firebase'

export default {
  loginWithProvider(provider) {
    let providerObj = null
    switch (provider) {
      case 'fb':
        providerObj = {
          type: firebase.LoginType.FACEBOOK,
          facebookOptions: {
            scope: ['public_profile', 'email']
          }
        }
        break
      case 'gg':
        providerObj = {
          type: firebase.LoginType.GOOGLE
        }
        break
      default:
        providerObj = {}
    }
    return firebase.login(providerObj)
      .catch(err => Promise.reject(err.code))
  },
  logout() {
    return firebase.logout()
  },
  getCurrentUser() {
    return firebase.getCurrentUser()
  },
  getUserToken() {
    return firebase.getAuthToken({
      forceRefresh: false
    })
      .then(token => token, (errorMessage) => {
        return Promise.reject(errorMessage)
      })
  }
}