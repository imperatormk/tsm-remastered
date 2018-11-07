<template>
  <StackLayout>
    <FlexboxLayout flexDirection="row">
      <TextField hint="Enter your comment..." 
        v-model="comment" 
        secure="false"
        returnKeyType="done" 
        autocorrect="false"
        style="padding-left: 15;margin:0px;border-width:3px;border-right-width:0px;"
        class="input input-border"
        flexGrow="9"></TextField>
      <Button flexGrow="1" @tap="postComment" style="border-width: 1;margin:0px;color:black;" text="Post"/>
    </FlexboxLayout>
    <StackLayout>
      <ScrollView marginTop="7" height="98%">
        <GridLayout class="m-15" :rows="getAutoCount">
          <CommentItem v-for="(commentItem, idx) in comments" :key="commentItem.commId" :commentItem="commentItem" :row="idx"/>
        </GridLayout>
      </ScrollView>
    </StackLayout>
  </StackLayout>
</template>

<script>
import CommentItem from '@/components/blocks/comments/CommentItem'
import LoginModal from '@/components/views/LoginModal'

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
      if (this.hasLoggedInUser) {
        const comment = this.comment.trim()
        const currentUser = this.getCurrentUser

        if (comment) {
          const reqObj = {
            action: 'insert',
            user: {
              0: {
                uid: currentUser.uid,
                photoURL: currentUser.profileImageURL,
                displayName: 'Test Name', // temp
                providerId: currentUser.additionalUserInfo ? currentUser.additionalUserInfo.providerId : null,
              }
            },
            commContent: comment,
            mediaId: this.mediaItem.mediaId,
          }

          const apiUrl = 'https://thatsmontreal.ca/api/persistComment.php'
          fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(reqObj)
          })
            .then((res) => {
              this.comment = ''
              this.getComments()
            })
        }
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          }
        })
      }
    }
  },
  computed: {
    hasLoggedInUser() {
      return this.$store.getters.hasLoggedInUser
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    },
    getAutoCount() {
      let str = ''
      this.comments.forEach(() => [
        str = `${str} auto`
      ])
      return str.trim()
    }
  },
  components: {
    CommentItem
  }
}
</script>

