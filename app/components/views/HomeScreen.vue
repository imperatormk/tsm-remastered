<template>
  <ViewContainer :offsetTop="false">
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center" height="80%">

      <StackLayout height="90"></StackLayout>
      <Image src="~/images/logce-dark.png" height="60"/>
      <StackLayout height="70"></StackLayout>
      <Label text="Choose a direction or a color!" fontSize="28"/>
      <StackLayout height="70"></StackLayout>

      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <FlexboxLayout height="40%">
            <StackLayout @tap="goToStation(0)" class="quarter top-left"></StackLayout>
            <FlexboxLayout @tap="goToScreen(0)" width="20%" height="100%" backgroundColor="#d4d4d4" justifyContent="center">
              <Label text="N" color="black" fontSize="25" fontWeight="bold" paddingTop="10"/>
            </FlexboxLayout>
            <StackLayout @tap="goToStation(1)" class="quarter top-right"></StackLayout>
          </FlexboxLayout>
          <FlexboxLayout height="20%">
            <FlexboxLayout @tap="goToScreen(1)" width="50%" backgroundColor="#d4d4d4" alignItems="center">
              <Label text="W" color="black" fontSize="25" fontWeight="bold" paddingLeft="15"/>
            </FlexboxLayout>
            <FlexboxLayout @tap="goToScreen(3)" width="50%" backgroundColor="#d4d4d4" justifyContent="flex-end" alignItems="center">
              <Label text="E" color="black" fontSize="25" fontWeight="bold" paddingRight="20"/>
            </FlexboxLayout>
          </FlexboxLayout>
          <FlexboxLayout height="40%">
            <StackLayout @tap="goToStation(3)" class="quarter bottom-left"></StackLayout>
            <FlexboxLayout @tap="goToScreen(2)" width="20%" height="100%" backgroundColor="#d4d4d4" justifyContent="center" alignItems="flex-end">
              <Label text="S" color="black" fontSize="25" fontWeight="bold" paddingBottom="10"/>
            </FlexboxLayout>
            <StackLayout @tap="goToStation(2)" class="quarter bottom-right"></StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout col="0" row="0" class="fill-circle">
          <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="100%">
            <FlexboxLayout @tap="()=>{}" justifyContent="center" alignItems="center" class="fill-circle">
              <Label :text="'\uf239'" class="fas" fontSize="100" color="#8c8c8c"/>
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

<style lang="scss" scoped>
  .quarter {
    width: 40%;
  }

  .fill-circle {
    width: 65%;
    height: 65%;
    background-color:white;
    border-radius: 100%;
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
</style>