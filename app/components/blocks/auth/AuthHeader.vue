<template>
  <StackLayout verticalAlignment="center" horizontalAlignment="right">
    <Label v-if="hasLoggedInUser" text="Logout" textAlignment="right" @tap="$emit('logout')" padding="10" fontSize="18" />
  </StackLayout>
</template>

<script>
export default {
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
    }
  },
}
</script>
