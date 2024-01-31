<template>
  <div class="home_wrapper">
    <header>
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/validcode">validcode</RouterLink>
        <RouterLink to="/abaut">Abaut</RouterLink>
      </nav>
      <RouterView />
    </header>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import http from "@/utils/axios";
import router from "@/router";

const getMe = async () => {
  http
    .post("/me")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const issetToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      //   getMe();
    } else {
      router.push("/login");
    }
    console.log(token ? token : "token topilmadi");
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  issetToken();
});
</script>

<style scoped></style>
