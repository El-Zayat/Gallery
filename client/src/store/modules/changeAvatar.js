const state = {
  changeAvatarModal: false
}

const getters = {
  changeAvatarModal: state => state.changeAvatarModal
}

const actions = {}

const mutations = {
  toggleChangeAvatarModal: state => state.changeAvatarModal = !state.changeAvatarModal
}

export default {
  state,
  getters,
  actions,
  mutations
}