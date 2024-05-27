<template>
  <div class="login_wrapper">
    <div class="login_text_control">
      <div class="title">Введите номер телефона</div>
      <div class="hint gray">Мы отправим вам код подтверждения</div>
    </div>
    <div class="login_form_control">
      <form @submit.prevent class="login_form">
        <input
          type="tel"
          class="input"
          v-model="phoneNumber"
          placeholder="Telefon number"
          v-maska
          data-maska="+998 ## ### ## ##"
        />
      </form>
      <div>
        <p>Current Date and Time: {{ currentDateTime }}</p>
      </div>
    </div>
  </div>
  <button class="btn main_button" v-if="show" @click="submitHandlerInLogin()">
    OK
  </button>
</template>

<script setup>
// import http from "@/utils/axios";
import router from "@/router";
import { ref, watchEffect, computed } from "vue";
const tg = window.Telegram.WebApp;
import { vMaska } from "maska";
import { useStore } from "vuex";
import dayjs from "dayjs";
const currentDateTime = dayjs().format("HH:mm:ss");
const store = useStore();

const phoneNumber = ref("+998 90 537 67 68");
const show = ref(false);
const submitHandlerInLogin = async () => {
  try {
    tg.MainButton.hide();
    const phone = phoneNumber.value.replace(/[\s\+]/g, "");
    store.dispatch("sendCode", phone);
    router.push("/validcode");
  } catch (error) {
    console.error("Error:", error);
  }
};

const isLoading = computed(() => store.state.auth.isLoading);

const showButton = () => {
  if (phoneNumber.value.length >= 17) {
    show.value = true;
  } else {
    show.value = false;
  }
};
watchEffect(() => {
  showButton();
  //   tg.MainButton.setParams({
  //     text: "OK",
  //   });
  //   tg.onEvent("mainButtonClicked", submitHandlerInLogin);
});
</script>
