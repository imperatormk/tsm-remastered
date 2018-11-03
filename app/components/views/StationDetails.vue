<template>
  <ViewContainer :loading="!loaded">
    <ScrollView orientation="horizontal" height="120">
      <MediaContainer :media="media"/>
    </ScrollView>
  </ViewContainer>
</template>

<script>
import ViewContainer from '@/components/containers/ViewContainer'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import firebase from "nativescript-plugin-firebase"
import MessageBus from '@/services/MessageBus'

export default {
  created() {
    MessageBus.$on('authStateChanged', (data) => { // addValueEventListener
      console.log(data)
    })

    this.getMedia('https://thatsmontreal.ca/api/getVideos.php')
  },
  methods: {
    getMedia(mediaUrl) {
      fetch(mediaUrl)
        .then(media => media.json())
        .then((media) => {
          this.media = media
          this.loaded = true
        })
    }
  },
  data() {
    return {
      stationId: 1,
      media: [],
      loaded: false
    }
  },
  components: {
    ViewContainer,
    MediaContainer,
  }
}
</script>
