const state = {
  snackbar: false,
  snackbarContent: null
}

const getters = {
  snackbar: state => state.snackbar,
  snackbarContent: state => state.snackbarContent
}

const actions = {}

const mutations = {
  showSnackbar(state, content) {
    state.snackbarContent = content
    state.snackbar = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
