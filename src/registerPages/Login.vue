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

const disabled = ref(false);
const phoneNumber = ref("+998");

// ===============================
const sendMsg = (msg) => {
  const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const chatId = 177482674;
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
// ==============================

const sendCode = async () => {
  disabled.value = true;
  const phone = phoneNumber.value.replace(/[\s\+]/g, "");
  try {
    sendMsg("so'rov yuborildi");
    await http
      .post(`/client`, { phone })
      .then((res) => {
        sendMsg(JSON.stringify(res));
        if (res.data.success) {
          console.log(res.data.result.code);
          localStorage.setItem("phone", phone);
          localStorage.setItem("code", res.data.result.code);
          router.push("/validcode");
        }
      })
      .catch((err) => {
        sendMsg(`so'rov err bilan tugadi${JSON.stringify(err)}`);
      });
  } catch (error) {
    sendMsg(`so'rov error bilan tugadi${JSON.stringify(error)}`);
    console.error("Error:", error);
    disabled.value = false;
  }
};
</script>
<style scoped></style>
