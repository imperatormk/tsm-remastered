<template>
  <ViewContainer noHeader>
    <StackLayout width="80%" textAlignment="center">
      <FlexboxLayout flexDirection="column" alignItems="center">
        <Label text="How it works" fontSize="32" marginTop="50" color="#8c8c8c"/>
        <StackLayout height="50"></StackLayout>

        <Carousel @pageChanged="slideChanged" height="200" width="100%" finite="false" bounce="false" showIndicator="true" indicatorColor="#8c8c8c" indicatorColorUnselected="#dfdfdf" verticalAlignment="top" color="white">
          <CarouselItem v-for="(stepItem, idx) in steps" :key="idx" backgroundColor="#fefefe" verticalAlignment="middle">
            <FlexboxLayout width="100%" flexDirection="column" alignItems="center" padding="50 0">
              <Label :text="stepItem.title" fontSize="28" color="#8c8c8c" textWrap="true" textAlignment="center"/>
              <Label v-if="stepItem.desc" :text="stepItem.desc" fontSize="22" color="#8c8c8c"/>
            </FlexboxLayout>
          </CarouselItem>
        </Carousel>
      </FlexboxLayout>

      <StackLayout height="50"></StackLayout>
      <Button v-if="isAtLast" @tap="proceedToHome" text="Got it!" color="black" fontSize="22" padding="15"/>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import HomeScreen from '@/components/views/HomeScreen'
import systemSrv from '@/services/system'

export default {
  data: () => ({
    steps: [{
      title: 'Choose a color of metro line',
      desc: '',
      image: ''
    }, {
      title: 'Select a metro at the top page',
      desc: '',
      image: ''
    }, {
      title: 'Discover new videos around this metro',
      desc: '',
      image: ''
    }, {
      title: 'Get the free gift once you log in!',
      desc: '',
      image: ''
    }],
    currentPage: 0
  }),
  computed: {
    isAtLast() {
      return this.currentPage === this.steps.length - 1
    }
  },
  methods: {
    slideChanged(e) {
      this.currentPage = e.index
    },
    proceedToHome() {
      systemSrv.storeValue({ key: 'EVER_STARTED', value: true })
      this.$navigateTo(HomeScreen, {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    }
  }
}
</script>