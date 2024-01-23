<template>
  <button @click="sendDataToTelegram()">sendDataToTelegram</button>
  <button @click="handleMainButtonClicked()">handleMainButtonClicked</button>
</template>

<script setup>
import { watch, watchEffect } from "vue";

const sendDataToTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData("BUTTON1");
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const handleMainButtonClicked = () => {
  const message = "Main button clicked!";
  window.Telegram.WebApp.sendData(JSON.stringify({ message }));
};

const sendMsg = () => {
  const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const chatId = 177482674;
  const message = "Main button bosildi";
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

watch(() => {
  window.Telegram.WebApp.onEvent(
    "mainButtonClicked",
    window.Telegram.WebApp.sendData(JSON.stringify({ data: "birnima" }))
  );
  window.Telegram.WebApp.onEvent("mainButtonClicked", sendMsg);
});
</script>
