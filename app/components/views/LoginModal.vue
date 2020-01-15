<template>
  <StackLayout>
    <StackLayout padding="30">
      <Label padding="5" text="Pick your favorite social network to unlock" fontSize="18" textWrap="true" textAlignment="center"/>
      <StackLayout height="25"/>
      <Button style="width: 70%;border-radius:10px;" background="#3c5a99" color="white" class="fab" fontSize="22" :text="'\uf39e'" @tap="loginWith('fb')"/>
      <StackLayout height="10"/>
      <Button style="width: 70%;border-radius:10px;" background="#db4437" color="white" class="fab" fontSize="22" :text="'\uf1a0'" @tap="loginWith('gg')"/>
    </StackLayout>
  </StackLayout>
</template>

<script>
import auth from '@/services/auth'
import HomeScreen from '@/components/views/HomeScreen'

export default {
  props: {
    stay: Boolean
  },
  methods: {
    loginWith(provider) {
      auth.loginWithProvider(provider)
        .then((res) => {
          this.commitNewUser(res)
            .then(() => {
              this.$modal.close()
              if(!this.stay) this.gotoHome()
            })
        })
        .catch(err => console.error(err))
    },
    gotoHome() {
      this.$navigateTo(HomeScreen, {
        animated: true,
        transition: {
          name: 'fade'
        }
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

