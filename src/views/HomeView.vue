<template>
  <main>
    <button @click="onSendData" class="button">Send Data</button>

    <form :model="form" class="form">
      <input
        v-model="form.name"
        type="text"
        @input="mainButtonShow"
        class="input"
        placeholder="Name"
      />

      <input
        v-model="form.age"
        type="text"
        @input="mainButtonShow"
        class="input"
        placeholder="Age"
      />
    </form>
  </main>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";

const form = ref({
  name: "",
  age: "",
});
const mainButtonShow = () => {
  if (form.value.name == "" || form.value.age == "") {
    window.Telegram.WebApp.MainButton.hide();
  } else {
    window.Telegram.WebApp.MainButton.show();
  }
};

const onSendData = () => {
  window.Telegram.WebApp.sendData(JSON.stringify(form.value));
};

watchEffect(() => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.setParams({
      text: "Malumotlarni yuborish",
    });

    window.Telegram.WebApp.onEvent("mainButtonClicked", onSendData);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});
// watch(form.value, () => {
//   if (form.value.name == "" || form.value.age == "") {
//     window.Telegram.WebApp.MainButton.hide();
//   } else {
//     window.Telegram.WebApp.MainButton.show();
//   }
// });
// const sendMsg = () => {
//   const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
//   const chatId = 177482674;
//   const message = "Main button bosildi";
//   const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
//   fetch(apiUrl, { method: "GET" })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Message sent:", data);
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });
// };
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
