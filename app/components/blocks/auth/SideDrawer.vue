<template>
  <GridLayout>
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <StackLayout ~drawerContent>
        <StackLayout v-if="hasLoggedInUser" horizontalAlignment="right" backgroundColor="white" padding="10">
          <StackLayout padding="5" verticalAlignment="center" orientation="horizontal">
            <Image :src="getCurrentUser.profileImageURL" width="40" minWidth="40" style="border-radius:100%"/>
            <Label textAlignment="right" padding="5" :text="getCurrentUser.name.split(' ')[0]" fontSize="18" />
          </StackLayout>
          <Label fontSize="16" text="Log out" textAlignment="right" padding="15" backgroundColor="#f5f5f5" @tap="onLogout" />
        </StackLayout>
        <StackLayout v-else>
          <Label text="Log in" textAlignment="right" padding="15" backgroundColor="#f5f5f5" @tap="onLogin" />
        </StackLayout>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label @tap="onOpenDrawerTap" margin="0" padding="15" style="padding-bottom:10px;color:#8c8c8c;horizontal-align:right;" class="fa" fontSize="20" :text="'fa-bars' | fonticon"/>
      </StackLayout>
    </RadSideDrawer>
  </GridLayout>
</template>

<script>
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
