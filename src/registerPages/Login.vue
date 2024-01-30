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

const sendCode = async () => {
  disabled.value = true;
  const phone = phoneNumber.value.replace(/[\s\+]/g, "");
  try {
    const res = await http.post(`/client`, { phone });

    if (res.data.success) {
      console.log(res.data.result.code);
      localStorage.setItem("phone", phone);
      localStorage.setItem("code", res.data.result.code);
      router.push("/validcode");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Reset disabled status in both success and error cases
    disabled.value = false;
  }
};
</script>
<style scoped></style>
