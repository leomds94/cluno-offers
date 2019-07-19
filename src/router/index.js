import Vue from 'vue'
import Router from 'vue-router'
import Offers from '@/views/Offers'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(BootstrapVue)

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
