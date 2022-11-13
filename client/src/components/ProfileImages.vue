<template>
  <main class="ProfileImages">
    <h1>Your Images</h1>
    <v-container class="images-container">
      <div class="image-container" v-for="image in userImages" :key="image._id">
        <img :src="`http://localhost:3000/${image.path}`" @load="adjustOverlay($event)">
        <div class="overlay">
          <v-icon @click="deleteImage(image._id)">fa fa-trash</v-icon>
          <div class="like">
            <v-btn icon v-if="checkLiked(image.likes)" @click="likeImage(image._id)" color="pink">
              <v-icon large>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn icon v-if="!checkLiked(image.likes)" @click="likeImage(image._id)" color="pink">
              <v-icon large>mdi-heart</v-icon>
            </v-btn>
            <span class="counter">{{ image.likes.length }}</span>
          </div>
        </div>
      </div>
    </v-container>
  </main>
</template>

<script>
import $ from 'jquery'
import galleryApi from '@/API/GalleryApi'
import { mapActions, mapGetters } from 'vuex'

// Import Grid Animator
import { wrapGrid } from 'animate-css-grid'

export default {

  data() {
    return {
      images: null,
      feedback: null
    }
  },

  computed: mapGetters(['currentUser', 'userImages']),

  methods: {

    ...mapActions(['getCurrentUserImages', 'likeImage']),

    adjustOverlay(e) {
      let height = e.target.height
      $(e.target).siblings('.overlay').height(height)
    },

    setGridAnimator() {
      let grid = document.querySelector('.images-container')
      wrapGrid(grid, { duration : 500 })
    },

    deleteImage(id) {
      galleryApi.deleteImage(id)
        .then(() => this.getCurrentUserImages(this.currentUser))
        .catch(e => console.log(e))
    },

    // Check user likes this image or not
    checkLiked(likes) {
      return likes.every(like => like.user !== this.currentUser._id)
    }

  },

  mounted() {
    this.getCurrentUserImages()
    if(this.currentUser) this.getCurrentUserImages()
  },
  
}
</script>

<style lang="scss">

.ProfileImages {

  h1 {
    color: $text;
    text-align: center;
    margin: 50px auto;
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    max-width: 90%;


    .image-container {
      position: relative;
      margin: 20px auto;
      max-width: 200px;

      img {
        max-width: 100%;
      }

      .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba($color: #000000, $alpha: .4);
        transition: .3s;
        opacity: 0;

        &:hover {
          opacity: 1;
        }

        .like {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          .counter {
            margin-left: 5px;
            font-size: 1.3rem;
            font-weight: 500;
            color: #FFF;
          }
        }

        .v-icon.fa-trash {
          color: #888;
          position: absolute;
          bottom: 10px;
          left: 10px;
          transition: .3s;
          cursor: pointer;

          &:hover {
            color: crimson;
          }
        }
      }
    }
  }
}


</style>