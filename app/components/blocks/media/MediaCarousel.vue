<template>
  <StackLayout verticalAlignment="center">
    <StackLayout verticalAlignment="center" v-if="loaded">
      <Carousel v-if="media.length > 0" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
        <CarouselItem v-for="(mediaItem, idx) in media" :key="mediaItem.mediaId" backgroundColor="#fefefe" verticalAlignment="middle">
          <StackLayout v-if="selectedIndex === idx">
            <MediaContainer :station="currentStation" :mediaItem="mediaItem"/>
            <CommentContainer marginTop="5" :mediaItem="mediaItem"/>
          </StackLayout>
        </CarouselItem>
      </Carousel>
      <Label v-else textAlignment="center" color="#8c8c8c" text="No media in this station..."/>
    </StackLayout>
    <LoadingIndicator v-else />
  </StackLayout>
</template>

<script>
import Vue from 'vue'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import CommentContainer from '@/components/blocks/comments/CommentContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'

export default {
  props: {
    eventBus: Object
  },
  mounted() {
    this.eventBus.$on('newStationData', (station) => {
      this.getMediaForStation(station.locId)
      this.currentStation = station // fix duplicates plz
    })
  },
  data() {
    return {
      media: [],
      selectedIndex: 0,
      currentStation: null,
      loaded: true
    }
  },
  methods: {
    pageChanged(e) {
      Vue.nextTick(() => {
        this.selectedIndex = e.index
      })
    },
    getMediaForStation(stationId) {
      const apiUrl = `https://thatsmontreal.ca/api/getVideos.php?locId=${stationId}`
      this.loaded = false

      fetch(apiUrl)
        .then(media => media.json())
        .then((media) => {
          this.media = media
          this.loaded = true
        })
    }
  },
  components: {
    MediaContainer,
    LoadingIndicator,
    CommentContainer
  }
}
</script>
