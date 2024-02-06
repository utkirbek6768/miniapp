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

<style>
.wrapper {
  padding: 1.3rem;
}
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

.title {
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 20px;
  max-width: 280px;
}
.hint {
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  color: var(--tg-theme-hint-color);
  margin-bottom: 1.3rem;
}
a {
  color: var(--tg-theme-link-color, #2678b6);
  border: 1px solid var(--tg-theme-link-color, #000);
  margin-right: 0.6rem;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
}
a:hover {
  background-color: var(--tg-theme-secondary-bg-color, #2678b6);
  color: #fff;
}
.main_button {
  position: absolute;
  bottom: 0rem;
  left: 1.3rem;
  width: calc(100% - 2.6rem);
}
.btn {
  font-size: 14px;
  padding: 1rem;
}

.btn-primary {
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #fff);
  border: none;
}

button {
  display: block;
  width: 100%;
  font-size: 14px;
  margin: 15px 0;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #ffffff);
  cursor: pointer;
}

.main-container {
  padding: 15px;
}
.list-header {
  text-transform: uppercase;
  font-size: 0.92em;
  color: var(--tg-theme-hint-color, #ccc);
  margin: 0 0 10px;
}

button[disabled] {
  opacity: 0.6;
  cursor: auto;
  pointer-events: none;
}

button.close_btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  margin: 0;
  padding: 16px 20px;
  text-transform: uppercase;
}
input,
.input[contenteditable] {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0px;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}

input::-webkit-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input::-moz-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input:-ms-input-placeholder {
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

.link {
  color: var(--tg-theme-link-color);
}
</style>
