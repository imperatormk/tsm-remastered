<template>
  <StackLayout>
    <StackLayout padding="30">
      <Label padding="5" text="Log in to open the door!" fontSize="18" />
      <StackLayout height="25"/>
      <Button style="width: 70%;" background="#3c5a99" color="white" class="fab" fontSize="22" :text="'\uf39e'" @tap="loginWithFacebook()"/>
      <Button style="width: 70%;" background="#db4437" color="white" class="fab" fontSize="22" :text="'\uf1a0'" @tap="loginWithGoogle()"/>
    </StackLayout>
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

