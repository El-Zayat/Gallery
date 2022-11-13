import authApi from '@/API/Auth'
import galleryApi from '@/API/GalleryApi'
import store from '../index'
import router from '../../router'

const state = {
  currentUser: null,
  currentUserImages: null
}

const getters = {
  currentUser: state => state.currentUser,
  userImages: state => state.currentUserImages
}

const actions = {

  async getCurrentUser({ commit }, token) {
    if(token) {
      let response = await authApi.checkAuth(token)
      commit('setCurrentUser', response.data)
    } else commit('setCurrentUser', null)
  },

  async getCurrentUserImages({ commit }) {

    let response = await galleryApi.getUserImages(store.getters.currentUser._id)
    commit('setCurrentImages', response.data)

  },

  async likeImage({ commit }, id) {

    if(store.getters.currentUser) {
      let response = await galleryApi.likeImage(id, store.getters.currentUser._id)
      store.dispatch('getAllImages')
      store.dispatch('getCurrentUserImages')
    } else {
      router.push({ name: 'Login' })
    }

  },

}

const mutations = {
  setCurrentUser: (state, currentUser) => ( state.currentUser = currentUser ),
  setCurrentImages: (state, images) => ( state.currentUserImages = images ),
}

export default {
  state,
  getters,
  actions,
  mutations
}