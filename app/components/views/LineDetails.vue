<template>
  <ViewContainer :loading="!loaded">
    <StackLayout>
      <StackLayout>
        <ScrollView orientation="horizontal" height="120">
          <StationContainer :stations="stations" @stationSelected="stationSelected"/>
        </ScrollView>
      </StackLayout>
      <StackLayout>
        <MediaCarousel :eventBus="getEventBus()" @pageChanged="pageChanged"/>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import ViewContainer from '@/components/containers/ViewContainer'
import StationContainer from '@/components/blocks/media/StationContainer'
import MediaCarousel from '@/components/blocks/media/MediaCarousel'
import firebase from "nativescript-plugin-firebase"
import MessageBus from '@/services/MessageBus'

export default {
  created() {
    MessageBus.$on('authStateChanged', (data) => { // addValueEventListener
      console.log(data)
    })

    this.getStations()
  },
  methods: {
    getStations() {
      const apiUrl = `https://thatsmontreal.ca/api/getLocations.php?line=${this.lineId}`
      this.loaded = false
      fetch(apiUrl)
        .then(stations => stations.json())
        .then((stations) => {
          this.stations = stations
          this.loaded = true
        })
    },
    stationSelected(station) {
      this.getEventBus().$emit('newStationData', station)
    },
    pageChanged(e) {
      // this.getStations()
    },
    getEventBus() {
      return this
    }
  },
  data() {
    return {
      stations: [],
      lineId: 1,
      loaded: false
    }
  },
  components: {
    ViewContainer,
    StationContainer,
    MediaCarousel,
  }
}
</script>
