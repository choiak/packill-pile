import PileLogin from "/src/views/session/login.vue";
import PileRegister from "/src/views/session/register.vue";
import PileForgetPassword from "/src/views/session/forgetPassword.vue";
import PileIndex from "/src/views/pile/index.vue";
import { createRouter, createWebHistory } from "vue-router";
import { validate } from "@/api/user.js";

const routes = [
  {
    name: "PileDashboard",
    path: "/pile/dashboard",
    component: PileIndex,
  },
  {
    name: "PileLogin",
    path: "/pile/login",
    component: PileLogin,
  },
  {
    name: "PileRegister",
    path: "/pile/register",
    component: PileRegister,
  },
  {
    name: "PileForgetPassword",
    path: "/pile/forget-password",
    component: PileForgetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (
    to.name !== "PileLogin" &&
    to.name !== "PileRegister" &&
    !(await validate())
  ) {
    return { name: "PileLogin" };
  }
});

export default router;
