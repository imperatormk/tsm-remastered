<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef" :style="getStyle">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <GridLayout rows="*" cols="*" v-else verticalAlignment="top" height="100%">
      <StackLayout verticalAlignment="top">
        <FlexboxLayout justifyContent="space-between">
          <Label @tap="gotoHome" margin="0" padding="15" style="padding-bottom:10px;color:#1976d2;horizontal-align:left;" fontSize="22" text="That's Montreal"/>
          <Label margin="0" padding="15" style="padding-bottom:10px;color:#8c8c8c;horizontal-align:right;" class="fas" fontSize="22" :text="'\uf0c9'"/>
        </FlexboxLayout>
        <slot/>
        <Footer v-if="footer"/>
      </StackLayout>
      <SideDrawer row="0" col="0" @logout="onLogout" @login="onLogin"/>
    </GridLayout>
  </Page>
</template>

<script>
import auth from '@/services/auth'
import EventBus from '@/services/event-bus'

import LoadingIndicator from '@/components/common/LoadingIndicator'

import LoginModal from '@/components/views/LoginModal'
import HomeScreen from '@/components/views/HomeScreen'
import SideDrawer from '@/components/blocks/auth/SideDrawer'
import Footer from '@/components/Footer'

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
    footer: Boolean
  },
  created() {
    EventBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
    this.commitNewUser()
  },
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
    }
  },
  destroyed() {
    EventBus.$off('getPageRef')
  },
  components: {
    Footer,
    LoadingIndicator,
    SideDrawer
  }
}
</script>
