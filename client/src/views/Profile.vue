<template>
  <main class='Profile'>
    <v-container>
      <div class="user-name-panel" v-if="currentUser">
        <div class="avatar-container">
          <img v-if="currentUser.avatar" class="avatar" :src="`http://localhost:3000/${currentUser.avatar.path}`">
          <img v-if="!currentUser.avatar" class="avatar" src="../assets/avatar.png">
          <div class="overlay" @click="toggleChangeAvatarModal()">
            <v-icon>fa fa-edit</v-icon>
          </div>
        </div>
        <h1>{{ currentUser.name }}</h1>
      </div>
    </v-container>
    <ChangeAvatarModal/>
    <ProfileImages />
  </main >
</template>

<script>
import ChangeAvatarModal from '@/components/ChangeAvatarModal'
import ProfileImages from '@/components/ProfileImages'
import { mapGetters, mapMutations } from 'vuex'

export default {

  name: 'Profile',

  data() {
    return {
      file: null,
      showChangeAvatarModal: false
    }
  },

  components: { ChangeAvatarModal, ProfileImages },

  computed: mapGetters(['currentUser', 'changeAvatarModal']),

  methods: {

    ...mapMutations(['toggleChangeAvatarModal']),

    getBinary(buffer) { return Buffer.from(buffer).toString("base64") }

  },

}
</script>

<style lang="scss">

.Profile {

  .user-name-panel {
    display: flex;
    align-items: center;
    margin-top: 50px;

    h1 {
      color: $text;
      font-size: 2rem;
      letter-spacing: 2px;
      font-weight: 400;
    }

    .avatar-container {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      position: relative;

      .avatar {
        max-width: 100%;
      }

      .overlay {
        opacity: 0;
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #0005;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        transition: .3s;

        i {
          color: #FFF;
          font-size: 28px;
        }
      }

      &:hover .overlay {
        opacity: 1;
      }
    }
  }
}

</style>