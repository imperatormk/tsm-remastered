<template>
  <ViewContainer>
    <FlexboxLayout height="100%" alignItems="center">
      <FlexboxLayout flexDirection="column" width="100%" justifyContent="center" alignItems="center" height="80%">
        <Label text="Contact us!" fontSize="30" color="#8c8c8c"/>
        <StackLayout height="30"></StackLayout>
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
          <StackLayout height="20"></StackLayout>
          <TextView hint="Message"
            v-model="msg" 
            secure="false"
            textWrap="true"
            returnKeyType="done"
            fontSize="15"
            autocorrect="false"
            padding="15"
            width="85%"
            height="60%"
            style="margin:0px;border-width:3px;border-color:#e5e5e5"
            class="input input-border"></TextView>
          <StackLayout height="15"></StackLayout>
          <Button @tap="sendContact" :isEnabled="valid" class="btn-flat" background="#e5e5e5" color="#8c8c8c" fontSize="22" text="Send"/>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return {
      subject: '',
      msg: ''
    }
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    },
    valid() {
      const msg = this.msg.trim()
      const subject = this.subject.trim()
      return !!(subject && msg)
    }
  },
  methods: {
    sendContact() {
      if (!this.valid) return

      const email = this.$store.getters.getCurrentUser.email
      const msg = this.msg.trim()
      const subject = this.subject.trim()

      const contactObj = {
        email,
        subject,
        msg
      }
      api.contactUs(contactObj)
        .then((res) => {
          console.log(res) // TODO: show popup
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-flat {
    border-color: transparent;
    border-width: 1;
  }
</style>
