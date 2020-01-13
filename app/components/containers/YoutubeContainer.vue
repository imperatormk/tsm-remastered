<template>
  <StackLayout backgroundColor="black">
    <YoutubePlayer v-if="show" :id="'player' + dataItem.id" @videoLoaded="$emit('onVideoLoaded')" :src="getYoutubeId(dataItem.url)" width="100%" apiKey="AIzaSyDw-n7SxuoPBw3f1AqmEKu7xOZSFyMTJ0Y"/>
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
    setTimeout(() => {
      this.show = true
    }, 250)
  },
  data: () => ({
    show: false
  }),
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