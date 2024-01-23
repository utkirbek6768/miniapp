<template>
  <main>
    <form :model="form" class="form">
      <input v-model="form.name" type="text" class="input" placeholder="Name" />
      <input v-model="form.age" type="number" class="input" placeholder="Age" />
    </form>
  </main>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const tg = ref(window.Telegram.WebApp);

const form = ref({
  name: "",
  age: "",
});

const onSendData = () => {
  try {
    tg.sendData(JSON.stringify(form.value));
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

watchEffect(() => {
  if (tg) {
    tg.MainButton.setParams({
      text: "Malumotlarni yuborish",
    });
    tg.onEvent("mainButtonClicked", onSendData);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});

watchEffect(() => {
  tg.MainButton[
    form.value.name === "" || form.value.age === "" ? "hide" : "show"
  ]();
});
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
