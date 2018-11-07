<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true">
        <Label v-if="loadingText" :text="loadingText" textAlignment="center" fontSize="22" color="#8c8c8c" padding="10"/>
      </LoadingIndicator>
    </StackLayout>
    <StackLayout verticalAlignment="top" v-else height="100%">
      <AuthHeader @logout="onLogout"/>
      <slot/>
    </StackLayout>
  </Page>
</template>

<script>
import firebase from "nativescript-plugin-firebase"
import MessageBus from '@/services/MessageBus'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import AuthHeader from '@/components/blocks/auth/AuthHeader'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String
  },
  created() {
    MessageBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
    this.commitNewUser()
  },
  methods: {
    onLogout() {
      firebase.logout()
      this.$store.commit('setUser', null)
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
    AuthHeader
  }
}
</script>
