<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around" height="80%">
      <Label text="Pick a line and travel!" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" style="z-index:1" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <StackLayout @tap="goToStation(0)" class="quarter top-left">
            <StackLayout class="containerIcon"></StackLayout>
          </StackLayout>
          <StackLayout @tap="goToStation(1)" class="quarter top-right">
            <StackLayout class="containerIcon"></StackLayout>
          </StackLayout>
          <StackLayout @tap="goToStation(3)" class="quarter bottom-left">
            <StackLayout class="containerIcon"></StackLayout>
          </StackLayout>
          <StackLayout @tap="goToStation(2)" class="quarter bottom-right">
            <StackLayout class="containerIcon"></StackLayout>
          </StackLayout>
        </FlexboxLayout>
        <StackLayout @tap="temp()" col="0" row="0" class="fill-circle"></StackLayout>
      </GridLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import LineDetails from '@/components/views/LineDetails'
import ViewContainer from '@/components/containers/ViewContainer'

export default {
  methods: {
    goToStation(locLine) {
      this.$navigateTo(LineDetails, { props: { locLine } })
    },
    temp() {}
  },
  components: {
    ViewContainer
  }
}
</script>

<style lang="scss" scoped>
  .quarter {
    width: 50%;
    height: 50%;
  }

  .fill-circle {
    width: 65%;
    height: 65%;
    position:absolute;
    z-index:5;
    background-color:#000;
    border-radius:100%;
  }

  .top-left {
    border-top-left-radius: 200vw;
    background: #ed8900;
    float: left
  }

  .top-right {
    border-top-right-radius: 200vw;
    background: #007cc1;
    float: right
  }

  .bottom-left {
    border-bottom-left-radius: 200vw;
    background: #0cad26;
    float: left
  }

  .bottom-right {
    border-bottom-right-radius: 200vw;
    background: #ffd400;
    float: right
  }
</style>
