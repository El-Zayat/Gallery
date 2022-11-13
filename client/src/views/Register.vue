<template>
  <main class="Register">
    <v-card class="register-card">
      <h1 class="primary--text">Register</h1>
      <v-form autocomplete="off" @submit.prevent="register">
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="email" label="Email" type="email"></v-text-field>
        <v-text-field 
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn color="primary" type="submit" :loading='loading'>Register</v-btn>
      </v-form>
    </v-card>
  </main>
</template>

<script>
import authApi from '../API/Auth'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Register',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      loading: false
    }
  },

  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions(['getCurrentUser']),
    register() {
      this.loading = true
      authApi.register(this.email, this.password, this.name)
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.getCurrentUser(response.data.token)
          this.showSnackbar('You have created an account successfully!')
          this.loading = false
          this.$router.push({ name: 'Home' })
        })
    }
  },
}

</script>

<style>
  .register-card {
    width: 400px !important; 
    padding: 80px 40px;
    margin: 70px auto 0;

  }
  h1 {
    margin: 0 0 30px;
  }

  .v-text-field {
    margin: 50px 0 !important;
  }
</style>
