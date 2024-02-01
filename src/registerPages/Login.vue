<template>
  <div class="login_wrapper">
    <div class="login_text_control">
      <div class="title">Введите номер телефона</div>
      <div class="hint gray">Мы отправим вам код подтверждения</div>
    </div>
    <div class="login_form_control">
      <form class="login_form">
        <input
          type="text"
          class="input"
          v-model="phoneNumber"
          placeholder="+998"
          v-maska
          data-maska="+998 ## ### ## ##"
        />
      </form>
      <button class="btn main_button" :disabled="disabled" @click="sendCode()">
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";
import { ref } from "vue";
import { vMaska } from "maska";
import router from "@/router";

// Constants
const botToken = "YOUR_TELEGRAM_BOT_TOKEN";
const chatId = 177482674;

// State
const disabled = ref(false);
const phoneNumber = ref("+998");

// Composition function for sending messages
const sendMsg = (msg) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${msg}`;
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent:", data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// Composition function for handling phone number verification
const sendCode = async () => {
  try {
    disabled.value = true;
    const phone = phoneNumber.value.replace(/[\s\+]/g, "");

    const { data } = await http.post(`/client`, { phone });

    console.log("Server Response:", data);

    if (data.success) {
      const { code } = data.result;
      console.log("Verification code:", code);

      localStorage.setItem("phone", phone);
      localStorage.setItem("code", code);

      router.push("/validcode");
    }
  } catch (error) {
    console.error("Error:", error);
    sendMsg(`Error occurred during the request: ${error.message}`);
  } finally {
    disabled.value = false;
  }
};
</script>

<style scoped>
/* Your scoped styles go here */
</style>
