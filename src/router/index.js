import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../registerPages/Login.vue";
import Register from "../registerPages/Register.vue";
import Abaut from "../views/AboutView.vue";
import SendSms from "../registerPages/SendSms.vue";
import ValidCode from "../registerPages/ValidCode.vue";

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
