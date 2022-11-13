<template>
  <v-main>
    <v-dialog v-model="changeAvatarModal" persistent width="800">
      <v-card class="modal-card">
        <v-icon class="close" @click="toggleChangeAvatarModal()">fa fa-close</v-icon>
        <v-card-title>Upload your avatar</v-card-title>
        <v-file-input
          class="avatar-input"
          v-model="file"
          label="Choose your avatar"
        ></v-file-input>
        <div class="img-container" v-if="avatarSrc">
          <vue-cropper
            ref="cropper"
            :src="avatarSrc"
            :aspectRatio="1 / 1"
            :modal="true"
            :guides="false"
            :movable="false"
            :rotatable="false"
            :scalable="false"
            :zoomable="false"
            :minCropBoxWidth="100"
          >
          </vue-cropper>
        </div>
        <v-card-actions>
          <v-btn
            class="success"
            :loading="saveBtnLoad"
            @click="saveAvatar()"
            :disabled="file ? false : true"
            >Save</v-btn
          >
          <v-btn dark class="primary" @click="resetAvatar()" :loading="resetBtnLoad">Reset</v-btn>
          <v-btn dark color="pink" @click="toggleChangeAvatarModal()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import profileApi from "../API/Profile";

export default {
  data() {
    return {
      file: null,
      avatarSrc: null,
      saveBtnLoad: false,
      resetBtnLoad: false,
    };
  },

  computed: mapGetters(["changeAvatarModal", "currentUser"]),

  components: { VueCropper },

  methods: {
    ...mapMutations(["toggleChangeAvatarModal"]),
    ...mapActions(["getCurrentUser"]),

    // Save the avatar to the user method
    saveAvatar() {
      this.saveBtnLoad = true;
      let cropped = this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        let formData = new FormData();
        formData.append("avatar", blob);
        profileApi.uploadAvatar(this.currentUser._id, formData)
          .then(res => {
            console.log(res)
            this.saveBtnLoad = false
            this.toggleChangeAvatarModal()
            this.getCurrentUser(localStorage.getItem("token"))
            this.file = null
            this.avatarSrc = null
          })
          .catch((e) => {
            console.log(e)  
            this.saveBtnLoad = false;
          })
          
      })
    },

    resetAvatar() {
      this.resetBtnLoad = true

      profileApi.uploadAvatar(this.currentUser._id, null)
        .then(() => {
          this.resetBtnLoad = false
          this.getCurrentUser(localStorage.getItem("token"))
          this.toggleChangeAvatarModal()
          this.file = null;
        })
        .catch((e) => {
          console.log(e)  
          this.resetBtnLoad = false
        })
    },
  },

  watch: {

    file: {
      handler(val) {
        if (!val) return 
        this.avatarSrc = null
        let validEnds = ['.png', '.jpg', 'jpeg']
        let isImage = validEnds.includes(val.name.slice(-4))
        if (!isImage) {
          this.file = null
          console.log(this.file)
          return
        }
        let reader = new FileReader();
        reader.onload = () => (this.avatarSrc = reader.result);
        reader.readAsDataURL(val);
      },
    }
  },

};
</script>

<style lang="scss">
.modal-card {
  padding: 30px;
  position: relative;

  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: crimson;
    }
  }

  .v-card__title {
    text-align: center;
    display: block;
    margin: 30px auto;
    font-size: 30px !important;
    color: #444;
  }

  .avatar-input {
    max-width: 500px;
    margin: 20px auto;
  }

  .img-container {
    margin: 50px auto;
    max-width: 500px;
    @include centerContent();

    img {
      max-width: 100%;
      display: block;
    }
  }

  .v-card__actions {
    @include centerContent();
    width: 500px;
    margin: 20px auto;

    .v-btn {
      width: 100px;
      margin: 0 10px;
    }
  }
}
</style>
