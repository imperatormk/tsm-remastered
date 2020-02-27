<template>
  <ViewContainer :loading="!loaded">
    <FlexboxLayout flexDirection="column" alignItems="center" marginTop="40">
      <Label text="Save with gifts" fontSize="25"/>
      <FlexboxLayout flexDirection="column" alignItems="center" marginTop="40">
        <ScrollView v-if="codes.length" height="70%">
          <StackLayout>
            <GridLayout v-for="codeObj in codes" :key="codeObj.id" rows="auto" columns="* * *" padding="15 10" width="100%">
              <Label col="0" :text="codeObj.code" fontSize="18" textAlignment="center"/>
              <Label col="1" :text="codeObj.promo.title" fontSize="18" textAlignment="center"/>
              <StackLayout col="2">
                <Label v-if="codeObj.status === 'ready'" @tap="showQr(codeObj)" text="Redeem" color="#32d967" fontSize="18" textAlignment="center"/>
                <Label v-else :text="getStatus(codeObj.status)" color="red" fontSize="18" textAlignment="center"/>
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>
        <FlexboxLayout v-else @tap="gotoNews" flexDirection="column" alignItems="center">
          <Label :text="'\uf06b'" class="fas" fontSize="100" padding="10" textAlignment="center"/>
          <Label text="No gifts (yet)... why'd you not check out News section?" fontSize="20" padding="10" textAlignment="center" textWrap="true"/>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </ViewContainer>
</template>

<script>
import api from '@/services/api'
import EventBus from '@/services/event-bus'

import PromoQr from '@/components/blocks/promo/PromoQr'

export default {
  created() {
    this.loadData()
  },
  data: () => ({
    user: {},
    codes: [],
    loaded: false
  }),
  methods: {
    loadData() {
      api.getUser()
        .then((user) => {
          this.user = user
          if (user.type === 0) { // atm businesses not allowed here
            this.$navigateBack()
          }
          this.getCodes()
        })
    },
    getCodes() {
      api.getCodes()
        .then((codes) => {
          this.codes = codes
        })
        .finally(() => {
          this.loaded = true
        })
    },
    showQr(codeObj) {
      this.$showModal(PromoQr, {
        animated: true,
        transition: {
          name: 'fade'
        },
        props: {
          obj: codeObj
        }
      }).then(this.getCodes)
    },
    getStatus(codeStatus) {
      if (codeStatus === 'banned') return 'Banned'
      if (codeStatus === 'used') return 'Used'
      return ''
    },
    gotoNews() {
      EventBus.$emit('goToScreen', 0)
    }
  }
}
</script>