import extend from '../utils/extend-vue-app'
export default function ({ app }) {
  extend(app, {
    async mounted () {
      // если авторизован:
      const user = localStorage.getItem('user')
      if (user) {
        this.$store.commit('setUser', JSON.parse(user))
        this.$store.commit('setLoading', true)
        const ans = await this.$store.dispatch('fetchCatalogs')
        if (!ans) {
          this.$router.push('/login')
          this.$store.commit('setUser', null)
          localStorage.removeItem('user')
          return
        }
        await this.$store.dispatch('fetchMatBatchList')
        this.$store.commit('setLoading', false)
      } else if (this.$store.state.user && this.$store.state.user.auth_token) {
        this.$store.commit('setLoading', true)
        const ans = await this.$store.dispatch('fetchCatalogs')
        if (!ans) {
          this.$router.push('/login')
          this.$store.commit('setUser', null)
          return
        }
        await this.$store.dispatch('fetchMatBatchList')
        this.$store.commit('setLoading', false)
      } else {
        this.$router.push('/login')
      }
    }
  })
}
