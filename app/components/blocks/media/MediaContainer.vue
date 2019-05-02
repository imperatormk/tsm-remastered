<template>
  <StackLayout>
    <Label v-if="station" :text="station.locTitle" paddingBottom="5" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>
    <StackLayout v-if="loaded" backgroundColor="black">
      <YoutubePlayer v-show="videoLoaded" :id="'player' + mediaItem.mediaId" @videoLoaded="onVideoLoaded" :src="mediaItem.mediaUrl" width="100%" apiKey="AIzaSyDw-n7SxuoPBw3f1AqmEKu7xOZSFyMTJ0Y"/>
    </StackLayout>
    <StackLayout verticalAlignment="center" v-if="!videoLoaded" backgroundColor="black" height="200">
      <LoadingIndicator color="red"/>
    </StackLayout>
    <Label :text="mediaItem.mediaDesc" paddingTop="5" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
  </StackLayout>
</template>

<script>
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
      return this.pageRef.getViewById(`player${this.mediaItem.mediaId}`)
    }
  },
  components: {
    LoadingIndicator
  }
}
</script>

