/**
  * Файл стор для получения заголовков таблицы
*/
import headersApi from '~/api/headers'
import mergeArrays from '~/helpers/mergeArrays'

export const state = () => ({
  axiosId: 1,
  headers: null
})

export const getters = {
  getHeadersMaterials: state => (value) => {
    if (!state.headers) {
      return []
    }
    console.log('getHeadersMaterials', value)
    if (!value || (value && value.length < 1)) {
      return state.headers.headersMaterials.typeAll
    } else {
      let arr = []
      for (const item of value) {
        arr = mergeArrays(arr, state.headers.headersMaterials[`type${item}`], 'key')
      }
      return arr
    }
  },
  getHeadersBatches: state => (value) => {
    if (!state.headers) {
      return []
    }
    if (!value || (value && value.length < 1)) {
      return state.headers.headersBatches.typeAll
    } else {
      let arr = []
      for (const item of value) {
        arr = mergeArrays(arr, state.headers.headersBatches[`type${item}`], 'key')
      }
      return arr
    }
  }
}

export const mutations = {
  setAxiosId (state) {
    state.axiosId++
  },
  setHeaders (state, headers) {
    state.headers = headers
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchHeaders ({ commit, getters, state, dispatch }) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await headersApi.getHeader()
        if (response) {
          commit('setHeaders', response.result)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  }
}
