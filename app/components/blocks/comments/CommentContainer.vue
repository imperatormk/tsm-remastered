<template>
  <FlexboxLayout flexDirection="column">
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
    <StackLayout :verticalAlignment="loaded && comments.length ? 'top' : 'center'" :height="loaded && comments.length ? 'auto' : '100%'">
      <LoadingIndicator v-if="!loaded"/>
      <ScrollView v-else-if="loaded && comments.length" marginTop="7" height="98%">
        <GridLayout class="m-15" :rows="getAutoCount" v-if="comments.length">
          <CommentItem v-for="(commentItem, idx) in comments" :key="commentItem.commId" :commentItem="commentItem" :row="idx"/>
        </GridLayout>
      </ScrollView>
      <Label v-else textAlignment="center" fontSize="20" text="Be the first one to comment!" color="#8c8c8c"/>
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import CommentItem from '@/components/blocks/comments/CommentItem'
import LoadingIndicator from '@/components/common/LoadingIndicator'
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
      comments: [],
      loaded: false
    }
  },
  methods: {
    getComments() {
      this.loaded = false
      const apiUrl = `https://thatsmontreal.ca/api/getComments.php?mediaId=${this.mediaItem.mediaId}&count=100`
      fetch(apiUrl)
        .then(comments => comments.json())
        .then((comments) => {
          this.comments = comments
          this.loaded = true
        })
    },
    postComment() {
      if (this.hasLoggedInUser) {
        const comment = this.comment.trim()
        const currentUser = this.getCurrentUser

        if (comment && currentUser.additionalUserInfo) {
          const reqObj = {
            action: 'insert',
            user: {
              0: {
                uid: currentUser.additionalUserInfo.profile.id,
                photoURL: currentUser.profileImageURL,
                displayName: 'Test Name', // tempp
                providerId: currentUser.additionalUserInfo.providerId,
              }
            },
            commContent: comment,
            mediaId: this.mediaItem.mediaId
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
        } else {
          console.error(currentUser.additionalUserInfo)
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
    CommentItem,
    LoadingIndicator
  }
}
</script>

