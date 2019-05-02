<template>
  <StackLayout>
    <GridLayout rows="auto" columns="* auto * auto *" margin="10" width="100%">
      <StackLayout padding="5" horizontalAlignment="center" col="0" @tap="shareMedia">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
          <Label textAlignment="center" class="fas" :text="'\uf064'" color="#8c8c8c" fontSize="23"/>
          <Label textAlignment="center" text="Share" color="#8c8c8c"/>
        </StackLayout>
      </StackLayout>
      <StackLayout backgroundColor="#c2c2c2" width="1" col="1"></StackLayout>
      <StackLayout padding="5" horizontalAlignment="center" col="2" @tap="getFreeGift">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
          <Label textAlignment="center" class="fas" :text="'\uf06b'" color="#8c8c8c" fontSize="23"/>
          <Label textAlignment="center" text="Free gift" color="#8c8c8c"/>
        </StackLayout>
      </StackLayout>
      <StackLayout backgroundColor="#c2c2c2" width="1" col="3"></StackLayout>
      <StackLayout padding="5" horizontalAlignment="center" col="4" @tap="openComments">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
          <Label textAlignment="center" class="fas" :text="'\uf086'" color="#8c8c8c" fontSize="23"/>
          <Label textAlignment="center" text="Comments" color="#8c8c8c"/>
        </StackLayout>
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
import LoginModal from '@/components/views/LoginModal'
import CommentsModal from '@/components/views/CommentsModal'
import * as SocialShare from "nativescript-social-share"

export default {
  props: {
    mediaItem: Object
  },
  methods: {
    shareMedia() {
      const mediaItem = this.mediaItem
      if (mediaItem) {
        SocialShare.shareUrl(`https://www.youtube.com/watch?v=${mediaItem.url}`, mediaItem.desc)
      }
    },
    openComments() {
      const mediaItem = this.mediaItem
      if (mediaItem) {
        this.$showModal(CommentsModal, {
          animated: true,
          fullscreen: true,
          transition: {
            name: 'slideBottom'
          },
          props: {
            mediaItem
          }
        })
      }
    },
    getFreeGift() {
      if (this.hasLoggedInUser) {
        const mediaId = this.mediaItem.id
        const reqObj = {
          mediaId,
          user: {
            email: 'darko.simonovski@hotmail.com' // TODO: tempp
          }
        }

        const apiUrl = 'https://thatsmontreal.ca/api/reqPromo.php'
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(reqObj)
        })
          .then((res) => {
            console.log(res) // TODO: show a popup maybe
          })
      } else {
        this.$showModal(LoginModal, {
          animated: true,
          transition: {
            name: 'fade'
          }
        })
      }
    }
  }
}
</script>
