<template>
  <v-app-bar dark class="primary Navbar">
    <v-toolbar-title>Gallery</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-list class="list">

      <v-list-item router :to="{ name: 'Home' }" >
        <v-icon> fa fa-home </v-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item router :to="{ name: 'Profile' }" v-if="currentUser">
        <v-icon> fa fa-user </v-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>

      <v-list-item router :to="{ name: 'Login' }" v-if="!currentUser">
        <v-icon> fa fa-sign-in </v-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>

      <v-list-item router :to="{ name: 'Register' }" v-if="!currentUser">
        <v-icon> fa fa-user-plus </v-icon>
        <v-list-item-title>Register</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logoutMethod()" v-if="currentUser">
        <v-icon> fa fa-sign-out </v-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

  computed: mapGetters(['currentUser']),

  methods: {

    ...mapMutations(['setCurrentUser', 'showSnackbar']),

    logoutMethod() {
      localStorage.removeItem('token')
      this.setCurrentUser(null)
      this.showSnackbar('You have logged out successfully!')
      if(this.$route.name !== 'Home') this.$router.push({ name: 'Home' })
    },

  },
}
</script>

<style lang="scss">
.Navbar {
  padding: 0 70px;

  .v-toolbar__title {
    font: 500 2rem Roboto;
  }

  .list {
    display: flex;
    background: transparent !important;

    .v-list-item {
      margin: 0 20px;

      .v-icon {
        margin-right: 10px;
      }
    }


    .v-list-item--active::before {
      display: none
    }
  }
}
</style>