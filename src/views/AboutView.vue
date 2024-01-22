<template>
  <div style="border: 1px solid red; width: 400px; height: 400px">
    <button @click="sendDataToTelegram">sendDataToTelegram</button>
    <button @click="handleMainButtonClicked">handleMainButtonClicked</button>
    <button @click="onToggleButton">onToggleButton</button>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";

const onToggleButton = () => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.isVisible
      ? window.Telegram.WebApp.MainButton.hide()
      : window.Telegram.WebApp.MainButton.show();
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};
const sendDataToTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData("BUTTON1");
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const handleMainButtonClicked = (eventData) => {
  console.log("Received mainButtonClicked event:", eventData);
  window.Telegram.WebApp.sendData(JSON.stringify({ message })); // bu expremant
  // Send a message to the bot when the mainButtonClicked event fires
  const message = "Main button clicked!";
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify({ message }));
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const sendMsg = () => {
  const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const chatId = 177482674;
  const message = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent:", data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

watchEffect(() => {
  window.Telegram.WebApp.onEvent("mainButtonClicked", sendMsg);
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.onEvent("mainButtonClicked", sendMsg);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});

// onUnmounted(() => {
//   if (window.Telegram && window.Telegram.WebApp) {
//     window.Telegram.WebApp.offEvent("mainButtonClicked", sendMsg);
//   } else {
//     console.error("Telegram WebApp library is not loaded.");
//   }
// });
</script>

<style scoped>
/* Add your styles if needed */
</style>
