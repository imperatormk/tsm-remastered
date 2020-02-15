<template>
  <ViewContainer>
    <FlexboxLayout flexDirection="column" alignItems="center" marginTop="40" height="80%">
      <GridLayout v-if="scanResult" rows="*" columns="*" horizontalAlignment="center" verticalAlignment="center" width="100%" height="100">
        <Image src="~/images/barcode.png" width="90%"/>
        <FlexboxLayout>
          <StackLayout flexGrow="1" height="1" width="1"/>
          <FlexboxLayout flexDirection="column">
            <StackLayout flexGrow="1" height="1" width="1"/>
            <Label backgroundColor="white" padding="0 10" :text="scanResult.code" fontSize="40" :color="statusColor"/>
            <StackLayout flexGrow="1" height="1" width="1"/>
          </FlexboxLayout>
          <StackLayout flexGrow="1" height="1" width="1"/>
        </FlexboxLayout>
      </GridLayout>
      <StackLayout v-if="codeStatus">
        <StackLayout height="20" width="1"/>
        <Label :text="getStatus(codeStatus)" fontSize="25" :color="statusColor"/>
      </StackLayout>
      <StackLayout v-if="verifyResult" height="20" width="1"/>
      <FlexboxLayout v-if="verifyResult" flexDirection="column" alignItems="center" borderWidth="1" borderRadius="10" borderColor="#8c8c8c" padding="10" width="90%">
        <Label :text="verifyResult.media.title" fontSize="25"/>
        <StackLayout height="10" width="1"/>
        <Label :text="verifyResult.title" fontSize="22"/>
        <StackLayout height="10" width="1"/>
        <Button v-if="!applied" @tap="apply" text="Apply" fontSize="21" padding="15"/>
        <Label v-else text="Code applied!" :color="statusColor" fontSize="21"/>
      </FlexboxLayout>
      <StackLayout flexGrow="1" height="1" width="1"/>
      <Button @tap="scan" text="Scan again" fontSize="22" padding="15"/>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import { BarcodeScanner } from 'nativescript-barcodescanner'

import api from '@/services/api'
import toast from '@/services/toast'

export default {
  mounted() {
    this.scan()
  },
  data: () => ({
    scanResult: null,
    verifyResult: null,
    codeStatus: null,
    applied: false
  }),
  computed: {
    statusColor() {
      return this.codeStatus === 'valid' ? '#32d967' : 'red'
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
          const { promo } = verifyResult
          if (promo.active) {
            this.verifyResult = promo
            this.codeStatus = 'valid'
          } else {
            this.codeStatus = 'inactive'
          }
        })
        .catch((e) => {
          this.codeStatus = e.response.data.msg
        })
    },
    apply() {
      this.verifyCode(this.scanResult, true)
        .then((verifyResult) => {
          toast.showToast('Code applied!')
          this.applied = true
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
      if (codeStatus === 'valid') return 'Valid'
      if (codeStatus === 'inactive') return 'Expired code'
      if (codeStatus === 'badCode') return 'Invalid code'
      if (codeStatus === 'bannedCode') return 'Banned code'
      if (codeStatus === 'usedCode') return 'Code already used'
      return ''
    }
  }
}
</script>