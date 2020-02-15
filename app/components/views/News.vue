<template>
  <ViewContainer :loading="!loaded" loadingText="Loading news...">
    <StackLayout>
      <StackLayout class="p-b-10">
        <ScrollView orientation="horizontal" height="100">
          <NewsContainer :news="news" @newsSelected="newsSelected"></NewsContainer>
        </ScrollView>
      </StackLayout>
      <StackLayout v-if="compSelectedNews" paddingTop="15">
        <PromoContainer v-if="showPromos" :mediaItem="{ ...compSelectedNews, line: compSelectedNews.location.line }" @hidePromos="showPromos = false"/>

        <StackLayout v-else>
          <Label :text="compSelectedNews.title" paddingBottom="10" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>
          <MediaContainer :mediaItem="compSelectedNews"/>
          <StackLayout height="20" width="1"/>
          <MediaActions :mediaItem="compSelectedNews" @showPromos="onShowPromos"></MediaActions>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import api from '@/services/api'

import NewsContainer from '@/components/blocks/news/NewsContainer'
import MediaContainer from '@/components/blocks/media/MediaContainer'
import MediaActions from '@/components/blocks/media/MediaActions'
import PromoContainer from '@/components/blocks/promo/PromoContainer'

export default {
  created() {
    this.getLatestMedia()
  },
  data() {
    return {
      news: [],
      selectedNews: null,
      showPromos: false,
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
    },
    onShowPromos() {
      if (this.compSelectedNews.promos.length) {
        this.showPromos = true
      }
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
    MediaActions,
    PromoContainer
  }
}
</script>
