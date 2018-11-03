<template>
  <GridLayout class="m-15" :columns="getAutoCount">
    <MediaItem v-for="(mediaItem, idx) in media" :col="idx" :key="mediaItem.mediaId" :mediaItem="mediaItem"/>
  </GridLayout>
</template>

<script>
import MediaItem from '@/components/blocks/media/MediaItem'
export default {
  props: {
    media: Array
  },
  computed: {
    getAutoCount() {
      let str = ''
      this.media.forEach(() => [
        str = `${str} auto`
      ])
      return str.trim()
    }
  },
  components: {
    MediaItem
  }
}
</script>
