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
        <span>========</span>
        <pre>{{ response }}</pre>
        <span>==========</span>
      </form>
      <button class="btn main_button" :disabled="disabled" @click="sendCode()">
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";
import { onMounted, ref } from "vue";
import { vMaska } from "maska";
import router from "@/router";

const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
const chatId = 177482674;

const disabled = ref(false);
const phoneNumber = ref("+998 ");
const response = ref("");
// localStorage.removeItem("token");
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

      localStorage.setItem("phone", phone);
      localStorage.setItem("code", code);

      router.push("/validcode");
    }
  } catch (error) {
    disabled.value = false;
    console.error("Error:", error.message);
  }
};

const test = async () => {
  try {
    const res = await fetch("https://api.ildam.uz/cli/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "brand-id": "2",
        lang: "uz",
      },
      body: JSON.stringify({
        phone: "998905376768",
      }),
    });
    if (!res) {
      response.value = "Error res";
      return;
    }
    response.value = res;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

onMounted(async () => {
  test();
});
</script>
