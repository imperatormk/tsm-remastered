<template>
  <GridLayout class="p-x-15 p-t-10 p-b-0 m-b-0" :columns="getAutoCount">
    <NewsItem @selected="newsSelected" v-for="(newsItem, idx) in news" :col="idx" :key="newsItem.id" :newsItem="newsItem"/>
  </GridLayout>
</template>

<script>
import NewsItem from '@/components/blocks/news/NewsItem'

export default {
  props: {
    news: Array
  },
  data() {
    return {
      selectedNews: null
    }
  },
  computed: {
    getAutoCount() {
      let str = ''
      this.news.forEach(() => [
        str = `${str} auto`
      ])
      return str.trim()
    }
  },
  methods: {
    newsSelected(item) {
      this.selectedNews = item.id
      this.$emit('newsSelected', item)
    }
  },
  components: {
    NewsItem
  }
}
</script>
