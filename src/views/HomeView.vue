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

<script setup>
import { watchEffect, watch, ref, onMounted, onUnmounted } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  name: "",
  age: "",
});

const onClose = () => {
  tg.close();
};

const onToggleButton = () => {
  tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
};

const onSendData = () => {
  tg.sendData(JSON.stringify(form.value));
};

watchEffect(() => {
  const { name, age } = form.value;

  if (name.trim() === "" || isNaN(age) || +age <= 0) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
});

watch(form, (newForm) => {
  if (validateForm()) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
});

onMounted(() => {
  tg.MainButton.setParams({
    text: "Malumotlarni yuborish",
  });
});

onMounted(() => {
  // Assuming tg.WebApp is the object with onEvent method
  tg.WebApp.onEvent("mainButtonClicked", onSendData);
});

// Unregister the event listener when the component is unmounted
onUnmounted(() => {
  // Assuming tg.WebApp is the object with offEvent method
  tg.WebApp.offEvent("mainButtonClicked", onSendData);
});
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
