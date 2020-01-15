<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" marginTop="40">
      <Label text="User dashboard" fontSize="25"/>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import PromoQr from '@/components/blocks/promo/PromoQr'

export default {
  data: () => ({
  }),
  mounted() {
    const codeObj = {
      code: 'test',
      promoId: 999
    }
  },
  methods: {
    showQr(codeObj) {
      this.$showModal(PromoQr, {
        animated: true,
        transition: {
          name: 'fade'
        },
        props: {
          obj: codeObj
        }
      })
    }
  }
}
</script>