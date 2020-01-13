<template>
  <GridLayout>
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <StackLayout ~drawerContent orientation="horizontal">
        <StackLayout width="30%"></StackLayout>
        <StackLayout width="70%" style="padding-left:10px;">
          <StackLayout v-if="hasLoggedInUser" horizontalAlignment="left" backgroundColor="white">
            <StackLayout padding="10" verticalAlignment="center" orientation="horizontal">
              <Image :src="getCurrentUser.profileImageURL" width="40" minWidth="40" style="border-radius:100%"/>
              <StackLayout paddingLeft="5">
                <Label textAlignment="left" padding="5" :text="getCurrentUser.name.split(' ')[0]" fontSize="18"/>
              </StackLayout>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
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
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(0)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf1ea'" color="#ed8900" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="far"/>
              <Label text="News" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(1)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf689'" color="#007cc1" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Lines" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(3)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf0e0'" color="#0cad26" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="far"/>
              <Label text="Contact us" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(2)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf44d'" color="#ffd400" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Dashboard" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label @tap="onOpenDrawerTap" color="white" margin="0" paddingTop="25" paddingRight="25" style="padding-bottom:10px;horizontal-align:right;" class="fas" fontSize="22" :text="'\uf0c9'"/>
      </StackLayout>
    </RadSideDrawer>
  </GridLayout>
</template>

<script>
import EventBus from '@/services/event-bus'

export default {
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
    goToScreen(screen) {
      EventBus.$emit('goToScreen', screen)
      this.onCloseDrawerTap()
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
