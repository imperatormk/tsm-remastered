<template>
  <StackLayout>
    <StackLayout v-if="loaded" backgroundColor="black">
      <YoutubeContainer v-show="videoLoaded" :dataItem="mediaItem" @onVideoLoaded="onVideoLoaded"/>
    </StackLayout>
    <StackLayout verticalAlignment="center" v-if="!videoLoaded" backgroundColor="black" :height="getPlayerHeight()">
      <LoadingIndicator color="red"/>
    </StackLayout>
  </StackLayout>
</template>

<script>
import YoutubeContainer from '@/components/containers/YoutubeContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import EventBus from '@/services/event-bus'
import systemSrv from '@/services/system'

export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    },
    station: {
      type: Object,
      required: false
    }
  },
  mounted() {
    EventBus.$emit('getPageRef', (ref) => {
      this.pageRef = ref
      this.loaded = true
    })
    EventBus.$on('onBackButton', (e) => {
      if (!this.getModalCount) {
        e.cancel = true
        this.loaded = false
        this.$nextTick(() => {
          this.$navigateBack()
        })
      }
    })
  },
  beforeDestroy() {
    this.loaded = false
  },
  data() {
    return {
      loaded: false,
      videoLoaded: false,
      currentState: null,
      pageRef: null,
      videoId: null
    }
  },
  computed: {
    getModalCount() {
      return this.$store.getters.getModalCount
    }
  },
  methods: {
    onVideoLoaded(playerId) {
      const player = this.getPlayer(playerId)
      if (player) {
        player.playerStyle = 2
      }

      this.currentState = 'paused'
      this.videoLoaded = true
      this.playerId = playerId
    },
    getPlayer(playerId) {
      return this.pageRef.getViewById(playerId)
    },
    getPlayerHeight() {
      return systemSrv.getPlayerHeight()
    }
  },
  components: {
    YoutubeContainer,
    LoadingIndicator
  }
}
</script>

