<template>
  <StackLayout padding="10">
    <Button text="Facebook" @tap="loginWithFacebook()"/>
    <Button text="Google" @tap="loginWithGoogle()"/>
  </StackLayout>
</template>

<script>
import firebase from "nativescript-plugin-firebase"

export default {
  methods: {
    loginWithFacebook() {
      firebase.login({
        type: firebase.LoginType.FACEBOOK,
        facebookOptions: {
          scope: ['public_profile', 'email']
        }
      }).then((res) => {
        this.commitNewUser(res)
          .then(() => this.$modal.close())
      }, (errorMessage) => {
        console.error(errorMessage)
      })
    },
    loginWithGoogle() {
      firebase.login({
        type: firebase.LoginType.GOOGLE,
      }).then((res) => {
        this.commitNewUser(res)
          .then(() => this.$modal.close())
      }, (errorMessage) => {
        console.error(errorMessage)
      })
    },
    commitNewUser(res) {
      if (res) return Promise.resolve(this.$store.commit('setUser', res))
      return firebase.getCurrentUser()
        .then((curUser) => {
          return Promise.resolve(this.$store.commit('setUser', curUser))
        })
    }
  }
}
</script>

