<template>
  <StackLayout :verticalAlignment="loaded && media.length ? 'top' : 'center'" height="100%">
    <LoadingIndicator v-if="!loaded"/>
    <StackLayout v-else-if="loaded && media.length" verticalAlignment="center">
      <StackLayout verticalAlignment="center" v-if="media.length > 0">
        <PromoContainer v-if="showPromos" :mediaItem="{ ...media[selectedIndex], line: currentStation.line }" @hidePromos="showPromos = false"/>

        <StackLayout v-else>
          <Label v-if="currentStation" :text="currentStation.title" paddingBottom="10" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>

          <Carousel :height="getPlayerHeight()" width="100%" @pageChanged="slideChanged" :selectedPage="selectedIndex" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
            <CarouselItem v-for="(mediaItem, idx) in media" :key="mediaItem.id" backgroundColor="#fefefe" verticalAlignment="middle">
              <StackLayout v-if="selectedIndex === idx">
                <MediaContainer v-if="!hideMediaContainer" :station="currentStation" :mediaItem="mediaItem"/>
              </StackLayout>
            </CarouselItem>
          </Carousel>

          <Label v-if="media[selectedIndex] != null" :text="media[selectedIndex].title" paddingTop="10" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
          <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
            <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in media.length" :key="n" :backgroundColor="selectedIndex === n-1 ? lineColors[currentStation.line] : 'lightgray'" borderRadius="100"/>
          </FlexboxLayout>

          <MediaActions :mediaItem="media[selectedIndex]" @showPromos="onShowPromos"></MediaActions>
        </StackLayout>
      </StackLayout>
    </StackLayout>
    <Label v-else textAlignment="center" fontSize="20" color="#8c8c8c" text="No media in this station..."/>
  </StackLayout>
</template>

<script>
import api from '@/services/api'
import systemSrv from '@/services/system'
import lineColorMixin from '@/mixins/lineColorMixin'

import LoadingIndicator from '@/components/common/LoadingIndicator'

import MediaContainer from '@/components/blocks/media/MediaContainer'
import MediaActions from '@/components/blocks/media/MediaActions'
import PromoContainer from '@/components/blocks/promo/PromoContainer'

export default {
  mixins: [lineColorMixin],
  props: {
    eventBus: Object
  },
  mounted() {
    this.eventBus.$on('newStationData', (station) => {
      this.showPromos = false
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
      showPromos: false,
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
    slideChanged(e) {
      this.hideMediaContainer = true
      this.showPromos = false
      this.$nextTick(() => {
        this.selectedIndex = e.index
        this.hideMediaContainer = false
      })
    },
    getMediaForStation(stationId) {
      this.loaded = false

      api.getMediaForLocation(stationId)
        .then((media) => {
          this.media = media
          this.loaded = true
        })
    },
    onShowPromos() {
      const selectedMedia = this.media[this.selectedIndex]
      if (selectedMedia.promos.length) {
        this.showPromos = true
      }
    },
    getPlayerHeight() {
      return systemSrv.getPlayerHeight()
    }
  },
  components: {
    MediaContainer,
    MediaActions,
    PromoContainer,
    LoadingIndicator
  }
}
</script>
