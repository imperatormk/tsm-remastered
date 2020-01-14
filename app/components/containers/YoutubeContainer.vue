<template>
  <StackLayout backgroundColor="black" height="232">
    <YoutubePlayer v-if="isOnTopTrans" :id="videoId" @videoLoaded="$emit('onVideoLoaded', videoId)" :src="getYoutubeId(dataItem.url)" width="100%" apiKey="AIzaSyDw-n7SxuoPBw3f1AqmEKu7xOZSFyMTJ0Y"/>
  </StackLayout>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.videoId = `player${this.dataItem.id}-${this.videoArr.length + 1}`
    this.$store.commit('pushVideo', this.videoId)
  },
  beforeDestroy() {
    this.$store.commit('popVideo', this.videoId)
  },
  data: () => ({
    videoId: '',
    isOnTopTrans: false
  }),
  watch: {
    isOnTop(val) {
      const interval = val ? 510 : 10
      setTimeout(() => {
        this.isOnTopTrans = val
      }, interval)
    }
  },
  computed: {
    videoArr() {
      return this.$store.getters.getVideos
    },
    isOnTop() {
      const index = this.videoArr.findIndex(item => item === this.videoId)
      return index === 0
    }
  },
  methods: {
    getYoutubeId(videoUrl) { // move this to helpers some time
      const url = require('url')
      const urlParts = url.parse(videoUrl, true)
      const query = urlParts.query
      return query.v || null
    }
  }
}
</script>