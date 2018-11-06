<template>
  <StackLayout margin="10" borderBottomWidth="1">
    <FlexboxLayout flexDirection="row" width="100%" paddingRight="10" paddingBottom="7">
      <Image :src="commentItem.userProfImg" width="50" marginRight="5" style="border-radius:100%"/>
      <FlexboxLayout flexDirection="column" justifyContent="space-around">
        <Label :text="commentItem.userDispName" color="#8c8c8c"/>
        <Label :text="commentItem.commContent" color="#8c8c8c"/>
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    commentItem: {
      type: Object,
      required: true
    }
  }
}
</script>
