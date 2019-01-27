<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="space-around" height="80%">
      <Label text="Contact us!" fontSize="30" color="#8c8c8c"/>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
export default {
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>