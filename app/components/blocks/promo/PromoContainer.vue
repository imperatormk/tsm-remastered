<template>
  <StackLayout>
    <Label text="Media container" paddingBottom="5" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>

    <Carousel v-if="!hideCarousel" height="280" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
      <CarouselItem v-for="(promoItem) in promos" :key="promoItem.id" backgroundColor="#fefefe" verticalAlignment="middle">
        <Image :src="getImageUrl(promoItem.promoImages[0].imageUrl)" stretch="fill"/>
        <Label :text="promoItem.title" paddingBottom="5" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>
      </CarouselItem>
    </Carousel>

    <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
      <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in promos.length" :key="n" :backgroundColor="selectedIndex === n-1 ? lineColors[mediaItem.line] : 'lightgray'" borderRadius="100"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import api from '@/services/api'
import lineColorMixin from '@/mixins/lineColorMixin'

const serverUrl = 'https://thatsmontreal.com'

export default {
  mixins: [lineColorMixin],
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.getPromos()
  },
  data: () => ({
    promos: [],
    selectedIndex: 0,
    hideCarousel: false
  }),
  methods: {
    getPromos() {
      this.hideCarousel = true
      api.getMediaItem(this.mediaItem.id)
        .then(mediaItem => mediaItem.promos)
        .then((promos) => {
          this.promos = promos
          this.hideCarousel = false
          this.selectedIndex = 0
        })
    },
    getImageUrl(url) {
      console.log(`${serverUrl}${url}`)
      return `${serverUrl}${url}`
    },
    pageChanged(e) {
      this.selectedIndex = e.index
    }
  }
}
</script>