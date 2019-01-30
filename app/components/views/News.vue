<template>
  <ViewContainer :loading="!loaded">
    <StackLayout>
      <StackLayout class="p-b-10">
        <ScrollView orientation="horizontal" height="100">
          <NewsContainer :news="news" @newsSelected="newsSelected"></NewsContainer>
        </ScrollView>
      </StackLayout>
      <StackLayout>
        <MediaContainer v-if="compSelectedNews" :mediaItem="compSelectedNews"/>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import NewsContainer from '@/components/blocks/news/NewsContainer'
import MediaContainer from '@/components/blocks/media/MediaContainer'

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
      const apiUrl = `https://thatsmontreal.ca/api/getLatestMedia.php`
      this.loaded = false

      fetch(apiUrl)
        .then(news => news.json())
        .then((news) => {
          this.news = news
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
    MediaContainer
  }
}
</script>
