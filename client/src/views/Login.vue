<template>
  <main class="Login">
    <v-card class="login-card">
      <h1 class="primary--text">Login</h1>
      <v-form autocomplete="off" @submit.prevent="login">
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field 
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <p class="pink--text text-center" v-if="feedback">{{ feedback }}</p>
        <v-btn color="primary" type="submit" :loading='loading'>Login</v-btn>
      </v-form>
    </v-card>
  </main>
</template>

<script>
import authApi from '../API/Auth'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      feedback: null
    }
  },

  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions(['getCurrentUser']),
    login() {
      this.loading = true
      this.feedback = null

      // Login method
      authApi.login(this.email, this.password)
        .then(response => {

          // If user is not found
          if(response.data.error) {
            console.log(response.data.error)
            this.loading = false
            this.feedback = response.data.error
            return false
          }

          // If user was found
          localStorage.setItem('token', response.data.token)
          this.getCurrentUser(response.data.token)
          this.$router.push({ name: 'Home' })
          this.showSnackbar('You have logged in successfully!')
          this.loading = false
        })
        .catch(e => {
          console.log(e.message)
          this.loading = false
          this.feedback = 'You must provide correct Email & Password'
        })
    }
  },
}

</script>

<style lang="scss">
  .login-card {
    width: 400px !important; 
    padding: 80px 40px;
    margin: 70px auto 0;

    h1 {
      margin: 0 0 30px;
    }

    .v-text-field {
      margin: 50px 0 !important;
    }
  }
</style>
