<template>
  <main class="Gallery">
    <div class="images-container" v-viewer>
      <div class="image-container" v-for="image in images" :key="image._id">
        <v-container class="pa-0">
          <img :src='"http://localhost:3000/" + image.path'>
            <div class="like">
              <v-btn icon v-if="checkLiked(image.likes)" @click="likeImage(image._id)" color="pink">
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn icon v-if="!checkLiked(image.likes)" @click="likeImage(image._id)" color="pink">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <span class="counter">{{ image.likes.length }}</span>
            </div>
        </v-container>
      </div>
    </div>
  </main>
</template>

<script>

// Import & Use v-viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

// Import Grid Animator
import { wrapGrid } from 'animate-css-grid'

// Import Store Data & Actions 
import { mapGetters, mapActions } from 'vuex'

// Import jquery
import $ from 'jquery'


export default {

  computed: mapGetters(['images', 'currentUser']),

  methods: {

    ...mapActions(['getAllImages', 'likeImage']),

    // Get binary image
    getBinary(buffer) {
      return Buffer.from(buffer).toString("base64")
    },

    // Set grid animator
    setGridAnimator() {
      let grid = document.querySelector('.images-container')
      wrapGrid(grid, { duration : 500 })
    },

    // Check user likes this image or not
    checkLiked(likes) {
      return likes.every(like => like.user !== this.currentUser?._id)
    }
  },

  async created() {
    await this.getAllImages()
  },

  mounted() {
    this.setGridAnimator()

  },

}

</script>

<style lang="scss">
.Gallery {
  .images-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 20px 150px;
    margin: 50px auto;
    gap: 5px;

    .image-container {
      animation: fadeIn .3s ease-in-out;
      display: grid;

      .container {
        position: relative;
      }

      img {
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: auto;
        user-select: none;
        box-shadow: 1px 1px 10px 3px #0002;
        border-radius: 3px;
        transition: .3s;
        position: relative;
        cursor: pointer;
      }

      .like {
        margin: auto;
        display: flex;
        justify-content: center;
        margin-top: 5px;

        .pink {
          cursor: pointer;
        }

        .counter {
          margin-left: 2px;
          margin-top: 5px;
          font-weight: 500;
          font-size: 1.0rem;
          color: #333;
        }
      }
    }
  }
}

@keyframes fadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}
</style>