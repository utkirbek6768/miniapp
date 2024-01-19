<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="cards">
      <button @click="onClose()" class="button">Saytni yopish</button>

      <span>{{ tg?.initDataUnsafe?.user?.username }}</span>

      <button @click="onToggleButton()" class="button">onToggleButton</button>
    </div>
  </div>
</template>

<script setup>
const tg = window.Telegram.WebApp;

const onClose = () => {
  tg.close();
};

const onToggleButton = () => {
  if (tg.MainButton.isVisible) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
