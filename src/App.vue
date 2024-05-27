<script setup>
// import http from "@/utils/axios";
import { RouterView } from "vue-router";
import { watchEffect } from "vue";

const tg = window.Telegram.WebApp;

// const getMi = () => {
//   http
//     .post("/mi")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

watchEffect(() => {
  tg.ready();
  //   getMi();
});
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style></style>
