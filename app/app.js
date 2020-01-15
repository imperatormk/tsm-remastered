import Vue from 'nativescript-vue'
import firebaseSrv from '@/services/firebase'

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel)
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem)
Vue.registerElement('YoutubePlayer', () => require('nativescript-youtubeplayer').YoutubePlayer)
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)

import ViewContainer from '@/components/containers/ViewContainer'
Vue.component('ViewContainer', ViewContainer)

Vue.config.silent = true
import HomeScreen from '@/components/views/HomeScreen'

import News from '@/components/views/News'
import LineList from '@/components/views/LineList'
import ContactUs from '@/components/views/ContactUs'

import CodeScanner from '@/components/views/CodeScanner'
import UserDashboard from '@/components/views/UserDashboard'
import LoginModal from '@/components/views/LoginModal'

import api from '@/services/api'
import EventBus from '@/services/event-bus'
import store from '@/store'

const application = require('application')
const androidModule = application.android
if (androidModule) {
  const event = application.AndroidApplication.activityBackPressedEvent
  androidModule.on(event, (e) => {
    EventBus.$emit('onBackButton', e)
  })
}

new Vue({
  render: h => h('frame', [h(HomeScreen)]),
  created() {
    firebaseSrv.initService()
      .then(() => {})
      .catch(err => console.error(err))
    EventBus.$on('goToScreen', screen => this.goToScreen(screen))
  },
  destroyed() {
    EventBus.$off('goToScreen')
  },
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
    }
  },
  methods: {
    async goToScreen(screen) {
      let comp = null
      if (screen === 0) comp = News
      if (screen === 1) comp = LineList
      if (screen === 2) {
        if (!this.hasLoggedInUser) {
          this.$showModal(LoginModal, {
            animated: true,
            transition: {
              name: 'fade'
            }
          })
          return
        }

        const user = await api.getUser()
        const type = user.type || 0
        const dashboardScreens = [
          CodeScanner,
          UserDashboard
        ]
        comp = dashboardScreens[type]
      }
      if (screen === 3) comp = ContactUs

      if (comp) this.$navigateTo(comp, {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    }
  },
  store
}).$start()