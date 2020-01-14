<template>
  <StackLayout>
    <Label :text="selectedIndex == null ? mediaItem.title : promos[selectedIndex].title" paddingBottom="10" color="#8c8c8c" fontSize="25" horizontalAlignment="center"/>

    <StackLayout height="230">
      <Carousel v-if="!hideCarousel && selectedIndex == null" :selectedPage="highlightedIndex" width="100%" @pageChanged="slideChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
        <CarouselItem v-for="(promoItem) in promos" :key="promoItem.id" backgroundColor="#fefefe" verticalAlignment="middle">
          <StackLayout>
            <Image height="230" :src="getImageUrl(promoItem.promoImages[0].imageUrl)" stretch="fill"/>
          </StackLayout>
        </CarouselItem>
      </Carousel>

      <Carousel v-if="!hideCarousel && selectedIndex != null" width="100%" @pageChanged="slideChanged" finite="false" bounce="false" showIndicator="false" verticalAlignment="top" color="white">
        <CarouselItem v-for="(promoImage) in promos[selectedIndex].promoImages" :key="promoImage.id" backgroundColor="#fefefe" verticalAlignment="middle">
          <StackLayout>
            <Image height="230" :src="getImageUrl(promoImage.imageUrl)" stretch="fill"/>
          </StackLayout>
        </CarouselItem>
      </Carousel>
    </StackLayout>

    <Label v-if="selectedIndex == null && promos[highlightedIndex] != null" paddingTop="10" :text="promos[highlightedIndex].title" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
    <Label v-else-if="selectedIndex != null && promos[selectedIndex] != null" :text="promos[selectedIndex].desc" paddingTop="10" color="#8c8c8c" fontSize="17" horizontalAlignment="center"/>
    <Label v-else text="hidden" paddingTop="10" color="transparent" fontSize="17" horizontalAlignment="center"/>

    <FlexboxLayout flexDirection="row" justifyContent="center" margin="10">
      <StackLayout marginLeft="2" marginRight="2" height="10" width="10" v-for="n in ((selectedIndex != null ? promos[selectedIndex].promoImages : promos).length || 1)" :key="n" :backgroundColor="(selectedIndex != null ? selectedPromoImageIndex : highlightedIndex) === n-1 ? (lineColors[mediaItem.line] || 'black') : 'lightgray'" borderRadius="100"/>
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
    hideCarousel: false,
    requesting: false
  }),
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
    }
  },
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
      if (this.requesting) return

      if (this.hasLoggedInUser) {
        this.requesting = true
        const promo = this.promos[promoIndex]
        api.reqPromoCode(promo.id)
          .then((res) => {
            console.log(res) // TODO: show a popup maybe
          })
          .finally(() => {
            this.requesting = false
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
    slideChanged(e) {
      if (this.selectedIndex == null) {
        this.highlightedIndex = e.index
      } else {
        this.selectedPromoImageIndex = e.index
      }
    }
  }
}
</script>