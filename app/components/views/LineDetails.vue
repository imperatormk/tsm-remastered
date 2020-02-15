<template>
  <ViewContainer :loading="!loaded" loadingText="Loading stations...">
    <StackLayout>
      <StackLayout>
        <ScrollView orientation="horizontal" height="100">
          <StationContainer :stations="stations" @stationSelected="stationSelected"/>
        </ScrollView>
      </StackLayout>
      <StackLayout paddingTop="15">
        <MediaCarousel v-if="selectedStation" :eventBus="getEventBus()"/>
        <Label v-else-if="stations.length" text="Please select a station..." fontSize="20" padding="10" textAlignment="center"/>
        <Label v-else text="Nothing to see here..." fontSize="30" padding="10" textAlignment="center"/>
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
      this.$nextTick(() => {
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
