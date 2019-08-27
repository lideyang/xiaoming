import Vue from 'vue'
import Router from 'vue-router'

const framePage = resolve => require(['../views/FramePage'], resolve)
//const payRate = resolve => require(['@/components/PayRate'], resolve)
//const ringChart = resolve => require(['@/components/RingChart'], resolve)
//const paymentPage = resolve => require(['../views/PaymentPage'], resolve)
const ZuhePayment = resolve => require(['../views/ZuhePayment'], resolve)
//const ShuifeiPay = resolve => require(['../views/ShuifeiPay'], resolve)
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
      name: 'FramePage',
      component: framePage,
      meta: {keepAlive: true}
    },
    {
      path: '/ZuhePayment',
      name: 'ZuhePayment',
      component: ZuhePayment
    }]
})
