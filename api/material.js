import { apiUrl } from '@/api/'
class MaterialApi {
  async modifyChemistry (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "mat_id":Number,  # Ид материала
          "element_num":Number,  # Номер элемента в период. таблице.
          "element_content":Number, # Содержание элемента в партии, % (0...100). Nullable (если null - обнулить элемент)
          "element_assim":Number Усвоение элемента при добавлении в расплав, % (0...100). Nullable (если null - обнулить элемент)
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'modifyMaterialChemistry',
        id: 1,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()

      if (responseData.result) {
        return responseData
      } else {
        console.error('modifyChemistry', responseData)
        return responseData
      }
    } catch (error) {
      console.error('modifyChemistry', error)
      return error
    }
  }

  async modifyUnitGroup (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "mat_id":Number,  # Ид материала
          "unit_group_id":Number,  # Ид группы агрегатов.
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'modifyUnitGroupMaterials',
        id: 1,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()

      if (responseData.result) {
        return responseData
      } else {
        console.error('modifyUnitGroup', responseData)
        return responseData
      }
    } catch (error) {
      console.error('modifyUnitGroup', error)
      return error
    }
  }
}

export default new MaterialApi()
