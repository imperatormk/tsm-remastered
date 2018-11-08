<template>
  <StackLayout margin="10" marginTop="0" marginBottom="0">
    <FlexboxLayout flexDirection="row" width="100%" paddingRight="10" paddingBottom="20">
      <StackLayout minWidth="40" marginRight="5">
        <Image :src="commentItem.userProfImg" width="40" minWidth="40" style="border-radius:100%"/>
      </StackLayout>
      <StackLayout width="100%">
        <FlexboxLayout padding="5" flexDirection="column" justifyContent="space-around" backgroundColor="#f5f5f5" borderRadius="10">
          <Label padding="2" :text="commentItem.userDispName" color="#8c8c8c"/>
          <Label padding="2" fontSize="15" textWrap="true" :text="commentItem.commContent" color="#8c8c8c"/>
        </FlexboxLayout>
      </StackLayout>
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
