<template>
  <FlexboxLayout flexDirection="column" padding="5" @tap="$emit('selected', newsItem)">
    <GridLayout rows="*" backgroundColor="White">
      <GridLayout rows="*" columns="*" margin="0">
        <Image class="img-rounded" :src="getMediaThumbnail" stretch="fill"/>
        <GridLayout verticalAlignment="bottom">
          <StackLayout padding="4" backgroundColor="rgba(0,0,0,0.5)" borderRadius="5" width="100%">
            <Label :text="getMediaTitle" color="white" fontSize="11"/>
          </StackLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  </FlexboxLayout>
</template>

<script>
const MAX_LENGTH = 15

export default {
  props: {
    newsItem: Object
  },
  methods: {
    getYoutubeId(videoUrl) { // move this to helpers some time
      const url = require('url')
      const urlParts = url.parse(videoUrl, true)
      const query = urlParts.query
      return query.v || null
    }
  },
  computed: {
    getMediaThumbnail() {
      const mediaType = this.newsItem.type
      if (mediaType === 0) {
        return `https://i3.ytimg.com/vi/${this.getYoutubeId(this.newsItem.url)}/hqdefault.jpg`
      } else if (mediaType === 1) {
        return this.newsItem.url
      }
      return null
    },
    getMediaTitle() {
      const title = this.newsItem.title
      if (title.length <= MAX_LENGTH) return title
      return `${title.substring(0, MAX_LENGTH - 2)}..`
    }
  }
}
</script>

