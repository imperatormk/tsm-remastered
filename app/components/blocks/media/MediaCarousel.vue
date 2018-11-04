<template>
  <StackLayout>
    <Carousel v-if="loaded" height="300" width="100%" @pageChanged="pageChanged" @pageTapped="pageTapped" indicatorColor="#fff000" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white">
      <CarouselItem v-for="mediaItem in media" :key="mediaItem.mediaId" backgroundColor="#b3cde0" verticalAlignment="middle">
        <MediaContainer :mediaItem="mediaItem"/>
      </CarouselItem>
    </Carousel>
    <LoadingIndicator v-else />
  </StackLayout>
</template>

<script>
import MediaContainer from '@/components/blocks/media/MediaContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'

export default {
  props: {
    eventBus: Object
  },
  mounted() {
    this.eventBus.$on('newStationData', (station) => {
      this.getMediaForStation(station.locId)
    })
  },
  data() {
    return {
      media: [],
      loaded: true
    }
  },
  methods: {
    pageChanged(e) {
      this.$emit('pageChanged', e)
    },
    getMediaForStation(stationId) {
      const apiUrl = `https://thatsmontreal.ca/api/getVideos.php?locId=${stationId}`
      this.loaded = false

      fetch(apiUrl)
        .then(media => media.json())
        .then((media) => {
          this.media = media
          this.loaded = true
          console.log(media)
        })
    },
    pageTapped(e) {

    }
  },
  components: {
    MediaContainer,
    LoadingIndicator
  }
}
</script>
