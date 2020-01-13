import firebaseSrv from '@/services/firebase'

export default {
  loginWithProvider(provider) {
    let providerObj = null
    switch (provider) {
      case 'fb':
        providerObj = {
          type: firebaseSrv.instance().LoginType.FACEBOOK,
          facebookOptions: {
            scope: ['public_profile', 'email']
          }
        }
        break
      case 'gg':
        providerObj = {
          type: firebaseSrv.instance().LoginType.GOOGLE
        }
        break
      default:
        providerObj = {}
    }
    return firebaseSrv.instance().login(providerObj)
      .catch(err => Promise.reject(err.code))
  },
  logout() {
    firebaseSrv.initService()
      .then(() => {
        firebaseSrv.instance().logout()
      })
  },
  getCurrentUser() {
    return firebaseSrv.instance().getCurrentUser()
  },
  getUserToken() {
    return firebaseSrv.instance().getAuthToken({
      forceRefresh: false
    })
      .then(token => token, (errorMessage) => {
        return Promise.reject(errorMessage)
      })
  }
}