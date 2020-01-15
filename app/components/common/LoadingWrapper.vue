<template>
  <FlexboxLayout justifyContent="center" alignItems="center">
    <ActivityIndicator v-if="loading" :color="color" busy="true" width="50"/>
    <slot v-else/>
  </FlexboxLayout>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#8c8c8c'
    },
    loading: Boolean
  }
}
</script>