import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/user/Home')
const Login = () => import('../views/user/Login')
const Register = () => import('../views/user/Register')
const Details = () => import('../views/user/Details')
const About = () => import('../views/user/About')
const Welcome = () => import('../views/user/Welcome')
const Account = () => import('../views/user/account/Account')
const Release = () => import('../views/user/account/Release')
const User = () => import('../views/user/account/User')
const Message = () => import('../views/user/account/Message')
const News = () => import('../views/user/account/News')

const AdminHome = () => import('../views/admin/Home')
const AdminLogin = () => import('../views/admin/Login')
const AdminWelcome = () => import('../views/admin/Welcome')
const Notice = () => import('../views/admin/Notice')
const AddNotice = () => import('../views/admin/AddNotice')
const AdminMessage = () => import('../views/admin/Message')
const AdminReport = () => import('../views/admin/Report')
const UserManage = () => import('../views/admin/UserManage')
const ItemType = () => import('../views/admin/ItemType')
const ItemInfo = () => import('../views/admin/ItemInfo')

const routes = [
  {
    path: "/",
    redirect: "/admin/home"
  },
  {
    path: "/admin/login",
    component: AdminLogin
  },
  {
    path: "/admin/home",
    component: AdminHome,
    redirect: "/admin/welcome",
    children: [
      {
        path: '/admin/welcome',
        component: AdminWelcome
      },
      {
        path: '/admin/notice',
        component: Notice
      },
      {
        path: '/admin/addnotice',
        component: AddNotice
      },
      {
        path: '/admin/message',
        component: AdminMessage
      },
      {
        path: '/admin/report',
        component: AdminReport
      },
      {
        path: '/admin/user_manage',
        component: UserManage
      },
      {
        path: '/admin/item_type',
        component: ItemType
      },
      {
        path: '/admin/lost_and_found',
        component: ItemInfo
      },
    ]
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
  },
  {
    path: '/account',
    component: Account,
    redirect: '/account/user',
    children: [
      {
        path: '/account/user',
        component: User
      },
      {
        path: '/account/release',
        component: Release
      },
      {
        path: '/account/message',
        component: Message
      },
      {
        path: '/account/news',
        component: News
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path.startsWith('/admin') && to.path != '/admin/login' && !tokenStr) {
    return next('/admin/login')
  }

  if (to.path == '/account/user' && (!tokenStr)) {
    return next('/login')
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
