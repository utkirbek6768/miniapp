<script setup>
import { RouterLink, RouterView } from "vue-router";
import { watchEffect } from "vue";

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
      <nav>
        <RouterLink to="/"><span class="link">Home</span></RouterLink>
        <RouterLink to="/about"><span class="link">About</span></RouterLink>
        <!-- <RouterLink to="/test">Test</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  --bg-color: var(--tg-theme-bg-color, #fff);
  font-family: sans-serif;
  background-color: var(--bg-color);
  color: var(--tg-theme-text-color, #222);
  font-size: 14px;
  margin: 0;
  padding: 0;
  color-scheme: var(--tg-color-scheme);
}

body.gray {
  background-color: var(--tg-theme-secondary-bg-color, #efefef);
}
a {
  color: var(--tg-theme-link-color, #2678b6);
}
input[type="text"],
.input[contenteditable] {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}
input[type="text"]::-webkit-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]::-moz-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]:-ms-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}
.input[data-placeholder] {
  position: relative;
}
.input[data-placeholder]:empty:before {
  position: absolute;
  left: 0;
  right: 0;
  content: attr(data-placeholder);
  color: var(--tg-theme-hint-color, #ccc);
  padding: 0 20px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}
section {
  padding: 15px;
  text-align: center;
  background-color: var(--bg-color, #ffffff);
}

section#top_sect {
  background-color: var(--tg-theme-bg-color, #ffffff);
}

section#top_sect.second {
  background-color: var(--tg-theme-secondary-bg-color, #efefef);
}

section .sect_row {
  margin: 10px 0;
}

section + section {
  padding: 0 15px 65px;
}
</style>
