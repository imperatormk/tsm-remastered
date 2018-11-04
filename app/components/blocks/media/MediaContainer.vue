<template>
  <Label :text="mediaItem.mediaId" backgroundColor="#50000000" horizontalAlignment="center"/>
</template>

<script>
export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  },
}
</script>

