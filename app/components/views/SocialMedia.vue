<template>
  <ViewContainer backgroundImage="~/images/social-media-bg-alt.jpg">
    <StackLayout height="100%" verticalAlignment="center">
      <StackLayout verticalAlignment="center" borderRadius="50" backgroundColor="rgba(180,180,180,0.5)" width="80%" height="50%">
        <FlexboxLayout padding="20" justifyContent="space-around" alignItems="space-around" flexDirection="row">
          <FlexboxLayout justifyContent="center" alignItems="center" padding="25" borderRadius="10" backgroundColor="#3b5999">
            <Label class="fab" :text="'\uf09a'" fontSize="25" color="white"/>
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center" alignItems="center" padding="25" borderRadius="10" backgroundColor="#1da1f2">
            <Label class="fab" :text="'\uf099'" fontSize="25" color="white"/>
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center" alignItems="center" padding="25" borderRadius="10" backgroundColor="#db4437">
            <Label class="fab" :text="'\uf1a0'" fontSize="25" color="white"/>
          </FlexboxLayout>
        </FlexboxLayout>
      </StackLayout>
    </StackLayout>
  </ViewContainer>
</template>

<script>
import ViewContainer from '@/components/containers/ViewContainer'

export default {
  components: {
    ViewContainer
  }
}
</script>

