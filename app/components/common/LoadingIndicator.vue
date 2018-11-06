<template>
  <StackLayout :height="full ? '100%' : 'auto'" verticalAlignment="center">
    <ActivityIndicator color="red" busy="true" width="100" :height="full ? '100' : 'auto'"/>
  </StackLayout>
</template>

<script>
export default {
  props: { // there can be one more prop for size
    full: Boolean
  }
}
</script>
