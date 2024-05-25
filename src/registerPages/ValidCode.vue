<template>
  <div class="valid_wrapper">
    <div class="valid_text_control">
      <div class="title">Введите код безопасности</div>
      <div class="hint gray">
        Введите 5-значный код, который мы отправили на номер {{ phone }}
      </div>
    </div>
    <div class="valid_form_control">
      <form class="valid_form">
        <input type="number" class="input" v-model="code" />
        <span>{{ code.length }}</span>
      </form>
      <div class="hint gray">
        Отправить код ещё раз через <span>{{ formatTime() }}</span>
      </div>
      <button class="btn main_button" :disabled="disabled" @click="validCode()">
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import http from "@/utils/axios";
import router from "@/router";

const disabled = ref(true);
const code = ref("");
const showMainButton = localStorage.getItem("yallavebcode") || "";
const phone = localStorage.getItem("yallavebphone") || "";
const seconds = ref(120);
let timer;

const formatTime = () => {
  const minutes = Math.floor(seconds.value / 60);
  const remainingSeconds = seconds.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const startTimer = () => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else {
      clearInterval(timer);
      sendCode();
    }
  }, 1000);
};

const sendCode = async () => {
  try {
    store.dispatch("login");
    const { data } = await http.post(`/client`, {
      phone,
    });
    if (data.success) {
      const { code } = data.result;
      localStorage.setItem("yallavebphone", phone);
      localStorage.setItem("yallavebcode", code);
      startTimer();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const validCode = async () => {
  try {
    const res = await http.post("/valid", {
      phone: phone,
      code: code.value,
    });

    if (res.data.result.key) {
      localStorage.setItem("yallavebkey", res.data.result.key);
      router.push("/register");
    } else if (res.data.result.access_token) {
      localStorage.setItem("yallavebtoken", res.data.result.access_token);
      router.push("/");
    }
  } catch (err) {
    console.log(err);
  }
};

watch(code, (newValue) => {
  disabled.value = newValue.length < 5;
});

onMounted(() => {
  if (showMainButton) {
    startTimer();
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped></style>
