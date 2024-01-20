<template>
  <main>
    <button @click="onToggleButton()" class="button">Ontoggle button</button>

    <form :model="form" class="form">
      <input v-model="form.name" type="text" class="input" />
      <span>{{ form.name }}</span>
      <input v-model="form.age" type="text" class="input" />
      <span>{{ form.age }}</span>
    </form>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  name: "",
  age: "",
});

const isFormValid = ref(true);

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
  if (isFormValid.value) {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(form.value));
    } else {
      console.error("Telegram WebApp library is not loaded.");
    }
  } else {
    console.warn("Form is not valid. Cannot send data.");
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(form.value));
    } else {
      console.error("Telegram WebApp library is not loaded.");
    }
  }
};

const validateForm = () => {
  const { name, age } = form.value;
  return name.trim() === "" || isNaN(age) || +age <= 0;
};

watch(form, () => {
  isFormValid.value = !validateForm();
  if (isFormValid.value) {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.show();
    } else {
      console.error("Telegram WebApp library is not loaded.");
    }
  } else {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.hide();
    } else {
      console.error("Telegram WebApp library is not loaded.");
    }
  }
});

const handleMainButtonClicked = (eventData) => {
  console.log("Received mainButtonClicked event:", eventData);
  // Handle the received event data as needed
};

onMounted(() => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.setParams({
      text: "Malumotlarni yuborish",
    });

    window.Telegram.WebApp.onEvent(
      "mainButtonClicked",
      handleMainButtonClicked
    );
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});

onUnmounted(() => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.offEvent(
      "mainButtonClicked",
      handleMainButtonClicked
    );
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
