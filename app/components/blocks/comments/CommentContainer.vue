<template>
  <FlexboxLayout flexDirection="column" backgroundColor="white" borderRadius="25">
    <FlexboxLayout flexDirection="row" paddingBottom="5">
      <TextField hint="Enter your comment..." 
        v-model="comment" 
        :editable="!commenting"
        secure="false"
        returnKeyType="done"
        fontSize="15"
        autocorrect="false"
        paddingLeft="15"
        margin="0"
        borderColor="#e5e5e5"
        style="border-bottom-width:3px;"
        class="input input-border"
        flexGrow="9"></TextField>
      <LoadingWrapper :loading="commenting">
        <Button margin="0" color="#8c8c8c" borderColor="#e5e5e5" flexGrow="1" @tap="postComment" style="border-bottom-width:1; z-index: 0;" class="fa" :text="commentingIcon | fonticon" fontSize="20"/>
      </LoadingWrapper>
    </FlexboxLayout>
    <StackLayout :verticalAlignment="loaded && comments.length ? 'top' : 'center'" :height="loaded && comments.length ? 'auto' : '100%'">
      <LoadingIndicator v-if="!loaded"/>
      <ScrollView v-else-if="loaded && comments.length" height="98%">
        <GridLayout class="m-10" :rows="getAutoCount" v-if="comments.length">
          <CommentItem v-for="(commentItem, idx) in comments" :key="commentItem.id" :commentItem="commentItem" :row="idx"/>
        </GridLayout>
      </ScrollView>
      <Label v-else textAlignment="center" fontSize="20" text="Be the first one to comment!" color="#8c8c8c"/>
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import api from '@/services/api'
import CommentItem from '@/components/blocks/comments/CommentItem'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import LoadingWrapper from '@/components/common/LoadingWrapper'
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
      loaded: false,
      commenting: false
    }
  },
  methods: {
    getComments() {
      this.loaded = false
      api.getComments(this.mediaItem.id)
        .then((comments) => {
          this.comments = comments
          this.loaded = true
        })
        .catch(() => {
          this.$emit('error')
        })
    },
    postComment() {
      if (this.hasLoggedInUser) {
        const commentContent =  this.comment.trim()

        if (commentContent) {
          this.commenting = true
          const reqComment = { content: commentContent }
          api.postComment(this.mediaItem.id, reqComment)
            .then((resComment) => {
              this.comments.unshift(resComment)
              this.comment = ''
            })
            .finally(() => {
              this.commenting = false
            })
        }
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          },
          props: {
            stay: true
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
    },
    commentingIcon() {
      return this.commenting ? '\uf110' : '\uf1d8'
    }
  },
  components: {
    CommentItem,
    LoadingIndicator,
    LoadingWrapper
  }
}
</script>

