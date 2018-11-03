<template>
  <ViewContainer>
    <Label text="heya">Heya</Label>
  </ViewContainer>
</template>

<script>
import ViewContainer from '@/components/containers/ViewContainer'
import firebase from "nativescript-plugin-firebase";
import MessageBus from '@/services/MessageBus'

export default {
  created() {
    MessageBus.$on('authStateChanged', (data) => { // addValueEventListener
      console.log(data)
    })
  },
  components: {
    ViewContainer
  }
}
</script>
