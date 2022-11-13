<template>
  <main class="AddImage">
    <v-form class="d-flex" @submit.prevent="uploadImage">
      <v-file-input show-size v-model="file" name="image" label="Choose a photo"></v-file-input>
      <v-btn :loading="loading" color="primary" type="submit">Upload</v-btn>
    </v-form>
    <p class="red--text text-center" v-if="this.feedback">{{ this.feedback }}</p>
  </main>
</template>

<script>
import galleryApi from '../API/GalleryApi'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      file: null,
      loading: false,
      feedback: null
    }
  },

  computed: mapGetters(['currentUser']),

  methods: {

    ...mapMutations(['addImage', 'showSnackbar']),

    uploadImage() {

      if(this.file) {
        
        if(this.currentUser) {
  
          this.loading = true
          this.feedback = null
          let formData = new FormData()
          formData.append('image', this.file)
    
          galleryApi.uploadImage(formData, this.currentUser._id)
            .then(res => {
              console.log(res.data)
              if(res.data.error) {
                this.loading = false
                this.feedback = res.data.error
                return false
              }
              this.addImage(res.data)
              this.showSnackbar('Image uploaded succesfully!')
              this.file = null
              this.loading = false
            })
            .catch(err => {
              this.showSnackbar('Image upload failed!')
              console.log(err.message)
              this.loading = false
            })
  
        } else this.feedback = 'You must login before uploading an image!'

      } else this.feedback = 'You must choose an image!'

    },

  },
}
</script>

<style lang="scss">
.AddImage {

  .v-form {
    max-width: 500px;
    margin: 30px auto;
    align-items: center;

    .v-btn {
      margin-left: 30px;
    }
  }
}
</style>