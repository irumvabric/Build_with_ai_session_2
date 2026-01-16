import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
// Lazy load others
const DetailView = () => import('../views/DetailView.vue');
const ProfileView = () => import('../views/ProfileView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/artwork/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/photographer/:id',
      name: 'profile',
      component: ProfileView
    }
  ]
});

export default router;
