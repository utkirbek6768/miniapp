<script setup>
import { RouterLink, RouterView } from "vue-router";
import { watchEffect } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const tg = window.Telegram.WebApp;
watchEffect(() => {
  tg.ready();
});
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="Wellcome to Yalla" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
