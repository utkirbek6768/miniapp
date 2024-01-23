<template>
  <h1>Abut Page</h1>
  <button @click="sendMsg()" class="button">Send MSG to bot</button>
</template>

<script setup>
import { watchEffect } from "vue";

const tg = window.Telegram.WebApp;

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

watchEffect(() => {});
</script>
