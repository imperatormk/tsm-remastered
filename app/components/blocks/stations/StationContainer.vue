<template>
  <GridLayout class="p-15" :columns="getAutoCount">
    <StationItem :selectedStation="selectedStation" @selected="stationSelected" v-for="(stationItem, idx) in stations" :col="idx" :key="stationItem.locId" :stationItem="stationItem"/>
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
      this.selectedStation = Number(item.locId)
      this.$emit('stationSelected', item)
    }
  },
  components: {
    StationItem
  }
}
</script>
