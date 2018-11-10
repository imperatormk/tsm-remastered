<template>
  <ViewContainer>
    <StackLayout>
      <Button text="Lines" @tap="goToScreen(1)"/>
      <Button text="Social media" @tap="goToScreen(2)"/>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import ViewContainer from '@/components/containers/ViewContainer'
import LineList from '@/components/views/LineList'
import SocialMedia from '@/components/views/SocialMedia'

export default {
  methods: {
    goToScreen(screen) {
      let comp = null
      if (screen === 1) comp = LineList
      if (screen === 2) comp = SocialMedia

      this.$navigateTo(comp,
      {
        animated: true,
        transition: {
          name: 'fade'
        }
      })
    }
  },
  components: {
    ViewContainer
  }
}
</script>

