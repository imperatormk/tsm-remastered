<template>
  <FlexboxLayout flexDirection="column">
    <FlexboxLayout flexDirection="row" paddingBottom="5">
      <TextField hint="Enter your comment..." 
        v-model="comment" 
        :editable="!commenting"
        secure="false"
        returnKeyType="done"
        fontSize="15"
        autocorrect="false"
        style="padding-left:15;margin:0px;border-width:3px;border-right-width:0px;border-color:#e5e5e5"
        class="input input-border"
        flexGrow="9"></TextField>
      <LoadingWrapper :loading="commenting">
        <Button flexGrow="1" @tap="postComment" style="border-width: 1;border-color:#e5e5e5;margin:0px;color:#8c8c8c;" class="fas" fontSize="20" :text="commenting ? '\uf110' : '\uf1d8'"/>
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
        })
        .finally(() => {
          this.loaded = true
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
    }
  },
  components: {
    CommentItem,
    LoadingIndicator,
    LoadingWrapper
  }
}
</script>

