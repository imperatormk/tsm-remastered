<template>
  <StackLayout horizontalAlignment="center">
    <Button margin="7" height="50" width="50" :text="hasLatest ? `+${stationItem.latestCount}` : ''" borderRadius="100" :style="getStyle" @tap="onSelected"/>
    <Label textAlignment="center" :text="getShortenedTitle" fontSize="10" />
  </StackLayout>
</template>

<script>
export default {
  props: {
    stationItem: {
      type: Object,
      required: true
    },
    selectedStation: {
      type: Number,
      default: null
    }
  },
  methods: {
    onSelected() {
      this.$emit('selected', this.stationItem)
    },
  },
  computed: {
    getShortenedTitle() {
      const title = this.stationItem.locTitle

      if (!title) return "-/-"
      if (title.length > 5) {
        return title.substring(0, 7) + '..'
      }
      return title
    },
    getStyle() {
      const lineColors = { 0: '#ed8900',  1: '#007cc1', 2: '#ffd400', 3: '#0cad26' }
      const locLine = Number(this.stationItem.locLine)
      const lineColor = lineColors[locLine]
      // globalize?

      const obj = {
        'border-color': 'black',
        'border-width': this.isSelected ? '2' : '0',
        'background-color': lineColor,
        'opacity': this.stationItem.totalCount > 0 ? '1' : '0.5',
      }

      return obj
    },
    hasLatest() {
      return this.stationItem.latestCount > 0
    },
    isSelected() {
      return this.selectedStation === Number(this.stationItem.locId)
    }
  }
}
</script>