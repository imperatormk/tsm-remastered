<template>
  <ViewContainer :loading="!loaded">
    <StackLayout>
      <StackLayout class="p-b-10">
        <ScrollView orientation="horizontal" height="100">
          <NewsContainer :news="news" @newsSelected="newsSelected"></NewsContainer>
        </ScrollView>
      </StackLayout>
      <StackLayout v-if="compSelectedNews">
        <MediaContainer :mediaItem="compSelectedNews"/>
        <StackLayout height="20" width="1"/>
        <MediaActions :mediaItem="compSelectedNews"></MediaActions>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import api from '@/services/api'
import NewsContainer from '@/components/blocks/news/NewsContainer'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import MediaActions from '@/components/blocks/media/MediaActions'

export default {
  created() {
    this.getLatestMedia()
  },
  data() {
    return {
      news: [],
      selectedNews: null,
      loaded: false
    }
  },
  methods: {
    getLatestMedia() {
      this.loaded = false

      api.getLatestMedia()
        .then((news) => {
          this.news = news
        })
        .finally(() => {
          this.loaded = true
        })
    },
    newsSelected(item) {
      this.selectedNews = item
    }
  },
  computed: {
    compSelectedNews() {
      if (this.selectedNews) return this.selectedNews
      if (this.news.length) return this.news[0]
      return null
    }
  },
  components: {
    NewsContainer,
    MediaContainer,
    MediaActions
  }
}
</script>
