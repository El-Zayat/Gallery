<template>
  <main>
    <v-snackbar :value="snackbar" class="text-center">{{ snackbarContent }}</v-snackbar>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['snackbar', 'snackbarContent'])
}
</script>

<style lang="scss">
.v-snack__wrapper {
  min-width: 0 !important;
  padding: 0 20px !important;
  background: $primary  !important;
}
</style>