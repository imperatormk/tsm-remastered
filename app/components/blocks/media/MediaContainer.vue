<template>
  <StackLayout>
    <Label :text="mediaItem.mediaId" backgroundColor="#50000000" horizontalAlignment="center"/>
    <YoutubePlayer id="player" @videoLoaded="videoLoaded" apiKey="AIzaSyDw-n7SxuoPBw3f1AqmEKu7xOZSFyMTJ0Y" :src="mediaItem.mediaUrl" width="100%" backgroundColor="gray"/>
  </StackLayout>
</template>

<script>
import MessageBus from '@/services/MessageBus'

export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    videoLoaded() {
      this.playVideo()
    },
    playVideo() {
      MessageBus.$emit('getPageRef', (ref) => {
        const player = ref.getViewById('player')
        player.playerStyle = 2
        player.play()
      })
    }
  }
}
</script>

