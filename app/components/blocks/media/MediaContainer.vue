<template>
  <StackLayout>
    <StackLayout v-if="loaded" backgroundColor="black">
      <YoutubeContainer v-show="videoLoaded" :dataItem="mediaItem" @onVideoLoaded="onVideoLoaded"/>
    </StackLayout>
    <StackLayout verticalAlignment="center" v-if="!videoLoaded" backgroundColor="black" height="232">
      <LoadingIndicator color="red"/>
    </StackLayout>
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
    onVideoLoaded(playerId) {
      const player = this.getPlayer(playerId)
      if (player) {
        player.playerStyle = 2
      }

      this.currentState = 'paused'
      this.videoLoaded = true
    },
    getPlayer(playerId) {
      return this.pageRef.getViewById(playerId)
    }
  },
  components: {
    YoutubeContainer,
    LoadingIndicator
  }
}
</script>

