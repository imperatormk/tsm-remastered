<template>
  <ViewContainer :loading="!loaded" loadingText="Loading stations...">
    <StackLayout>
      <StackLayout class="p-b-20">
        <ScrollView orientation="horizontal" height="100">
          <StationContainer :stations="stations" @stationSelected="stationSelected"/>
        </ScrollView>
      </StackLayout>
      <StackLayout>
        <MediaCarousel v-if="selectedStation" :eventBus="getEventBus()"/>
        <Label v-else textAlignment="center" text="Please select a station..." />
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import Vue from 'vue'
import api from '@/services/api'
import StationContainer from '@/components/blocks/stations/StationContainer'
import MediaCarousel from '@/components/blocks/media/MediaCarousel'
import EventBus from '@/services/event-bus'

export default {
  props: {
    line: {
      type: Number,
      required: true
    }
  },
  created() {
    EventBus.$on('authStateChanged', (data) => { // addValueEventListener
      console.log(data)
    })

    this.getStations(this.line)
      .then(() => {
        if (this.stations.length) {
          this.stationSelected(this.stations[0])
        }
      })
  },
  destroyed() {
    EventBus.$off('authStateChanged')
  },
  methods: {
    getStations(line) {
      this.loaded = false
      return api.getStations(line)
        .then((stations) => {
          this.stations = stations
          this.loaded = true
          return Promise.resolve()
        })
    },
    stationSelected(station) {
      this.selectedStation = station
      Vue.nextTick(() => {
        this.getEventBus().$emit('newStationData', station)
      })
    },
    getEventBus() {
      return this
    }
  },
  data() {
    return {
      stations: [],
      selectedStation: null,
      loaded: false
    }
  },
  components: {
    StationContainer,
    MediaCarousel
  }
}
</script>
