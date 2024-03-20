import EventBus from '~/helpers/event-bus.js'
const dialogStock = {
  title: 'Добавить',
  icon: 'add',
  type: 'batch',
  id: '',
  copyID: '',
  token: 'token',
  obgUnit: {}
}

export const state = () => ({
  dialogOpen: false,
  dialogObg: dialogStock
})

export const getters = {
  getDialogObg: state => state.dialogObg,
  getDialogOpen: state => state.dialogOpen
}

export const mutations = {
  closeDialog (state) {
    state.dialogOpen = false
  },
  SET_DIALOG (state, data) {
    state.dialogObg = data
    state.dialogOpen = true
  }
}

export const actions = {
  setDialog ({ commit, rootState }, data) {
    if (
      rootState.user &&
      rootState.user.access_levels &&
      rootState.user.access_levels.find(e => e === 'READWRITE')
    ) {
      commit('SET_DIALOG', data)
      EventBus.$emit('dialogOpen')
    }
  }
}
