<template>
  <StackLayout>
    <FlexboxLayout flexDirection="column" alignItems="center" padding="25">
      <Image v-if="qr" :src="qr"/>
      <Label text="Show this to a relevant staff member" fontSize="20" textWrap="true" textAlignment="center"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
const ZXing = require('nativescript-zxing-compat')
const zx = new ZXing()

export default {
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    qr: null
  }),
  mounted() {
    this.createCodeQr(this.obj.code, this.obj.promoId)
  },
  methods: {
    createCodeQr(code, promoId) {
      const codeJson = JSON.stringify({ code, promoId })
      const img = zx.createBarcode({
        encode: codeJson,
        height: 100,
        width: 100,
        format: ZXing.QR_CODE
      })
      this.qr = img
    }
  }
}
</script>