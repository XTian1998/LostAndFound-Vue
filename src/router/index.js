import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/user/Home')
const Login = () => import('../views/user/Login')
const Register = () => import('../views/user/Register')
const Details = () => import('../views/user/Details')
const About = () => import('../views/user/About')
const Welcome = () => import('../views/user/Welcome')

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/details',
        name: 'details',
        component: Details
      },
      {
        path: '/about',
        component: About
      }
    ]
  },  
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
