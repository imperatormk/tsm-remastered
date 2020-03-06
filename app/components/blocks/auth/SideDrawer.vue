<template>
  <GridLayout :height="opened ? '100%' : 70">
    <RadSideDrawer @drawerOpening="changeDrawerState(true)" @drawerClosed="changeDrawerState(false)" ref="drawer" drawerLocation="Right" v-if="show">
      <StackLayout ~drawerContent orientation="horizontal">
        <StackLayout width="30%"></StackLayout>
        <StackLayout width="70%" style="padding-left:10px;">
          <StackLayout v-if="hasLoggedInUser" horizontalAlignment="left" backgroundColor="white">
            <FlexboxLayout padding="10" alignItems="center">
              <Image :src="getCurrentUser.photoURL" width="40" minWidth="40" style="border-radius:100%"/>
              <StackLayout paddingLeft="10">
                <Label textAlignment="left" :text="(getCurrentUser.displayName || '').split(' ')[0]" fontSize="18"/>
              </StackLayout>
            </FlexboxLayout>
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
              <Label text="Who are we?" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(3)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf0e0'" color="#0cad26" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="far"/>
              <Label text="Email us" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
            <StackLayout width="100%" height="0.5" backgroundColor="#d3d3d3"></StackLayout>
            <StackLayout width="100%" @tap="goToScreen(2)" horizontalAlignment="left" orientation="horizontal" backgroundColor="#f5f5f5">
              <Label paddingLeft="15" :text="'\uf06b'" color="#ffd400" textAlignment="left" paddingTop="15" fontSize="20" backgroundColor="#f5f5f5" class="fas"/>
              <Label text="Save with gifts" textAlignment="left" padding="15" backgroundColor="#f5f5f5"/>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>
      <FlexboxLayout ~mainContent justifyContent="flex-end" alignItems="center">
        <Label @tap="onOpenDrawerTap" :color="opened ? 'transparent' : '#8c8c8c'" margin="0" padding="15 20 15 0" class="fas" fontSize="22" :text="'\uf0c9'"/>
      </FlexboxLayout>
    </RadSideDrawer>
  </GridLayout>
</template>

<script>
import systemSrv from '@/services/system'
import EventBus from '@/services/event-bus'

export default {
  mounted() {
    setTimeout(() => { // sorry
      this.show = true
    }, 300)

    EventBus.$on('reloadSideDrawer', () => {
      this.needsReload = true
    })
  },
  data: () => ({
    show: false,
    opened: false,
    needsReload: false
  }),
  watch: {
    needsReload(val) {
      if (val) {
        setTimeout(() => {
          this.needsReload = false
        }, 1000)
      }
    }
  },
  methods: {
    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer()
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer()
    },
    changeDrawerState(val) {
      this.opened = val
      if (val) {
        this.$emit('drawerOpened')
      } else {
        this.$emit('drawerClosed')  
      }
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
      return this.$store.getters.hasLoggedInUser || this.needsReload
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser || {}
    }
  }
}
</script>
