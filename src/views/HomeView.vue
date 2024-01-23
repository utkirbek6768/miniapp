<template>
  <main>
    <div class="buttons">
      <button class="button">Button1</button>
      <button class="button">Button2</button>
    </div>
    <form :model="form" class="form">
      <input v-model="form.name" type="text" class="input" placeholder="Name" />
      <input v-model="form.age" type="text" class="input" placeholder="Age" />
      <select name="region" id="region" class="select">
        <option value="fergana">Farg'ona</option>
        <option value="andijon">Andijon</option>
        <option value="namangan">Namangan</option>
      </select>
    </form>
  </main>
</template>

<script setup>
// https://habr.com/ru/articles/666278/          // <====bu tg class veribl lar

import { ref, watchEffect } from "vue";

const tg = window.Telegram.WebApp;

const form = ref({
  name: "",
  age: "",
});

const onSendData = () => {
  try {
    tg.sendData(JSON.stringify(form.value));
  } catch (error) {
    console.log(error);
  }
};

watchEffect(() => {
  try {
    tg.expand();
    tg.MainButton.setParams({
      text: "Tayyor",
    });

    tg.onEvent("mainButtonClicked", onSendData);

    if (form.value.name == "" || form.value.age == "") {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
