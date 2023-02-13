import PileLogin from "/src/views/session/login.vue"
import PileRegister from "/src/views/session/register.vue"
import PileReset from "/src/views/session/passwordReset.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/pile/login", component: PileLogin },
  { path: "/pile/register", component: PileRegister },
  {path: "/pile/password-reset", component: PileReset}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
