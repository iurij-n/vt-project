import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeList from '../components/employee/EmployeeList.component.vue'
// import EmployeeDetails from '../components/employee/EmployeeDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/employee/:id',
    name: 'EmployeeDetails',
    component: () => import('../components/employee/EmployeeDetails.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
