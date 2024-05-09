/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import NotFound from "@/pages/NotFound.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import dashRoutes from "./routes";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        redirect: '/products',
        component: DashboardPage,
        children: dashRoutes,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: SignupPage,
    },
    {
        path: '/:notFound(.*)',
        component: NotFound,
    }
],
  scrollBehavior(to, from, savedPosition){
    if(savedPosition) {
      return savedPosition;
    }
    return {left: 0, top: 0,};
  },
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/');
  } else {
    next();
  }
})

export default router;
