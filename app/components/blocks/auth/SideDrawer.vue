<template>
  <GridLayout>
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <StackLayout ~drawerContent orientation="horizontal">
        <StackLayout width="30%"></StackLayout>
        <StackLayout width="70%" style="padding-left:10px;">
          <StackLayout v-if="hasLoggedInUser" horizontalAlignment="left" backgroundColor="white" padding="10">
            <StackLayout padding="5" verticalAlignment="center" orientation="horizontal">
              <Image :src="getCurrentUser.profileImageURL" width="40" minWidth="40" style="border-radius:100%"/>
              <Label textAlignment="left" padding="5" :text="getCurrentUser.name.split(' ')[0]" fontSize="18" />
            </StackLayout>
            <StackLayout width="100%" @tap="onLogout" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf2f5'" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Log out" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
          </StackLayout>
          <StackLayout v-else>
            <StackLayout width="100%" @tap="onLogin" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf2f6'" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Log in" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
          </StackLayout>
          <StackLayout>
            <StackLayout width="100%" height="1" backgroundColor="#b5b5b5"></StackLayout>
            <StackLayout width="100%" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf1ea'" color="#ed8900" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="far"/>
              <Label text="News" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(1, true)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf689'" color="#007cc1" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Lines" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(3, true)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf0e0'" color="#0cad26" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="far"/>
              <Label text="Contact us" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(2, true)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf57d'" color="#ffd400" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Social media" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label @tap="onOpenDrawerTap" margin="0" padding="15" style="padding-bottom:10px;color:#8c8c8c;horizontal-align:right;" class="fas" fontSize="22" :text="'\uf0c9'"/>
      </StackLayout>
    </RadSideDrawer>
  </GridLayout>
</template>

<script>
import MessageBus from '@/services/MessageBus'
import LineList from '@/components/views/LineList'
import SocialMedia from '@/components/views/SocialMedia'
import ContactUs from '@/components/views/ContactUs'

export default {
  created() {
    MessageBus.$on('goToScreen', (screen) => {
      this.goToScreen(screen)
    })
  },
  methods: {
    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer()
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer()
    },
    onLogin() {
      this.$emit('login')
      this.onCloseDrawerTap()
    },
    onLogout() {
      this.$emit('logout')
      this.onCloseDrawerTap()
    },
    goToScreen(screen, fromDrawer) {
      let comp = null
      console.log(screen)
      if (screen === 1) comp = LineList
      if (screen === 2) comp = SocialMedia
      if (screen === 3) comp = ContactUs

      this.$navigateTo(comp,
      {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
      if (fromDrawer) this.onCloseDrawerTap()
    }
  },
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    },
  }
}
</script>
