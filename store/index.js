import MaterialApi from '~/api/material'
import BatchApi from '~/api/batch'
// const apiUrl = '/'
import { apiUrl } from '~/api/'
import { checkSomeActive } from '~/helpers/checkSomeActive'

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
  matTypes: [], // Каталог типов материалов
  units: [], // каталог агрегатов
  unitGroup: [], // Каталог групп агрегатов
  unitGroupBatches: {}, // Список наличия партий на группах агрегатов
  unitGroupMaterials: {}, //  Список наличия материалов на группе агрегатов
  elemBatch: {}, // Список хим. составов партий
  elemMaterial: {}, // Список хим. составов материалов
  batchUsageDevice: [], // Список устройств на агрегатах, использующих партию.
  chemElements: {}, // Каталог хим. элементов
  unitsInGroups: [], // Каталог группировки агрегатов
  batches: [], // Список партий
  // unitBatches: [], // Список наличия партий на агрегатах
  materials: [], // Список материалов
  unitMaterials: [], // Список наличия материалов на группе агрегатов
  optionsUsage: [{ id: 0, name: 'Не используется' }, { id: 1, name: 'Используется' }],
  optionsStatus: [{ id: 1, name: 'Создана', text: 'I' },
    { id: 2, name: 'Израсходована', text: 'C' },
    { id: 4, name: 'Назначена', text: 'A' },
    { id: 3, name: 'Отменена', text: 'F' }],
  switchStatus: 0,
  selectedUnits: 0, // выбранный агрегат
  selectedMatTypes: 2, // выбранный тип материала 2 - проволока
  selectedUnitMaterials: 0, // выбранная группа агрегатов для материала
  selectedUsage: 1, // признак использования
  selectedStatus: 1, // статус партии
  batchUsageUnits: 1, //
  batchFilter: '',
  unitGroupFilter: [],
  selectedMatTypeFilter: [{
    active: false,
    id: 1,
    name: 'Сыпучие',
    type_id: 1,
    type_name: 'Сыпучие'
  },
  {
    active: true,
    id: 2,
    name: 'Проволока',
    type_id: 2,
    type_name: 'Проволока'
  },
  {
    active: true,
    id: 3,
    name: 'Газ',
    type_id: 3,
    type_name: 'Газ'
  }
  ],

  selectedStatusGroupFilter: [
    {
      active: true,
      id: 1,
      name: 'Создана',
      text: 'I'
    },
    {
      active: false,
      id: 2,
      name: 'Израсходована',
      text: 'C'
    },
    {
      active: false,
      id: 3,
      name: 'Отменена',
      text: 'F'
    },
    {
      active: true,
      id: 4,
      name: 'Назначена',
      text: 'A'
    }
  ],
  materialFilter: ''
})

export const getters = {
  getLoading: state => state.loading,
  getSwitch: state => state.switchStatus,
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
  getUnitGroupBatches: state => state.unitGroupBatches,
  getUnitGroupMaterials: state => state.unitGroupMaterials,
  getElemBatch: state => state.elemBatch,
  getElemMaterial: state => state.elemMaterial,
  getBatchUsageDevice: state => state.batchUsageDevice,
  getBatchFilter: state => state.batchFilter,
  getMaterialFilter: state => state.materialFilter,
  getUnitGroupFilter: state => state.unitGroupFilter,
  getSelectedMatTypeFilter: state => state.selectedMatTypeFilter,
  getSelectedStatusGroupFilter: state => state.selectedStatusGroupFilter,
  getСhemElements: state => state.chemElements,
  getUnitsInGroups: state => state.unitsInGroups,
  getBatches: state => state.batches,
  // getUnitBatches: state => state.unitBatches,
  getMaterials: state => state.materials,
  getUnitMaterials: state => state.unitMaterials,
  getFilterBatches: (state) => {
    let data = state.batches
    if (state.selectedUnits !== 0) {
      data = data.filter(e => e.unit_id === state.selectedUnits)
    }
    // фильтрация на тип материала
    if (state.selectedMatTypeFilter && state.selectedMatTypeFilter.length > 0 && checkSomeActive(state.selectedMatTypeFilter)) {
      data = data.filter((batch) => {
        // eslint-disable-next-line unicorn/prefer-includes
        return state.selectedMatTypeFilter.some((e) => {
          return batch.type_id === e.id && e.active
        })
      })
    }

    // фильтрация на статус
    if (state.selectedStatusGroupFilter && state.selectedStatusGroupFilter.length > 0 && checkSomeActive(state.selectedStatusGroupFilter)) {
      data = data.filter((batch) => {
        // eslint-disable-next-line unicorn/prefer-includes
        return state.selectedStatusGroupFilter.some((e) => {
          return batch.status === e.text && e.active
        })
      })
    }
    data = data.filter(e => `${e.batch_no}`.toLowerCase().includes(state.batchFilter.toLowerCase()))
    // фильтрация на группу агрегатов
    if (state.unitGroupFilter && state.unitGroupFilter.length > 0) {
      data = data.filter((batch) => {
        if (batch.unitGroupInfo) { // Проверка на undefined
          return batch.unitGroupInfo.some((unitGroup) => {
            return state.unitGroupFilter.some((e) => {
              return e.group_id === unitGroup.group_id
            })
          })
        } else {
          return false
        }
      })
    }
    return data.sort((a, b) => `${a.batch_no}`.localeCompare(`${b.batch_no}`, 'ru-RU', { numeric: true }))
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
    // фильтрация на тип материала
    if (state.selectedMatTypeFilter && state.selectedMatTypeFilter.length > 0) {
      data = data.filter((material) => {
        // eslint-disable-next-line unicorn/prefer-includes
        return state.selectedMatTypeFilter.some((e) => {
          return material.type_id === e.id
        })
      })
    }
    data = data.filter(e => `${e.name}`.toLowerCase().includes(state.materialFilter.toLowerCase()))
    // фильтрация на группу агрегатов
    if (state.unitGroupFilter && state.unitGroupFilter.length > 0) {
      data = data.filter((batch) => {
        if (batch.unitGroupInfo) { // Проверка на undefined
          return batch.unitGroupInfo.some((unitGroup) => {
            return state.unitGroupFilter.some((e) => {
              return e.group_id === unitGroup.group_id
            })
          })
        } else {
          return false
        }
      })
    }
    return data.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`, 'ru-RU', { numeric: true }))
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
    if (data && data.auth_token) {
      state.user = data
      state.token = data.auth_token
    } else {
      state.token = ''
      state.user = {}
      localStorage.removeItem('user')
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
        name: item.unit_name
      }
      newDataArr.push(newItem)
    }
    state.units = newDataArr
  },
  setUnitGroup: (state, data) => {
    state.unitGroup = data.map((e) => {
      return {
        ...e,
        id: e.group_id,
        name: e.group_name
      }
    })
  },
  setUnitGroupBatches: (state, data) => {
    const obg = {}
    data.forEach((e) => {
      if (!obg[`id_${e.batch_create_unitid}${e.batch_id}`]) {
        obg[`id_${e.batch_create_unitid}${e.batch_id}`] = [{
          ...e,
          group_id: e.unit_group_id,
          group_name: e.unit_group_name
        }]
      } else {
        obg[`id_${e.batch_create_unitid}${e.batch_id}`].push({
          ...e,
          group_id: e.unit_group_id,
          group_name: e.unit_group_name
        })
      }
    })
    state.unitGroupBatches = obg
  },
  setUnitGroupMaterials: (state, data) => {
    const obg = {}
    data.forEach((e) => {
      if (!obg[`id_${e.mat_id}`]) {
        obg[`id_${e.mat_id}`] = [{
          ...e,
          group_id: e.unit_group_id,
          group_name: e.unit_group_name
        }]
      } else {
        obg[`id_${e.mat_id}`].push({
          ...e,
          group_id: e.unit_group_id,
          group_name: e.unit_group_name
        })
      }
    })
    state.unitGroupMaterials = obg
  },
  setElemBatch: (state, data) => {
    const obg = {}
    data.forEach((e) => {
      const elem = state.chemElements[`element_${e.element_num}`]
      if (elem) {
        const elemObg = {
          element_num: elem.element_num,
          element_name: elem.element_name,
          element_abbr: elem.element_abbr,
          element_content: e.element_content,
          element_assim: e.element_assim
        }

        if (!obg[`id_${e.batch_create_unitid}${e.batch_id}`]) {
          if (elem) {
            obg[`id_${e.batch_create_unitid}${e.batch_id}`] = [elemObg]
          }
        } else {
          obg[`id_${e.batch_create_unitid}${e.batch_id}`].push(elemObg)
        }
      }
    })
    state.elemBatch = obg
  },
  setElemMaterial: (state, data) => {
    const obg = {}
    data.forEach((e) => {
      const elem = state.chemElements[`element_${e.element_num}`]
      if (elem) {
        const elemObg = {
          element_num: elem.element_num,
          element_name: elem.element_name,
          element_abbr: elem.element_abbr,
          element_content: e.element_content,
          element_assim: e.element_assim
        }
        if (!obg[`id_${e.mat_id}`]) {
          if (elem) {
            obg[`id_${e.mat_id}`] = [elemObg]
          }
        } else {
          obg[`id_${e.mat_id}`].push(elemObg)
        }
      }
    })
    state.elemMaterial = obg
  },
  setBatchUsageDevice: (state, data) => {
    state.batchUsageDevice = data
  },
  setBatches: (state, data) => {
    state.batches = data
  },
  setBatchFilter: (state, data) => {
    state.batchFilter = data
  },
  setMaterialFilter: (state, data) => {
    state.materialFilter = data
  },
  setUnitGroupFilter: (state, data) => {
    state.unitGroupFilter = data
  },
  setSelectedMatTypeFilter: (state, data) => {
    state.selectedMatTypeFilter = data
  },
  setSelectedStatusGroupFilter: (state, data) => {
    state.selectedStatusGroupFilter = data
  },
  setСhemElements: (state, data) => {
    const obg = {}
    data.forEach((e) => {
      obg[`element_${e.element_num}`] = {
        ...e,
        id: e.element_num,
        name: e.element_name
      }
    })
    state.chemElements = obg
  },
  setUnitsInGroups: (state, data) => {
    state.unitsInGroups = data
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
        console.error('fetchLoginError', responseData)
        if (responseData.result && responseData.result.auth_token === null) {
          return 'Не верный логин или пароль'
        }
        return responseData?.error?.message || 'Ошибка авторизации'
      }
    } catch (error) {
      console.error('fetchLogin', error)
      return error || 'Ошибка авторизации'
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
        console.error('fetchUnlogin', responseData)
        return false
      }
    } catch (error) {
      console.error('fetchUnlogin', error)
      return false
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchCatalogs ({ commit, getters, state }, data) {
    commit('setAxiosId')
    const head = {
      jsonrpc: '2.0',

      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getCatalogs',
        id: state.axiosId
      }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${state.token}`
      }
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.result) {
        commit('setMatTypes', responseData.result.mat_types)
        commit('setUnits', responseData.result.units)
        commit('setUnitGroup', responseData.result.unit_groups)
        commit('setСhemElements', responseData.result.chem_elements)
        commit('setUnitsInGroups', responseData.result.units_in_groups)
        // chem_elements
        // units_in_groups
        return true
      } else {
        console.error('fetchCatalogs', responseData)
        return false
      }
    } catch (error) {
      console.error('fetchCatalogs catch', error)
      return false
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchMatBatchList ({ commit, getters, state }, data) {
    commit('setAxiosId')
    const head = {
      jsonrpc: '2.0',
      method: 'post',
      credentials: 'same-origin',
      id: state.axiosId,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${state.token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getMatBatchList',
        id: state.axiosId
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.result) {
        commit('setUnitGroupBatches', responseData.result.unit_group_batches)
        commit('setUnitGroupMaterials', responseData.result.unit_materials)
        commit('setElemBatch', responseData.result.elem_batch)
        commit('setElemMaterial', responseData.result.elem_material)
        commit('setBatchUsageDevice', responseData.result.batch_usage_device)
        responseData.result.materials = responseData.result.materials.map((e) => {
          const data = {
            ...e,
            // заполнение массива хим элементов
            elemInfo: getters.getElemMaterial[`id_${e.id}`] || [],
            unitGroupInfo: getters.getUnitGroupMaterials[`id_${e.id}`]
          }
          const matTipeObg = getters.getMatTypes.find(mat => e.type_id === mat.id)
          if (matTipeObg) {
            data.type_name = matTipeObg.type_name
          }

          const matUnitMaterials = responseData.result.unit_materials.find(mat => e.mat_id === mat.id)
          if (matUnitMaterials) {
            data.unit_group_id = matUnitMaterials.unit_group_id
            data.unit_group_name = matUnitMaterials.unit_group_name
          }
          return data
        })

        responseData.result.batches = responseData.result.batches.map((e) => {
          let typeId = ''
          if (responseData.result.materials && responseData.result.materials.length > 0) {
            typeId = responseData.result.materials.find(mat => mat.id === e.mat_id).type_id
          }

          const unitIdObj = responseData.result.unit_group_batches.find(unit => e.id === unit.batch_id)
          let unitId = ''
          if (unitIdObj) {
            unitId = unitIdObj.unit_group_id
          }

          const unitNameObj = responseData.result.unit_group_batches.find(unit => e.id === unit.batch_id)
          let unitName = ''
          if (unitNameObj) {
            unitName = unitNameObj.unit_group_name
          }

          const matObgObg = responseData.result.materials.find(mat => !!e.mat_id && !!mat.id && e.mat_id === mat.id)

          let matObg = {
            id: 0,
            name: '',
            type_name: ''
          }
          if (matObgObg) {
            matObg = matObgObg
          }
          return {
            ...e,
            elemInfo: getters.getElemBatch[`id_${e.batch_create_unitid}${e.id}`],
            unitGroupInfo: getters.getUnitGroupBatches[`id_${e.batch_create_unitid}${e.id}`],
            type_id: typeId,
            unit_id: unitId,
            unit_name: unitName,
            mat_id: matObg.id,
            mat_name: matObg.name,
            type_name: matObg.type_name
          }
        })
        commit('setBatches', responseData.result.batches)
        commit('setMaterials', responseData.result.materials)
        commit('setUnitMaterials', responseData.result.unit_materials)
        return true
      } else {
        console.error('fetchMatBatchList', responseData)
        return false
      }
    } catch (error) {
      console.error('fetchMatBatchList', error)
      return false
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await
  async submitFormMaterial ({ state, commit, rootState }, data) {
    commit('setAxiosId')
    const head = {
      jsonrpc: '2.0',
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${state.token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'modifyMaterial',
        id: state.axiosId,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()

      if (responseData.result) {
        return true
        // commit('setPortfolioInfoArr', responseData)
      } else {
        console.error('submitFormBatch', responseData)
        return responseData?.error || { message: 'Ошибка при записи материала' }
      }
    } catch (error) {
      console.error('submitFormBatch', error)
      return error || { message: 'Ошибка при записи материала' }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submitFormBatch ({ state, commit, rootState }, data) {
    commit('setAxiosId')

    const head = {
      jsonrpc: '2.0',
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${state.token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'modifyBatch',
        id: state.axiosId,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.result) {
        return true
        // commit('setPortfolioInfoArr', responseData)
      } else {
        console.error('submitFormBatch', responseData)
        return responseData?.error || { message: 'Ошибка при записи партии' }
      }
    } catch (error) {
      console.error('submitFormBatch', error)
      return error || { message: 'Ошибка при записи партии' }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async modifyChemistryMaterial ({ commit, getters, state, dispatch }, data) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await MaterialApi.modifyChemistry(data, state.token)
        if (response.result?.modified_entities) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('modifyChemistryMaterial', error.message)
        return false
      }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async modifyChemistryBatch ({ commit, getters, state, dispatch }, data) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await BatchApi.modifyChemistry(data, state.token)
        if (response.result?.modified_entities) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('modifyChemistryBatch', error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async modifyUnitGroupBatch ({ commit, getters, state, dispatch }, data) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await BatchApi.modifyUnitGroup(data, state.token)
        if (response.result?.modified_entities) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('modifyUnitGroupBatch', error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async modifyUnitGroupMaterial ({ commit, getters, state, dispatch }, data) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await MaterialApi.modifyUnitGroup(data, state.token)
        if (response.result?.modified_entities) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('modifyUnitGroupMaterial', error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delUnitGroupBatch ({ commit, getters, state, dispatch }, data) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await BatchApi.delUnitGroup(data, state.token)
        if (response.result?.modified_entities) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('delUnitGroupBatch', error.message)
        return false
      }
    }
  }
}
