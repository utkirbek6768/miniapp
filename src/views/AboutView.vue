<template>
  <div class="valid_wrapper">
    <div class="valid_text_control">
      <div class="title">Введите код безопасности</div>
      <div class="hint gray">
        Введите 5-значный код, который мы отправили на номер {{ phone }}
      </div>
    </div>
    <div class="valid_form_control">
      <form @submit.prevent="submitHandler" class="valid_form">
        <input
          type="text"
          class="input"
          v-maska
          data-maska="#####"
          v-model="code"
          maxlength="5"
        />
      </form>
      <div class="hint gray">
        Отправить код ещё раз через <span>{{ formatTime }}</span>
      </div>
      <button class="btn main_button" @click="submitHandlerInValidCode">
        OK
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { vMaska } from "maska";
import dayjs from "dayjs";

const tg = window.Telegram.WebApp;
const store = useStore();
const code = ref("");
const phone = localStorage.getItem("yallavebphone") || "";
const useTimer = computed(() => store.state.auth.useTimer);
const seconds = ref(
  localStorage.getItem("timerSeconds")
    ? parseInt(localStorage.getItem("timerSeconds"), 10)
    : 120
);
let timer = null;

const formatTime = computed(() => {
  const minutes = Math.floor(seconds.value / 60);
  const remainingSeconds = seconds.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
});

const startTimer = () => {
  if (useTimer.value) {
    timer = setInterval(() => {
      if (seconds.value > 0) {
        seconds.value--;
        localStorage.setItem("timerSeconds", seconds.value);
      } else {
        store.dispatch("sendCode", phone);
        seconds.value = 120;
        localStorage.setItem("timerSeconds", seconds.value);
      }
    }, 1000);
  }
};

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const submitHandlerInValidCode = async () => {
  try {
    tg.MainButton.hide();
    const userData = {
      phone,
      code: code.value,
    };
    await store.dispatch("validConfirmCode", userData);
    localStorage.removeItem("timerSeconds"); // Reset the timer after successful code validation
  } catch (err) {
    console.error("Error validating code:", err);
  }
};

const showButton = () => {
  if (code.value.length >= 5) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};

watch(useTimer, (newVal) => {
  if (!newVal) {
    stopTimer();
    localStorage.removeItem("timerSeconds");
    seconds.value = 120;
  }
});

onMounted(() => {
  if (useTimer.value) {
    startTimer();
  }
  tg.MainButton.setParams({ text: "OK" });
  tg.onEvent("mainButtonClicked", submitHandlerInValidCode);
});

onBeforeUnmount(() => {
  stopTimer();
});

watch(code, showButton);
</script>
