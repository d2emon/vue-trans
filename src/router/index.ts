import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import locations from '@/store/modules/locations/data';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/random',
    name: 'Random',
    redirect: () => {
      const locationId: number = Math.floor(Math.random() * locations.length);
      return locations[locationId] ? `/location/${locations[locationId].locationId}` : '';
    },
  },
  {
    path: '/location/:locationId',
    name: 'Location',
    component: () => import('@/views/Home.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
