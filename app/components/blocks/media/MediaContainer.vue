<template>
  <StackLayout>
    <Label v-if="station" :text="station.title" paddingBottom="5" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>
    <StackLayout v-if="loaded" backgroundColor="black">
      <YoutubeContainer v-show="videoLoaded" :dataItem="mediaItem" @onVideoLoaded="onVideoLoaded"/>
    </StackLayout>
    <StackLayout verticalAlignment="center" v-if="!videoLoaded" backgroundColor="black" height="232">
      <LoadingIndicator color="red"/>
    </StackLayout>
    <Label :text="mediaItem.title" paddingTop="5" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
  </StackLayout>
</template>

<script>
import YoutubeContainer from '@/components/containers/YoutubeContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import EventBus from '@/services/event-bus'

export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    },
    station: {
      type: Object,
      required: false
    }
  },
  mounted() {
    EventBus.$emit('getPageRef', (ref) => {
      this.pageRef = ref
      this.loaded = true
    })
  },
  data() {
    return {
      loaded: false,
      videoLoaded: false,
      currentState: null,
      pageRef: null
    }
  },
  methods: {
    onVideoLoaded() {
      const player = this.getPlayer()
      if (player) {
        player.playerStyle = 2
      }

      this.currentState = 'paused'
      this.videoLoaded = true
    },
    getPlayer() {
      return this.pageRef.getViewById(`player${this.mediaItem.id}`)
    }
  },
  components: {
    YoutubeContainer,
    LoadingIndicator
  }
}
</script>

