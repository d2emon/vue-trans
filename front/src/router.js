import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('@/views/MainPage.vue'),
      // component: require('@/views/MainPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
});
