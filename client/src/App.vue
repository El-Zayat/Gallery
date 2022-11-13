<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view></router-view>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Snackbar from './components/Snackbar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Navbar, Snackbar },
  computed: mapGetters(['currentUser']),
  methods: mapActions(['getCurrentUser']),
  async created() {
    await this.getCurrentUser(localStorage.getItem('token'))
  },
};
</script>

<style lang="scss">
</style>
