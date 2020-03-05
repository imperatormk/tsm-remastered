<template>
  <StackLayout @swipe="onSwipe" :height="heightWrapper" verticalAlignment="bottom" backgroundColor="rgba(0,0,0,0.5)" width="100%" row="0" col="0">
    <FlexboxLayout v-if="height > 90" width="100%" height="5%" justifyContent="center" alignItems="center">
      <Label class="fas" fontSize="22" :text="'\uf7a4'" color="white"/>
    </FlexboxLayout>
    <StackLayout backgroundColor="white" :height="mainHeight" width="100%">
      <CommentContainer v-if="mediaItem && height > 30" :mediaItem="mediaItem"/>
    </StackLayout>
  </StackLayout>
</template>

<script>
import EventBus from '@/services/event-bus'
import CommentContainer from '@/components/blocks/comments/CommentContainer'

const SwipeDirection = require('tns-core-modules/ui/gestures').SwipeDirection
const TIMEOUT = 1
const STEP = 7

export default {
  created() {
    EventBus.$on('showCommentsForMedia', (mediaItem, cb) => {
      if (mediaItem) {
        this.mediaItem = mediaItem
        this.onCloseCb = cb
        this.show()
      } else {
        this.hide()
      }
    })

    EventBus.$on('onBackButton', (e) => {
      if (!this.displayed) return
      e.cancel = true
      this.hide()
    })
  },
  data: () => ({
    height: 0,
    mediaItem: null,
    onCloseCb: null
  }),
  computed: {
    heightWrapper() {
      return this.height > 90 ? `${this.height}%` : this.mainHeight
    },
    mainHeight() {
      return `${this.height - 5}%`
    },
    displayed() {
      return this.height > 0
    }
  },
  methods: {
    onSwipe(e) {
      const isDown = e.direction === SwipeDirection.down
      if (isDown) this.hide()
    },
    show() {
      if (this.height >= 100) {
        this.height = 100
        return
      }
      this.height += STEP
      setTimeout(() => {
        this.show()
      }, TIMEOUT)
    },
    hide() {
      if (this.height <= 0) {
        this.height = 0
        this.mediaItem = null
        if (this.onCloseCb) {
          this.onCloseCb()
          this.onCloseCb = null
        }
        return
      }
      this.height -= STEP
      setTimeout(() => {
        this.hide()
      }, TIMEOUT)
    }
  },
  components: {
    CommentContainer
  }
}
</script>