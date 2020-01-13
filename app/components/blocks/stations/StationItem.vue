<template>
  <StackLayout horizontalAlignment="center">
    <Button margin="7" height="50" width="50" :text="hasLatest ? `+${stationItem.latestCount}` : ''" borderRadius="100" :style="getStyle" @tap="onSelected"/>
    <Label textAlignment="center" :text="getShortenedTitle" fontSize="11" />
  </StackLayout>
</template>

<script>
const MAX_LENGTH = 10

import lineColorMixin from '@/mixins/lineColorMixin'

export default {
  mixins: [lineColorMixin],
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
      const title = this.stationItem.title

      if (!title) return "-/-"
      if (title.length > MAX_LENGTH) {
        return `${title.substring(0, MAX_LENGTH - 2)}..`
      }
      return title
    },
    getStyle() {
      const line = this.stationItem.line
      const lineColor = this.lineColors[line]
      // globalize?

      const obj = {
        'border-color': 'black',
        // 'border-width': this.isSelected ? '2' : '0',
        'background-color': lineColor,
        'opacity': this.stationItem.totalCount > 0 ? '1' : '0.5',
      }

      return obj
    },
    hasLatest() {
      return this.stationItem.latestCount > 0
    },
    isSelected() {
      return this.selectedStation === this.stationItem.id
    }
  }
}
</script>