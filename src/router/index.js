import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Abaut from "../views/AboutView.vue";
import SendSms from "../pages/SendSms.vue";
import ValidCode from "../pages/ValidCode.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/abaut",
          component: Abaut,
          meta: {
            permission: "all",
            title: "Biz haqimizda",
            pageName: "abaut",
          },
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/sendsms",
      name: "sendsms",
      component: SendSms,
    },
    {
      path: "/validcode",
      name: "validcode",
      component: ValidCode,
    },
  ],
});

export default router;
