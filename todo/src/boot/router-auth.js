

import { LocalStorage } from 'quasar'

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    let LoggedIn = LocalStorage.getItem('loggedIn')
    if (!LoggedIn && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
