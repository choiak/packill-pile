import PileLogin from "@/views/session/login.vue";
import PileRegister from "@/views/session/register.vue";
import PileForgetPassword from "@/views/session/forgetPassword.vue";
import PileIndex from "@/layouts/ile/index.vue";
import PileUser from "@/views/pile/user.vue";
import { createRouter, createWebHistory } from "vue-router";
import { validate } from "@/api/user.js";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: PileIndex,
  },
  {
    name: "Profile",
    path: "/user/:id",
    component: PileUser,
  },
  {
    name: "Login",
    path: "/login",
    component: PileLogin,
  },
  {
    name: "Register",
    path: "/register",
    component: PileRegister,
  },
  {
    name: "ForgetPassword",
    path: "/forget-password",
    component: PileForgetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from) => {
//     if (
//         to.name !== "Login" &&
//         to.name !== "Register" &&
//         to.name !== "ForgetPassword" &&
//         !(await validate())
//     ) {
//         return { name: "PileLogin" };
//     }
// });

export default router;
