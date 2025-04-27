import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ActivityHistory from '../views/ActivityHistory.vue';
import EverydayView from '../views/EverydayView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },

  {
    path: '/history',
    name: 'ActivityHistory',
    component: ActivityHistory,
  },
  {
    path: '/everyday',
    name: 'EverydayView',
    component: EverydayView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 