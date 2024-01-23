<script setup>
import { RouterView } from "vue-router";
import { watchEffect } from "vue";

const tg = window.Telegram.WebApp;
watchEffect(() => {
  tg.ready();
});
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="title">Title</div>
      <div class="hint">Qisqacha izoh yozish mumkin</div>
      <nav></nav>
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

.title {
  margin: 1rem auto;
  width: 90%;
  font-size: 1.5rem;
  /* text-align: center; */
}
a {
  color: var(--tg-theme-link-color, #2678b6);
  border: 1px solid var(--tg-theme-link-color, #000);
  margin-right: 10px;
}
input[type="text"],
.input[contenteditable] {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 90%;
  padding: 12px 20px;
  margin: 15px auto;
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
/* Shared styles for input and select */
.input,
select {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 90%;
  padding: 12px 20px; /* Fix: Corrected 'by' to '20px' */
  margin: 15px auto;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}

/* Placeholder styles for input */
.input[data-placeholder]:empty:before,
select[data-placeholder]:empty:before {
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

/* Placeholder styles for input in WebKit browsers */
.select[data-placeholder]::-webkit-input-placeholder,
select[data-placeholder]::-webkit-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

/* Placeholder styles for input in Mozilla Firefox */
.select[data-placeholder]::-moz-placeholder,
select[data-placeholder]::-moz-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

/* Placeholder styles for input in Microsoft Edge */
.select[data-placeholder]:-ms-input-placeholder,
select[data-placeholder]:-ms-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

.hint {
  color: var(--tg-theme-hint-color);
  margin: auto;
  margin-bottom: 1rem;
  width: 90%;
}

.link {
  color: var(--tg-theme-link-color);
}
.buttons {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}

.button {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  border: none;
  font-size: 1rem;
}

.button:not(:last-child) {
  margin-left: 1rem;
}
</style>
