import { apiUrl } from '@/api/'

class BatchApi {
  async modifyChemistry (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
      *  "batch_create_unitid ":Number,  # Источник создания партии (unit_id).
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
        method: 'modifyBatchChemistry',
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

  async modifyUnitGroup (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
      *  "batch_create_unitid":Number,  # Источник создания партии (unit_id).
      *  "unit_group_id":Number,  # Ид группы агрегатов.
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
        method: 'modifyUnitGroupBatches',
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

  async delUnitGroup (data, token) {
    /**
      * функция удаление группы материалов на сервере
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
      *  "batch_create_unitid":Number,  # Источник создания партии (unit_id).
      *  "unit_group_id":Number,  # Ид группы агрегатов.
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
        method: 'deleteUnitGroupBatch',
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
        console.error(responseData)
        return responseData
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default new BatchApi()
