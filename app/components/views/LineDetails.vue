<template>
  <ViewContainer :loading="!loaded" loadingText="Loading stations...">
    <StackLayout>
      <StackLayout>
        <ScrollView orientation="horizontal" height="100">
          <StationContainer :stations="stations" @stationSelected="stationSelected"/>
        </ScrollView>
      </StackLayout>
      <StackLayout>
        <MediaCarousel v-if="selectedStation" :eventBus="getEventBus()"/>
        <Label fontSize="20" v-else-if="stations.length" textAlignment="center" text="Please select a station..."/>
        <Label fontSize="30" v-else textAlignment="center" text="Nothing to see here..."/>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
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
    this.getStations(this.line)
      .then(() => {
        if (this.stations.length) {
          this.stationSelected(this.stations[0])
        }
      })
  },
  methods: {
    getStations(line) {
      this.loaded = false
      return api.getStations(line)
        .then((stations) => {
          this.stations = stations
          return Promise.resolve()
        })
        .finally(() => {
          this.loaded = true
        })
    },
    stationSelected(station) {
      this.selectedStation = station
      this.nextTick(() => {
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
