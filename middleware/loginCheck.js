export default function ({ redirect, store }) {
  if (!store.getters.getUser) {
    redirect('/login')
  }
}
