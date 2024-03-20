// import { apiService } from '@/api/'
// import { apiUrl } from '@/api/'
class HeadersApi {
  async getHeader () {
    /**
      * функция возвращающая заголовки для таблиц
    */
    try {
      const response = await fetch('http://localhost:8881/BatchEditor-FE/headers.json')
      const responseData = await response.json()
      return responseData
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default new HeadersApi()
