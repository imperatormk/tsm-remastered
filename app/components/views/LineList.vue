<template>
  <ViewContainer footer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center" height="65%">
      <Label text="Pick a line and travel!" marginBottom="50" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <Button @tap="goToStation(0)" class="quarter top-left"></Button>
          <Button @tap="goToStation(1)" class="quarter top-right"></Button>
          <Button @tap="goToStation(3)" class="quarter bottom-left"></Button>
          <Button @tap="goToStation(2)" class="quarter bottom-right"></Button>
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

export default {
  methods: {
    goToStation(line) {
      this.$navigateTo(LineDetails,
      {
        props: { line },
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    }
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
    background-color: white;
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
