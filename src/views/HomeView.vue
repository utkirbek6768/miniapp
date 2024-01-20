<script setup>
const tg = window.Telegram.WebApp;

const onClose = () => {
  tg.close();
};

const onToggleButton = () => {
  if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
};
</script>

<template>
  <main>
    <div class="cards">
      <button @click="onClose()" class="button">Saytni yopish</button>

      <span>{{ tg?.initDataUnsafe?.user?.username }}</span>

      <button @click="onToggleButton()" class="button">onToggleButton</button>

      <form class="form">
        <input type="text" class="input" />
        <input type="text" class="input" />
        <input type="text" class="input" />
        <input type="submit" class="input" />
      </form>
    </div>
  </main>
</template>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
  width: 100%;
}
</style>
