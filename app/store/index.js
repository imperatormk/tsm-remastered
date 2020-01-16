import Vue from 'nativescript-vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    videos: [],
    modalCount: 0
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    pushVideo(state, video) {
      state.videos.unshift(video)
    },
    popVideo(state, video) {
      state.videos = state.videos.filter(item => item !== video)
    },
    changeModalCount(state, val) {
      state.modalCount += val
    },
  },
  getters: {
    getCurrentUser: state => {
      return state.user
    },
    hasLoggedInUser: state => {
      return !!state.user && !!state.user.uid
    },
    getVideos: state => state.videos,
    getModalCount: state => state.modalCount
  }
})

export default store