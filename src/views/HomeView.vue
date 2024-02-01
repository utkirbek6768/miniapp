<template>
  <div class="home_wrapper">
    <header>
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/validcode">validcode</RouterLink>
        <RouterLink to="/abaut">Abaut</RouterLink>
      </nav>
      {{ text }}
      <RouterView />
    </header>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import http from "@/utils/axios";
import router from "@/router";

const text = ref(null);

const getMe = async () => {
  http
    .post("/me")
    .then((res) => {
      text.value = res;
    })
    .catch((err) => {
      text.value = err;
    });
};
const issetToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      getMe();
    } else {
      router.push("/");
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
