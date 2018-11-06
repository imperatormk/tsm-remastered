<template>
  <GridLayout class="p-15" :columns="getAutoCount">
    <StationItem :eventBus="getEventBus()" @selected="stationSelected" v-for="(stationItem, idx) in stations" :col="idx" :key="stationItem.locId" :stationItem="stationItem"/>
  </GridLayout>
</template>

<script>
import StationItem from '@/components/blocks/stations/StationItem'

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
      this.getEventBus().$emit('itemSelected', item.locId)
    },
    getEventBus() {
      return this
    }
  },
  components: {
    StationItem
  }
}
</script>
