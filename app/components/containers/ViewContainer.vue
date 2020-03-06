<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef" :style="getStyle">
    <StackLayout v-if="loading && !forceLoaded" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <GridLayout rows="*" cols="*" v-else verticalAlignment="top" height="100%">
      <StackLayout verticalAlignment="top" :marginTop="offsetTop ? 55 : 0">
        <slot/>
      </StackLayout>
      <StackLayout verticalAlignment="top" v-if="!noHeader">
        <FlexboxLayout justifyContent="space-between" alignItems="center">
          <FlexboxLayout v-show="!drawerOpened && !isHome" justifyContent="space-between" alignItems="center">
            <Button @tap="goBack" backgroundColor="#fff" color="#8c8c8c" class="fas" :text="'\uf060'" fontSize="22" marginLeft="10" padding="5" style="border-width: 1;border-color:transparent;z-index: 0;"/>
          </FlexboxLayout>
          <SideDrawer row="0" col="0" @drawerOpened="drawerOpened=true" @drawerClosed="drawerOpened=false" @logout="onLogout" @login="onLogin"/>
        </FlexboxLayout>
      </StackLayout>
      <CommentsModal/>
    </GridLayout>
  </Page>
</template>

<script>
import auth from '@/services/auth'
import EventBus from '@/services/event-bus'

import LoadingIndicator from '@/components/common/LoadingIndicator'

import LoginModal from '@/components/views/LoginModal'
import CommentsModal from '@/components/views/CommentsModal'
import HomeScreen from '@/components/views/HomeScreen'
import SideDrawer from '@/components/blocks/auth/SideDrawer'

const frameModule = require('ui/frame')

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    backgroundImage: {
      type: String,
      default: ''
    },
    offsetTop: {
      type: Boolean,
      default: true
    },
    isHome: Boolean,
    noHeader: Boolean
  },
  created() {
    EventBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
    this.commitNewUser()
  },
  beforeDestroy() {
    this.forceLoaded = true
  },
  data: () => ({
    forceLoaded: false,
    drawerOpened: false
  }),
  computed: {
    getStyle() {
      return {
        'background-image': this.backgroundImage,
        'background-size': 'cover'
      }
    }
  },
  methods: {
    onLogout() {
      auth.logout()
      this.$store.commit('setUser', null)
    },
    onLogin() {
      this.$showModal(LoginModal, {
        animated: true,
        transition: {
          name: 'fade'
        },
        props: {
          stay: true
        }
      })
    },
    commitNewUser() {
      return auth.getCurrentUser()
        .then((curUser) => {
          return this.$store.commit('setUser', curUser)
        })
    },
    gotoHome() {
      this.$navigateTo(HomeScreen, {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    },
    goBack() {
      const topmost = frameModule.topmost()
      topmost.goBack()
    }
  },
  destroyed() {
    EventBus.$off('getPageRef')
  },
  components: {
    LoadingIndicator,
    SideDrawer,
    CommentsModal
  }
}
</script>