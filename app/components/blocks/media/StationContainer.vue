<template>
  <GridLayout class="m-15" :columns="getAutoCount">
    <StationItem @selected="stationSelected" v-for="(stationItem, idx) in stations" :col="idx" :key="stationItem.locId" :stationItem="stationItem"/>
  </GridLayout>
</template>

<script>
import StationItem from '@/components/blocks/media/StationItem'

export default {
  props: {
    stations: Array
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
      this.$emit('stationSelected', item)
    }
  },
  components: {
    StationItem
  }
}
</script>
