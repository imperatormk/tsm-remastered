<template>
  <ViewContainer footer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center" height="75%">
      <Label text="That's Montreal!" marginBottom="50" fontSize="30" color="#8c8c8c"/>
      <GridLayout columns="*" rows="*" width="300" height="300">
        <FlexboxLayout col="0" row="0" flexWrap="wrap" alignItems="space-around" justifyContent="center">
          <Button @tap="goToScreen(0)" class="quarter top-left"></Button>
          <Button @tap="goToScreen(1)" class="quarter top-right"></Button>
          <Button @tap="goToScreen(3)" class="quarter bottom-left"></Button>
          <Button @tap="goToScreen(2)" class="quarter bottom-right"></Button>
        </FlexboxLayout>
        <StackLayout col="0" row="0" class="fill-circle" @tap="temp()">
          <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="100%">
            <Label :text="'\uf239'" class="fas" fontSize="100" color="#8c8c8c"/>
          </FlexboxLayout>
        </StackLayout>
      </GridLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import EventBus from '@/services/event-bus'

export default {
  methods: {
    goToScreen(screen) {
      EventBus.$emit('goToScreen', screen)
    },
    temp() {
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