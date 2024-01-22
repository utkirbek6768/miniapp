<template>
  <main>
    <button @click="onToggleButton()" class="button">Ontoggle button</button>

    <button @click="onSendData()" class="button">onSendData</button>

    <form :model="form" class="form">
      <input v-model="form.name" type="text" class="input" />
      <span>{{ form.name }}</span>
      <input v-model="form.age" type="text" class="input" />
      <span>{{ form.age }}</span>
    </form>
  </main>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const form = ref({
  name: "",
  age: "",
});

const onToggleButton = () => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.isVisible
      ? window.Telegram.WebApp.MainButton.hide()
      : window.Telegram.WebApp.MainButton.show();
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const onSendData = () => {
  window.Telegram.WebApp.sendData(JSON.stringify(form.value));
};

watchEffect(() => {
  //   window.Telegram.WebApp.onEvent("mainButtonClicked", onSendData);
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.setParams({
      text: "Malumotlarni yuborish",
    });

    window.Telegram.WebApp.onEvent("mainButtonClicked", onSendData);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});

// onUnmounted(async () => {
//   try {
//     window.Telegram.WebApp.offEvent("mainButtonClicked", sendMyName);
//   } catch (error) {
//     console.log(error);
//   }
// });
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
