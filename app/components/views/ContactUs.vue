<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" width="100%" justifyContent="center" alignItems="center" height="80%">
      <Label text="Contact us!" fontSize="30" color="#8c8c8c" marginBottom="30"/>
      <FlexboxLayout flexDirection="column">
        <TextField hint="Subject" 
          v-model="subject" 
          secure="false"
          returnKeyType="done"
          fontSize="15"
          autocorrect="false"
          padding="15"
          width="90%"
          style="margin:0px;border-width:3px;border-color:#e5e5e5"
          class="input input-border"></TextField>
        <StackLayout height="30"></StackLayout>
        <TextView hint="Message"
          v-model="message" 
          secure="false"
          textWrap="true"
          returnKeyType="done"
          fontSize="15"
          autocorrect="false"
          padding="15"
          width="90%"
          height="60%"
          style="margin:0px;border-width:3px;border-color:#e5e5e5"
          class="input input-border"></TextView>
        <StackLayout height="10"></StackLayout>
        <Button background="#0cad26" color="white" fontSize="22" text="Send"/>
      </FlexboxLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
export default {
  mounted() {
    console.log(this.getCurrentUser)
  },
  data() {
    return {
      subject: '',
      message: ''
    }
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>