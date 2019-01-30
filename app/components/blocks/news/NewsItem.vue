<template>
  <FlexboxLayout flexDirection="column" padding="5" @tap="$emit('selected', newsItem)">
    <GridLayout rows="*" backgroundColor="White">
      <GridLayout rows="*" columns="*" margin="0">
        <Image class="img-rounded" :src="getMediaThumbnail" stretch="aspectFill" />
        <GridLayout verticalAlignment="bottom">
          <StackLayout paddingLeft="3" backgroundColor="rgba(0,0,0,0.5)" borderRadius="5" width="100%">
            <Label :text="getMediaTitle" color="white"/>
          </StackLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  </FlexboxLayout>
</template>

<script>
const MAX_LENGTH = 10

export default {
  props: {
    newsItem: Object
  },
  computed: {
    getMediaThumbnail() {
      const mediaType = Number(this.newsItem.mediaType)
      if (mediaType === 0) {
        return `http://i3.ytimg.com/vi/${this.newsItem.mediaUrl}/hqdefault.jpg`
      } else if (mediaType === 1) {
        return this.newsItem.mediaUrl
      }
      return ''
    },
    getMediaTitle() {
      const title = this.newsItem.mediaDesc
      if (title.length <= MAX_LENGTH) return title
      return title.substring(0, MAX_LENGTH)
    }
  }
}
</script>

