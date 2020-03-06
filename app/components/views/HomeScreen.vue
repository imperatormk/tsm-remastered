<template>
  <ViewContainer :offsetTop="false" class="home-screen" isHome>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center" height="85%">

      <StackLayout height="100"></StackLayout>
      <Label text="Choose a direction or color!" fontSize="28"/>
      <StackLayout height="50"></StackLayout>

      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <FlexboxLayout height="40%">
            <StackLayout @tap="goToStation(0)" class="quarter top-left"></StackLayout>
            <FlexboxLayout @tap="goToScreen(0)" class="compass-node" width="20%" height="100%" justifyContent="center">
              <Label text="N" color="#ffde00" fontSize="25" fontWeight="bold" paddingTop="10"/>
            </FlexboxLayout>
            <StackLayout @tap="goToStation(1)" class="quarter top-right"></StackLayout>
          </FlexboxLayout>
          <FlexboxLayout height="20%">
            <FlexboxLayout @tap="goToScreen(1)" class="compass-node" width="50%" alignItems="center">
              <Label text="W" color="#ffde00" fontSize="25" fontWeight="bold" paddingLeft="15"/>
            </FlexboxLayout>
            <FlexboxLayout @tap="goToScreen(3)" class="compass-node" width="50%" justifyContent="flex-end" alignItems="center">
              <Label text="E" color="#ffde00" fontSize="25" fontWeight="bold" paddingRight="20"/>
            </FlexboxLayout>
          </FlexboxLayout>
          <FlexboxLayout height="40%">
            <StackLayout @tap="goToStation(3)" class="quarter bottom-left"></StackLayout>
            <FlexboxLayout @tap="goToScreen(2)" class="compass-node" width="20%" height="100%" justifyContent="center" alignItems="flex-end">
              <Label text="S" color="#ffde00" fontSize="25" fontWeight="bold" paddingBottom="10"/>
            </FlexboxLayout>
            <StackLayout @tap="goToStation(2)" class="quarter bottom-right"></StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout col="0" row="0" class="fill-circle">
          <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="100%">
            <FlexboxLayout @tap="()=>{}" justifyContent="center" alignItems="center">
              <Image src="~/images/logce-new-circle.png" height="800"/>
            </FlexboxLayout>
          </FlexboxLayout>
        </StackLayout>
      </GridLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import LineDetails from '@/components/views/LineDetails'
import EventBus from '@/services/event-bus'

export default {
  methods: {
    goToScreen(screen) {
      EventBus.$emit('goToScreen', screen)
    },
    goToStation(station) {
      EventBus.$emit('goToStation', station)
    }
  }
}
</script>

<style lang="scss">
.home-screen {
  .quarter {
    width: 40%;
  }

  .fill-circle {
    width: 65%;
    height: 65%;
    background-color:#fff;
    border-radius: 100%;
  }

  .compass-node {
    background-color: black;
  }

  .top-left {
    border-top-left-radius: 200vw;
    background: #ed8900;
  }

  .top-right {
    border-top-right-radius: 200vw;
    background: #007cc1;
  }

  .bottom-left {
    border-bottom-left-radius: 200vw;
    background: #0cad26;
  }

  .bottom-right {
    border-bottom-right-radius: 200vw;
    background: #ffd400;
  }
}
</style>