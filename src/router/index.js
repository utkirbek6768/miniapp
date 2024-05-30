import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../registerPages/Login.vue";
import Register from "../registerPages/Register.vue";
import Abaut from "../views/AboutView.vue";
import Map from "../registerPages/Map.vue";
import ValidCode from "../registerPages/ValidCode.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [],
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
      path: "/map",
      name: "map",
      component: Map,
    },
    {
      path: "/validcode",
      name: "validcode",
      component: ValidCode,
    },
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
});

export default router;
