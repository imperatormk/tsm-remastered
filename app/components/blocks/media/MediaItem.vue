<template>
  <StackLayout horizontalAlignment="center">
    <Button margin="7" height="50" width="50" borderRadius="100" borderColor="black" borderWidth="1" />
    <Label textAlignment="center" :text="mediaItem.mediaId" fontSize="10" />
  </StackLayout>
</template>

<script>
export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  }
}
</script>

