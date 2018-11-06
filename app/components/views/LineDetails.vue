<template>
  <ViewContainer :loading="!loaded">
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
import ViewContainer from '@/components/containers/ViewContainer'
import StationContainer from '@/components/blocks/stations/StationContainer'
import MediaCarousel from '@/components/blocks/media/MediaCarousel'
import firebase from "nativescript-plugin-firebase"
import MessageBus from '@/services/MessageBus'

export default {
  props: {
    locLine: {
      type: Number,
      required: true
    }
  },
  created() {
    MessageBus.$on('authStateChanged', (data) => { // addValueEventListener
      console.log(data)
    })

    this.getStations()
      .then(() => {
        if (this.stations.length) {
          this.stationSelected(this.stations[0])
        }
      })
  },
  destroyed() {
    MessageBus.$off('authStateChanged')
  },
  methods: {
    getStations() {
      const apiUrl = `https://thatsmontreal.ca/api/getLocations.php?line=${this.locLine}`
      this.loaded = false
      return fetch(apiUrl)
        .then(stations => stations.json())
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
    ViewContainer,
    StationContainer,
    MediaCarousel
  }
}
</script>
