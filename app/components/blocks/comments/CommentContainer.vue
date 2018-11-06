<template>
  <StackLayout>
    <FlexboxLayout flexDirection="row">
      <TextField hint="Enter your comment..." 
        :text="comment" 
        secure="false"
        returnKeyType="done" 
        @returnPress="onReturnPress($event)"
        autocorrect="false"
        @focus="onFocus($event)" 
        @blur="onBlur($event)" 
        style="padding-left: 15;margin:0px;border-width:3px;border-right-width:0px;"
        class="input input-border"
        flexGrow="9"></TextField>
      <Button flexGrow="1" @tap="postComment" style="border-width: 1;margin:0px;color:black;" text="Post"/>
    </FlexboxLayout>
    <StackLayout marginTop="7">
      <CommentItem v-for="commentItem in comments" :key="commentItem.commId" :commentItem="commentItem" />
    </StackLayout>
  </StackLayout>
</template>

<script>
import CommentItem from '@/components/blocks/comments/CommentItem'

export default {
  props: {
    mediaItem: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getComments()
  },
  data() {
    return {
      comment: '',
      comments: []
    }
  },
  methods: {
    getComments() {
      const apiUrl = `https://thatsmontreal.ca/api/getComments.php?mediaId=${this.mediaItem.mediaId}`
      fetch(apiUrl)
        .then(comments => comments.json())
        .then((comments) => {
          this.comments = comments
        })
    },
    postComment() {

    },
    onReturnPress(e) {

    },
    onFocus(e) {

    },
    onBlur(e) {

    }
  },
  components: {
    CommentItem
  }
}
</script>

