<template>
  <div class="login_wrapper">
    <div class="login_text_control">
      <div class="title">Введите номер телефона</div>
      <div class="hint gray">Мы отправим вам код подтверждения</div>
    </div>
    <div class="login_form_control">
      <form class="login_form">
        <input
          type="tel"
          class="input"
          v-model="phoneNumber"
          placeholder="Telefon number"
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
const phoneNumber = ref("+998 ");
// localStorage.removeItem("yallavebtoken");
// localStorage.removeItem("yallavebphone");
// localStorage.removeItem("yallavebkey");
// localStorage.removeItem("yallavebcode");
const sendCode = async () => {
  try {
    disabled.value = true;
    const phone = phoneNumber.value.replace(/[\s\+]/g, "");
    const { data } = await http.post(`/client`, {
      phone,
    });

    if (data.success) {
      const { code } = data.result;
      console.log("Verification code:", code);

      localStorage.setItem("yallavebphone", phone);
      localStorage.setItem("yallavebcode", code);

      router.push("/validcode");
    }
  } catch (error) {
    disabled.value = false;
    console.error("Error:", error.message);
  }
};
</script>
