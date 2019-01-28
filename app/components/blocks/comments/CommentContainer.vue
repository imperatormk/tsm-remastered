<template>
  <FlexboxLayout flexDirection="column">
    <FlexboxLayout flexDirection="row" paddingBottom="5">
      <TextField hint="Enter your comment..." 
        v-model="comment" 
        secure="false"
        returnKeyType="done"
        fontSize="15"
        autocorrect="false"
        style="padding-left:15;margin:0px;border-width:3px;border-right-width:0px;border-color:#e5e5e5"
        class="input input-border"
        flexGrow="9"></TextField>
      <Button flexGrow="1" @tap="postComment" style="border-width: 1;border-color:#e5e5e5;margin:0px;color:#8c8c8c;" class="fas" fontSize="20" :text="'\uf1d8'"/>
    </FlexboxLayout>
    <StackLayout :verticalAlignment="loaded && comments.length ? 'top' : 'center'" :height="loaded && comments.length ? 'auto' : '100%'">
      <LoadingIndicator v-if="!loaded"/>
      <ScrollView v-else-if="loaded && comments.length" height="98%">
        <GridLayout class="m-10" :rows="getAutoCount" v-if="comments.length">
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
    postComment: async function() {
      if (this.hasLoggedInUser) {
        const comment = this.comment.trim()
        const currentUser = await this.getUserData(this.getCurrentUser.uid)

        if (comment && currentUser.providerData) {
          const reqObj = {
            action: 'insert',
            user: currentUser.providerData,
            commContent: comment,
            mediaId: this.mediaItem.mediaId
          }

          const apiUrl = 'https://thatsmontreal.ca/api/persistComment.php'
          const res = await this.postCommentToApi(reqObj)

          this.comments.unshift(res.resObj)
          this.comment = ''
        }
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          }
        })
      }
    },
    getUserData(uid) {
      const apiUrl = `https://us-central1-thatsmontrealcomments.cloudfunctions.net/getUserById?uid=${uid}`
      return fetch(apiUrl)
        .then(res => res.json())
    },
    postCommentToApi(apiObj) {
      const apiUrl = 'https://thatsmontreal.ca/api/persistComment.php'
      return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(apiObj)
      }).then(res => res.json())
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

