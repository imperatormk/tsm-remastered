<template>
  <StackLayout verticalAlignment="center">
    <StackLayout verticalAlignment="center" v-if="loaded">
      <StackLayout verticalAlignment="center" v-if="media.length > 0">
        <Carousel height="300" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
          <CarouselItem v-for="(mediaItem, idx) in media" :key="mediaItem.mediaId" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout v-if="selectedIndex === idx">
              <MediaContainer v-if="!hideMediaContainer" :station="currentStation" :mediaItem="mediaItem"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
        <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
          <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in media.length" :key="n" :backgroundColor="selectedIndex === n-1 ? 'red' : 'black'" borderRadius="100"/>
        </FlexboxLayout>
        <CommentContainer marginTop="5" v-if="!!media[selectedIndex]" :mediaItem="media[selectedIndex]"/>
      </StackLayout>
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
  destroyed() {
    this.eventBus.$off('newStationData')
  },
  data() {
    return {
      media: [],
      selectedIndex: 0,
      currentStation: null,
      hideMediaContainer: false,
      loaded: true
    }
  },
  methods: {
    pageChanged(e) {
      this.hideMediaContainer = true
      setTimeout(() => {
        this.selectedIndex = e.index
        this.hideMediaContainer = false
      }, 300)
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
