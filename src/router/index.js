import Vue from 'vue'
import Router from 'vue-router'
import Offers from '@/views/Offers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Offers
    },
    {
      name: 'offers',
      path: '/offers',
      component: () => import('@/views/Offers'),
      props: true
    },
    {
      name: 'offer-detail',
      path: '/offers/:id',
      props: true,
      component: () => import('@/views/OfferDetail')
    }
  ]
})
