<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true">
    <StackLayout v-if="loading">
      <LoadingIndicator/>
    </StackLayout>
    <slot v-else/>
  </Page>
</template>

<script>
import LoadingIndicator from '@/components/common/LoadingIndicator'

export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>
