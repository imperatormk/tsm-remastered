<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" marginTop="40">
      <StackLayout v-if="scanResult">
        <Label :text="scanResult.code" fontSize="50" :color="statusColor"/>
      </StackLayout>
      <StackLayout v-if="codeStatus">
        <Label :text="getStatus(codeStatus)" fontSize="25" :color="statusColor"/>
      </StackLayout>
      <StackLayout v-if="verifyResult">
        <StackLayout height="20" width="1"/>
        <Label :text="verifyResult.promoId" fontSize="25" :color="statusColor"/>
      </StackLayout>
      <StackLayout height="20" width="1"/>
      <Button @tap="scan" text="Scan again" fontSize="22" padding="15"/>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import { BarcodeScanner } from 'nativescript-barcodescanner'
import api from '@/services/api'

export default {
  mounted() {
    this.scan()
  },
  data: () => ({
    scanResult: null,
    verifyResult: null,
    codeStatus: null
  }),
  computed: {
    statusColor() {
      return this.codeStatus === 'ready' ? '#32d967' : 'red'
    }
  },
  methods: {
    scan() {
      new BarcodeScanner().scan({
        showFlipCameraButton: false,
        showTorchButton: false,
        torchOn: false,
        resultDisplayDuration: 500,
        beepOnScan: true,
        openSettingsIfPermissionWasPreviouslyDenied: true
      })
        .then(result => this.processScanResult(result))
        .catch(() => {
          if (!this.scanResult) this.$navigateBack()
        })
    },
    processScanResult(result) {
      if (!result) this.$navigateBack()

      try {
        const scanResult = JSON.parse(result.text)
        if (scanResult && scanResult.code && scanResult.promoId) this.scanResult = scanResult
      } catch(e) {
        this.scanResult = null
      }

      if (!this.scanResult) return
      this.verifyCode(this.scanResult, false)
        .then((verifyResult) => {
          this.verifyResult = verifyResult
          this.codeStatus = verifyResult.status
        })
        .catch((e) => {
          this.codeStatus = e.response.data.msg
        })
    },
    verifyCode(codeObj, useCode) {
      const reqObj = {
        ...codeObj,
        useCode
      }
      return api.verifyCode(reqObj)
    },
    getStatus(codeStatus) {
      if (codeStatus === 'ready') return 'Valid'
      if (codeStatus === 'badCode') return 'Invalid code'
      if (codeStatus === 'bannedCode') return 'Banned code'
      if (codeStatus === 'usedCode') return 'Code already used'
      return ''
    }
  }
}
</script>