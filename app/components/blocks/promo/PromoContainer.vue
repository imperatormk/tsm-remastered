<template>
  <StackLayout>
    <Label :text="selectedIndex == null ? mediaItem.title : promos[selectedIndex].title" paddingBottom="5" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>

    <Carousel v-if="!hideCarousel && selectedIndex == null" :selectedPage="highlightedIndex" height="300" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
      <CarouselItem v-for="(promoItem) in promos" :key="promoItem.id" backgroundColor="#fefefe" verticalAlignment="middle">
        <StackLayout>
          <Image height="270" :src="getImageUrl(promoItem.promoImages[0].imageUrl)" stretch="fill"/>
          <Label :text="promoItem.title" paddingTop="5" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
        </StackLayout>
      </CarouselItem>
    </Carousel>

    <Carousel v-if="!hideCarousel && selectedIndex != null" height="300" width="100%" @pageChanged="pageChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
      <CarouselItem v-for="(promoImage) in promos[selectedIndex].promoImages" :key="promoImage.id" backgroundColor="#fefefe" verticalAlignment="middle">
        <StackLayout>
          <Image height="270" :src="getImageUrl(promoImage.imageUrl)" stretch="fill"/>
          <Label :text="promoImage.desc" paddingTop="5" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
        </StackLayout>
      </CarouselItem>
    </Carousel>

    <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
      <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in ((selectedIndex != null ? promos[selectedIndex].promoImages : promos).length)" :key="n" :backgroundColor="(selectedIndex != null ? selectedPromoImageIndex : highlightedIndex) === n-1 ? lineColors[mediaItem.line] : 'lightgray'" borderRadius="100"/>
    </FlexboxLayout>

    <StackLayout>
      <GridLayout rows="auto" columns="* auto *" margin="10" width="100%">
        <StackLayout padding="5" horizontalAlignment="center" col="0" @tap="selectedIndex == null ? $emit('hidePromos') : pickPromo(null)">
          <StackLayout horizontalAlignment="center" verticalAlignment="center">
            <Label textAlignment="center" class="fas" :text="'\uf060'" color="#8c8c8c" fontSize="23"/>
            <Label textAlignment="center" text="Back" color="#8c8c8c"/>
          </StackLayout>
        </StackLayout>
        <StackLayout backgroundColor="#c2c2c2" width="1" col="1"></StackLayout>
        <StackLayout padding="5" horizontalAlignment="center" col="2" @tap="selectedIndex == null ? pickPromo(highlightedIndex) : reqPromo(selectedIndex)">
          <StackLayout horizontalAlignment="center" verticalAlignment="center">
            <Label textAlignment="center" class="fas" :text="'\uf06b'" color="#8c8c8c" fontSize="23"/>
            <Label textAlignment="center" :text="selectedIndex == null ? 'Pick gift' : 'Get gift'" color="#8c8c8c"/>
          </StackLayout>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import api from '@/services/api'
import lineColorMixin from '@/mixins/lineColorMixin'

import LoginModal from '@/components/views/LoginModal'

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
    highlightedIndex: 0,
    selectedIndex: null,
    selectedPromoImageIndex: 0,
    hideCarousel: false
  }),
  methods: {
    getPromos() {
      this.hideCarousel = true
      api.getMediaItem(this.mediaItem.id)
        .then(mediaItem => mediaItem.promos)
        .then((promos) => {
          this.promos = promos
          this.highlightedIndex = 0
          this.hideCarousel = false
        })
    },
    reqPromo(promoIndex) {
      if (this.hasLoggedInUser) {
        const promo = this.promos[promoIndex]
        api.reqPromoCode(promo.id)
          .then((res) => {
            console.log(res) // TODO: show a popup maybe
          })
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          }
        })
      }
    },
    pickPromo(promoIndex) {
      this.hideCarousel = true
      this.$nextTick(() => {
        this.selectedIndex = promoIndex
        this.hideCarousel = false
      })
    },
    getImageUrl(url) {
      return `${serverUrl}${url}`
    },
    pageChanged(e) {
      this.highlightedIndex = e.index
    }
  }
}
</script>