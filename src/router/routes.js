const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageTodo.vue')
      },
      {
        path: 'settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: 'settings/help',
        component: () => import('pages/PageHelp.vue')
      },
      {
        path: 'auth',
        component: () => import('pages/PageAuth.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
