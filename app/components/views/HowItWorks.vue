<template>
  <StackLayout width="100%" textAlignment="center" padding="5 10">
    <FlexboxLayout flexDirection="column" alignItems="center">
      <Image src="~/images/logce-dark.png" height="60" marginTop="50"/>
      <Label text="How it works" fontSize="40" marginTop="40" color="#8c8c8c"/>
      <StackLayout height="50"></StackLayout>

      <Carousel @pageChanged="slideChanged" height="120" width="100%" finite="false" bounce="false" showIndicator="true" indicatorColor="#8c8c8c" indicatorColorUnselected="#dfdfdf" verticalAlignment="top" color="white">
        <CarouselItem v-for="(stepItem, idx) in steps" :key="idx" backgroundColor="#fefefe" verticalAlignment="middle">
          <FlexboxLayout width="100%" flexDirection="column" alignItems="center" padding="10 5">
            <Label :text="stepItem.title" fontSize="28" color="#8c8c8c" textWrap="true" textAlignment="center"/>
            <Label v-if="stepItem.desc" :text="stepItem.desc" fontSize="22" color="#8c8c8c"/>
          </FlexboxLayout>
        </CarouselItem>
      </Carousel>
    </FlexboxLayout>

    <StackLayout height="50"></StackLayout>
    <Button @tap="proceedToHome" :isEnabled="isAtLast" text="Got it!" :color="isAtLast ? 'black' : 'grey'" fontSize="22" padding="15"/>
  </StackLayout>
</template>

<script>
import EventBus from '@/services/event-bus'
import systemSrv from '@/services/system'

export default {
  mounted() {
    this.isVisible = true
    EventBus.$on('onBackButton', (e) => {
      if (this.isVisible) e.cancel = true
    })
  },
  destroyed() {
    this.isVisible = false
  },
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
    isVisible: false,
    isAtLast: false
  }),
  methods: {
    slideChanged(e) {
      const isAtLast = e.index === this.steps.length - 1
      if (isAtLast) this.isAtLast = true
    },
    proceedToHome() {
      systemSrv.storeValue({ key: 'EVER_STARTED', value: true })
      this.$modal.close()
    }
  }
}
</script>