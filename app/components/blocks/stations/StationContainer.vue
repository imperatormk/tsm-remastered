<template>
  <GridLayout class="p-x-15 p-t-10 p-b-0 m-b-0" :columns="getAutoCount">
    <StationItem :selectedStation="selectedStation" @selected="stationSelected" v-for="(stationItem, idx) in stations" :col="idx" :key="stationItem.id" :stationItem="stationItem"/>
  </GridLayout>
</template>

<script>
import StationItem from '@/components/blocks/stations/StationItem'

export default {
  props: {
    stations: Array
  },
  data() {
    return {
      selectedStation: null
    }
  },
  computed: {
    getAutoCount() {
      let str = ''
      this.stations.forEach(() => [
        str = `${str} auto`
      ])
      return str.trim()
    }
  },
  methods: {
    stationSelected(item) {
      this.selectedStation = item.id
      this.$emit('stationSelected', item)
    }
  },
  components: {
    StationItem
  }
}
</script>
