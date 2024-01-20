<script setup>
// import { onToggleButton } from "../hooks/userTelegram.js";
import { watchEffect, ref } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  name: "",
  age: "",
});

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
// const onSendData = () => {
//   tg.sendData(JSON.stringify(form.value));
// };
watchEffect(() => {
  if (!form.name || !form.age) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
});
watchEffect(() => {
  tg.MainButton.setParams({
    text: "Malumotlarni yuborish",
  });
});
// watchEffect(() => {
//   tg.WebApp.onEvent(mainButtonClicked, onSendData);
// });
</script>

<template>
  <main>
    <div class="cards">
      <button @click="onClose()" class="button">Saytni yopish</button>
      <button @click="onToggleButton()" class="button">Ontoggle button</button>

      <!-- <span>{{ tg?.initDataUnsafe?.user?.username }}</span> -->

      <form :model="form" class="form">
        <input v-model="form.name" type="text" class="input" />
        <input v-model="form.age" type="text" class="input" />
      </form>
    </div>
  </main>
</template>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
