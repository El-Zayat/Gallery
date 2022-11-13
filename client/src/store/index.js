import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './modules/currentUser'
import gallery from './modules/gallery'
import snackbar from './modules/snackbar'
import changeAvatar from './modules/changeAvatar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentUser,
    gallery,
    snackbar,
    changeAvatar,
  }
})
