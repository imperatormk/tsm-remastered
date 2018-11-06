<template>
  <StackLayout horizontalAlignment="center">
    <Button margin="7" height="50" width="50" borderRadius="100" :style="getStyle" @tap="onSelected"/>
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
    eventBus: Object
  },
  created() {
    this.eventBus.$on('itemSelected', (itemId) => {
      // this.isSelected = this.stationItem.locId === itemId // TODO
    })
  },
  data() {
    return {
      isSelected: false
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
      return {
        'border-color': 'black',
        'border-width': this.isSelected ? '2px' : '0px',
        'background-color': 'orange',
        'opacity': this.stationItem.totalCount > 0 ? '1' : '0.5'
      }
    }
  }
}
</script>

