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
import { ref, watch, onMounted, onUnmounted } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  name: "",
  age: "",
});

const isFormValid = ref(true);

const onClose = () => {
  tg.close();
};

const onToggleButton = () => {
  tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
};

const onSendData = () => {
  if (isFormValid.value) {
    tg.sendData(JSON.stringify(form.value));
  } else {
    console.warn("Form is not valid. Cannot send data.");
  }
};

const validateForm = () => {
  const { name, age } = form.value;
  return name.trim() === "" || isNaN(age) || +age <= 0;
};

watch(form, () => {
  isFormValid.value = !validateForm();
  if (isFormValid.value) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
});

onMounted(() => {
  tg.MainButton.setParams({
    text: "Malumotlarni yuborish",
  });

  // Assuming tg.WebApp is the object with onEvent method
  tg.WebApp.onEvent("mainButtonClicked", onSendData);
});

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
