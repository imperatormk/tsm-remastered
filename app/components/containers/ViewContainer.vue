<template>
  <Page :verticalAlignment="loading ? 'center' : 'top'" actionBarHidden="true" xmlns:ui="nativescript-youtubeplayer" ref="pageRef">
    <StackLayout v-if="loading" verticalAlignment="center">
      <LoadingIndicator :full="true"/>
    </StackLayout>
    <StackLayout verticalAlignment="top" v-else height="100%">
      <slot/>
    </StackLayout>
  </Page>
</template>

<script>
import MessageBus from '@/services/MessageBus'
import LoadingIndicator from '@/components/common/LoadingIndicator'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    MessageBus.$on('getPageRef', (cb) => {
      cb(this.$refs.pageRef.nativeView)
    })
  },
  components: {
    LoadingIndicator
  }
}
</script>
