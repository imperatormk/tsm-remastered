<template>
  <StackLayout>
    <CommentContainer :mediaItem="mediaItem"/>
  </StackLayout>
</template>

<script>
import CommentContainer from '@/components/blocks/comments/CommentContainer'

export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentContainer
  }
}
</script>
