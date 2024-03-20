export default async function ({ store }) {
  console.log('store fetchHeaders')
  await store.dispatch('headers/fetchHeaders')
}
