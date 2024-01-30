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
          v-maska
          data-maska="+998 ## ### ## ##"
          v-model="phoneNumber"
          placeholder="+998"
        />
      </form>
      <button class="btn main_button" @click="sendCode()">OK</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";
import { ref } from "vue";
import { vMaska } from "maska";
import router from "@/router";

const phoneNumber = ref("+998");

const sendCode = async () => {
  http
    .post(`/client`, { phone: phoneNumber.value })
    .then(async (res) => {
      if (res.data.success) {
        try {
          console.log(res.data.result.code);
          localStorage.setItem("phone", phoneNumber.value);
          localStorage.setItem("code", res.data.result.code);
          router.push("/validcode");
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
<style scoped></style>
