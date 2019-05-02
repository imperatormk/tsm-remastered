<template>
  <StackLayout :verticalAlignment="loaded && media.length ? 'top' : 'center'" height="100%">
    <LoadingIndicator v-if="!loaded" />
    <StackLayout v-else-if="loaded && media.length" verticalAlignment="center">
      <StackLayout verticalAlignment="center" v-if="media.length > 0">
        <Carousel height="280" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
          <CarouselItem v-for="(mediaItem, idx) in media" :key="mediaItem.id" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout v-if="selectedIndex === idx">
              <MediaContainer v-if="!hideMediaContainer" :station="currentStation" :mediaItem="mediaItem"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
        <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
          <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in media.length" :key="n" :backgroundColor="selectedIndex === n-1 ? lineColors[currentStation.line] : 'lightgray'" borderRadius="100"/>
        </FlexboxLayout>
        <MediaActions :mediaItem="media[selectedIndex]"></MediaActions>
      </StackLayout>
    </StackLayout>
    <Label v-else textAlignment="center" fontSize="20" color="#8c8c8c" text="No media in this station..."/>
  </StackLayout>
</template>

<script>
import Vue from 'vue'
import api from '@/services/api'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import MediaActions from '@/components/blocks/media/MediaActions'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import lineColorMixin from '@/mixins/lineColorMixin'

export default {
  mixins: [lineColorMixin],
  props: {
    eventBus: Object
  },
  mounted() {
    this.eventBus.$on('newStationData', (station) => {
      this.getMediaForStation(station.id)
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
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
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
      this.loaded = false

      api.getMediaForLocation(stationId)
        .then((media) => {
          this.media = media
          this.loaded = true
        })
    }
  },
  components: {
    MediaContainer,
    MediaActions,
    LoadingIndicator
  }
}
</script>
