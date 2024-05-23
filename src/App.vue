<script setup>
import { RouterView } from "vue-router";
import { watchEffect } from "vue";

const tg = window.Telegram.WebApp;

watchEffect(() => {
  tg.ready();
});
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style></style>
