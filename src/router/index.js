import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from "@/utils/auth"; // progress bar style
import getPageTitle from '@/utils/get-page-title'

Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterView"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/LoginView"),
    meta: { title: "登录" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/PostCreateView"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'post-edit',
    path: '/post/edit/:id',
    component: () => import('@/views/post/PostEditView'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/detail/:id",
    component: () => import("@/views/post/PostDetailView"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/TagView'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/SearchView'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/ProfileView'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/SettingView'),
    meta: { title: '设置', requireAuth: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

// 进度条配置
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // 登录，跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取用户信息
      await store.dispatch('user/getUserInfo')
      next()
    }
  } else if (!to.meta.requireAuth) {
    next()
  }
  else {
    next('/login')
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router;
