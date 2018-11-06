<template>
  <StackLayout>
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
      }).then((result) => {
          console.log(result)
        },
        (errorMessage) => {
          console.log(errorMessage)
        })
    },
    loginWithGoogle() {
      firebase.login({
        type: firebase.LoginType.GOOGLE,
      }).then((result) => {
          console.log(result)
        },
        (errorMessage) => {
          console.log(errorMessage)
        })
    }
  }
}
</script>

