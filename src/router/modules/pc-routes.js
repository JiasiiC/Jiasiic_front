export default [
  {
    path: '/',
    name: 'main',
    component: () => import('../../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../views/main/index.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../../views/profile/indev.vue'),
        // 标记只有user为true才可以进入个人页面
        meta: {
          user: true
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../../views/member/index.vue')
      },
      {
        path: '/pay/result',
        name: 'payResult',
        component: () => import('../../views/pay/index.vue')
      }
    ]
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('../../views/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../views/login-register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../../views/login-register/register/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../../views/error/404/index.vue')
  },
  // 404
  {
    path: '/:catchAll(.*)',
    name: 'error',
    redirect: '/404'
  }
]
