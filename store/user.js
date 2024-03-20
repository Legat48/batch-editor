import EventBus from '~/helpers/event-bus.js'
import { apiUrl } from '~/api/'

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
  loading: false,
  user: null,
  // user: {
  //   access_levels: [
  //     'READ',
  //     'READWRITE'
  //   ]
  // },
  axiosId: 1,
  dialogOpen: false,
  dialogObg: dialogStock,
  matTypes: [], // Каталог типов материалов
  units: [], // каталог агрегатов
  unitGroup: [], // Каталог групп агрегатов
  batches: [], // Список партий
  unitBatches: [], // Список наличия партий на агрегатах
  materials: [], // Список материалов
  unitMaterials: [], // Список наличия материалов на группе агрегатов
  optionsUsage: [{ id: 0, name: 'Не создана' }, { id: 1, name: 'создана' }],
  optionsStatus: [{ id: 0, name: 'Все', text: null }, { id: 1, name: 'создана', text: 'I' }, { id: 2, name: 'Израсходована', text: 'C' }, { id: 3, name: 'Отменена', text: 'F' }],
  switchStatus: 0,
  selectedUnits: 0, // выбранный агрегат
  selectedMatTypes: 2, // выбранный тип материала
  selectedUnitMaterials: 0, // выбранная группа агрегатов для материала
  selectedUsage: 1, // признак использования
  selectedStatus: 1, // статус партии
  elemBatch: 1, // Список хим. составов партий
  elem_material: 1, // Список хим. составов материалов
  batchUsageUnits: 1 // статус партии
})

export const getters = {
  getLoading: state => state.loading,
  getSwitch: state => state.switchStatus,
  getDialogObg: state => state.dialogObg,
  getDialogOpen: state => state.dialogOpen,
  getSelectedUnits: state => state.selectedUnits,
  getSelectedMatTypes: state => state.selectedMatTypes,
  getSelectedUsage: state => state.selectedUsage,
  getSelectedStatus: state => state.selectedStatus,
  getSelectedUnitMaterials: state => state.selectedUnitMaterials,
  getOptionsUnits: state => state.units,
  getOptionsMatType: state => state.matTypes,
  getOptionsUsage: state => state.optionsUsage,
  getOptionsStatus: state => state.optionsStatus,
  getUser: state => state.user,
  getMatTypes: state => state.matTypes,
  getUnits: state => state.units,
  getUnitGroup: state => state.unitGroup,
  getBatches: state => state.batches,
  getUnitBatches: state => state.unitBatches,
  getMaterials: state => state.materials,
  getUnitMaterials: state => state.unitMaterials,
  getFilterBatches: (state) => {
    let data = state.batches
    if (state.selectedUnits !== 0) {
      data = data.filter(e => e.unit_id === state.selectedUnits)
    }
    if (state.selectedStatus !== 0) {
      data = data.filter(e => e.status === state.optionsStatus.find(item => item.id === state.selectedStatus).text)
    }
    if (state.selectedMatTypes !== 0) {
      data = data.filter(e => e.type_id === state.selectedMatTypes)
    }
    return data
  },
  getFilterMaterials: (state) => {
    let data = state.materials
    data = data.filter(e => e.usage_tag === state.selectedUsage)
    if (state.selectedMatTypes !== 0) {
      data = data.filter(e => e.type_id === state.selectedMatTypes)
    }
    if (state.selectedUnitMaterials !== 0) {
      data = data.filter(e => e.unit_group_id && e.unit_group_id === state.selectedUnitMaterials)
    }
    return data
  },
  userEditor: (state) => {
    return state.user && state.user.access_levels && state.user.access_levels.find(e => e === 'READWRITE')
  }
}

export const mutations = {
  initializeStore (state) {
    if (localStorage.getItem('user')) {
      state.user = JSON.parse(localStorage.getItem('user'))
      if (state.token) {
        this.$axios.defaults.headers.common.Authorization = state.token
      }
    } else {
      delete this.$axios.defaults.headers.common.Authorization
    }
  },
  closeDialog (state) {
    state.dialogOpen = false
  },
  setDialog (state, data) {
    if (state.user && state.user.access_levels.find(e => e === 'READWRITE')) {
      state.dialogObg = data
      state.dialogOpen = true
      EventBus.$emit('dialogOpen')
    }
  },
  setAxiosId (state) {
    state.axiosId++
  },
  setLoading (state, value) {
    state.loading = value
  },
  updateSelectedUnits: (state, value) => {
    state.selectedUnits = value
  },
  updateSelectedMatType: (state, value) => {
    state.selectedMatTypes = value
  },
  updateSelectedUsage: (state, value) => {
    state.selectedUsage = value
  },
  updateSelectedStatus: (state, value) => {
    state.selectedStatus = value
  },
  setSwitch: (state, value) => {
    state.switchStatus = value
  },
  setOptionsStatus: (state, value) => {
    state.optionsStatus = value
  },
  setUser: (state, data) => {
    state.user = data
    if (data && data.auth_token) {
      state.token = data.auth_token
    } else {
      state.token = ''
    }
  },
  setMatTypes: (state, data) => {
    const newDataArr = []
    for (const item of data) {
      const newItem = {
        id: item.type_id,
        name: item.type_name,
        type_id: item.type_id,
        type_name: item.type_name
      }
      newDataArr.push(newItem)
    }
    state.matTypes = newDataArr
  },
  setUnits: (state, data) => {
    const newDataArr = []

    for (const item of data) {
      const newItem = {
        id: item.unit_id,
        name: item.unit_name,
        batchId: item.batch_id
      }
      newDataArr.push(newItem)
    }
    state.units = newDataArr
  },
  setUnitGroup: (state, data) => {
    state.unitGroup = data
  },
  setBatches: (state, data) => {
    state.batches = data
  },
  setUnitBatches: (state, data) => {
    state.unitBatches = data
  },
  setMaterials: (state, data) => {
    state.materials = data
  },
  setUnitMaterials: (state, data) => {
    state.unitMaterials = data.map((e) => {
      const data = e
      if (e.unit_group_id) {
        data.id = e.unit_group_id
        data.name = e.unit_group_name
      }
      return data
    })
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchLogin ({ commit, getters, state }, data) {
    commit('setAxiosId')
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getAuth',
        id: state.axiosId,
        params: {
          user: data.user,
          pw: data.pw
        }
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()

      if (responseData.result && responseData.result.auth_token) {
        commit('setUser', { ...responseData.result, userName: data.user })
        localStorage.setItem('user', JSON.stringify({ ...responseData.result, userName: data.user }))
        return true
      } else {
        console.error(responseData)
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchUnlogin ({ commit, getters, state }, data) {
    commit('setAxiosId')
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${state.token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'deAuth',
        id: state.axiosId
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()

      if (responseData.result) {
        return true
      } else {
        console.error(responseData)
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
