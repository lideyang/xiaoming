import Vue from 'vue'
import Router from 'vue-router'

const framePage = resolve => require(['../views/FramePage'], resolve)
const ZuHePage2 = resolve => require(['../views/ZuHePage2'], resolve)
const ZuhePayment = resolve => require(['../views/ZuhePayment'], resolve)
const ZuhePayment2 = resolve => require(['../views/ZuhePayment2'], resolve)
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: '/',
  routes: [{
    path: '/',
    name: 'FramePage',
    component: framePage,
    meta: {keepAlive: true}
  },
    {
      path: '/jx',
      name: 'FramePage1',
      component: framePage,
      meta: {keepAlive: true}
    },
    {
      path: '/jh',
      name: 'FramePage2',
      component: ZuHePage2,
      meta: {keepAlive: true}
    },
    {
      path: '/ZuhePayment',
      name: 'ZuhePayment',
      component: ZuhePayment
    },
    {
      path: '/ZuhePayment2',
      name: 'ZuhePayment2',
      component: ZuhePayment2
    }]
})
