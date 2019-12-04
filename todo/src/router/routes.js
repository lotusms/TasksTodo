
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '/todos', component: () => import('pages/PageTodo.vue') },
      { path: '/settings', component: () => import('pages/PageSettings.vue') },
      { path: '/settings/help', component: () => import('pages/PageHelp.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginRegisterLayout.vue'),
    children: [
      { path: '/auth', component: () => import('pages/PageAuth.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
