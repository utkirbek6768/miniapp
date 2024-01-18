<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="cards">
      <button id="button1" @click="onClose()">button1</button>
    </div>
  </div>
</template>

<script setup>
const tg = window.Telegram.WebApp;

const onClose = () => {
  tg.close();
};
// document.getElementById("button1").addEventListener("click", function () {
//   Telegram.WebApp.sendData("BUTTON1");
// });
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
