<template>
  <StackLayout :verticalAlignment="loaded && media.length ? 'top' : 'center'" height="100%">
    <LoadingIndicator v-if="!loaded" />
    <StackLayout v-else-if="loaded && media.length" verticalAlignment="center">
      <StackLayout verticalAlignment="center" v-if="media.length > 0">
        <Carousel height="280" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
          <CarouselItem v-for="(mediaItem, idx) in media" :key="mediaItem.mediaId" backgroundColor="#fefefe" verticalAlignment="middle">
            <StackLayout v-if="selectedIndex === idx">
              <MediaContainer v-if="!hideMediaContainer" :station="currentStation" :mediaItem="mediaItem"/>
            </StackLayout>
          </CarouselItem>
        </Carousel>
        <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
          <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in media.length" :key="n" :backgroundColor="selectedIndex === n-1 ? lineColors[currentStation.locLine] : 'lightgray'" borderRadius="100"/>
        </FlexboxLayout>
        <GridLayout columns="* * *" margin="10" width="100%">
          <StackLayout padding="5" horizontalAlignment="center" col="0" @tap="shareMedia">
            <StackLayout horizontalAlignment="center" verticalAlignment="center">
              <Label textAlignment="center" class="fa" :text="'fa-share' | fonticon" color="#8c8c8c" fontSize="23"/>
              <Label textAlignment="center" text="Share" color="#8c8c8c"/>
            </StackLayout>
          </StackLayout>
          <StackLayout padding="5" horizontalAlignment="center" col="1" @tap="getFreeGift">
            <StackLayout horizontalAlignment="center" verticalAlignment="center">
              <Label textAlignment="center" class="fa" :text="'fa-gift' | fonticon" color="#8c8c8c" fontSize="23"/>
              <Label textAlignment="center" text="Free gift" color="#8c8c8c"/>
            </StackLayout>
          </StackLayout>
          <StackLayout padding="5" horizontalAlignment="center" col="2" @tap="openComments">
            <StackLayout horizontalAlignment="center" verticalAlignment="center">
              <Label textAlignment="center" class="fa" :text="'fa-comments' | fonticon" color="#8c8c8c" fontSize="23"/>
              <Label textAlignment="center" text="Comments" color="#8c8c8c"/>
            </StackLayout>
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </StackLayout>
    <Label v-else textAlignment="center" fontSize="20" color="#8c8c8c" text="No media in this station..."/>
  </StackLayout>
</template>

<script>
import Vue from 'vue'
import CommentsModal from '@/components/views/CommentsModal'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import LoginModal from '@/components/views/LoginModal'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import lineColorMixin from '@/mixins/lineColorMixin'
import * as SocialShare from "nativescript-social-share"

export default {
  mixins: [lineColorMixin],
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
      const apiUrl = `https://thatsmontreal.ca/api/getVideos.php?locId=${stationId}`
      this.loaded = false

      fetch(apiUrl)
        .then(media => media.json())
        .then((media) => {
          this.media = media
          this.loaded = true
        })
    },
    shareMedia() {
      const mediaItem = this.media[this.selectedIndex]
      if (mediaItem) {
        SocialShare.shareUrl(`https://www.youtube.com/watch?v=${mediaItem.mediaUrl}`, mediaItem.mediaDesc)
      }
    },
    openComments() {
      const mediaItem = this.media[this.selectedIndex]
      if (mediaItem) {
        this.$showModal(CommentsModal, {
          animated: true,
          fullscreen: true,
          transition: {
            name: 'slideBottom'
          },
          props: {
            mediaItem
          }
        })
      }
    },
    getFreeGift() {
      if (this.hasLoggedInUser) {
        const mediaId = this.media[this.selectedIndex].mediaId
        const reqObj = {
          mediaId,
          user: {
            email: 'darko.simonovski@hotmail.com' // tempp
          }
        }

        const apiUrl = 'https://thatsmontreal.ca/api/reqPromo.php'
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(reqObj)
        })
          .then((res) => {
            console.log(res) // TODO: show a popup maybe
          })
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          }
        })
      }
    }
  },
  components: {
    MediaContainer,
    LoadingIndicator
  }
}
</script>
