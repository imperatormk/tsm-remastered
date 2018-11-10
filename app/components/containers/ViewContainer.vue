<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef" :style="getStyle">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <GridLayout rows="*" cols="*" v-else verticalAlignment="top" height="100%">
      <StackLayout verticalAlignment="top">
        <Label margin="0" padding="15" style="padding-bottom:10px;color:#8c8c8c;horizontal-align:right;" class="fas" fontSize="22" :text="'\uf0c9'"/>
        <slot/>
      </StackLayout>
      <SideDrawer row="0" col="0" @logout="onLogout" @login="onLogin"/>
    </GridLayout>
  </Page>
</template>

<script>
import firebase from "nativescript-plugin-firebase"
import MessageBus from '@/services/MessageBus'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import LoginModal from '@/components/views/LoginModal'
import SideDrawer from '@/components/blocks/auth/SideDrawer'

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
    }
  },
  created() {
    MessageBus.$on('getPageRef', (cb) => {
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
      firebase.logout()
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
      return firebase.getCurrentUser()
        .then((curUser) => {
          return this.$store.commit('setUser', curUser)
        })
    }
  },
  destroyed() {
    MessageBus.$off('getPageRef')
  },
  components: {
    LoadingIndicator,
    SideDrawer
  }
}
</script>
