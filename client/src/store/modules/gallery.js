import galleryApi from '@/API/GalleryApi'

const state = {
  images: []
}

const getters = {
  images: state => state.images
}

const actions = {

  async getAllImages({ commit }) {
    let response = await galleryApi.getAllImages()
    commit('setImages', response.data)
  }

}

const mutations = {

  setImages: (state, newImages) => state.images = newImages,
  addImage: (state, image) => state.images.unshift(image)

}

export default {
  state,
  getters,
  actions,
  mutations
}