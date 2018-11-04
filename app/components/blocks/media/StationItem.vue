<template>
  <StackLayout horizontalAlignment="center">
    <Button margin="7" height="50" width="50" borderRadius="100" borderColor="black" borderWidth="1" @tap="selected"/>
    <Label textAlignment="center" :text="stationItem.locId" fontSize="10" />
  </StackLayout>
</template>

<script>
export default {
  props: {
    stationItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    selected() {
      this.$emit('selected', this.stationItem)
    }
  }
}
</script>

