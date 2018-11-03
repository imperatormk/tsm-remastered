<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true">
    <ActivityIndicator v-if="loading" busy="true" width="100" height="100"/>
    <slot v-else/>
  </Page>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
