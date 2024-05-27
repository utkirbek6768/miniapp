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
const savedTime = localStorage.getItem("timerEndTime");
const useTimer = computed(() => store.state.auth.useTimer);

const seconds = ref(120);
let timer = null;

const calculateRemainingTime = () => {
  if (savedTime) {
    const now = dayjs();
    const timerEndTime = dayjs(savedTime);
    const difference = timerEndTime.diff(now, "second");
    return difference > 0 ? difference : 120;
  }
  return 120;
};

seconds.value = calculateRemainingTime();

const formatTime = computed(() => {
  const minutes = Math.floor(seconds.value / 60);
  const remainingSeconds = seconds.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
});

const startTimer = () => {
  const timerEndTime = dayjs().add(seconds.value, "second");
  localStorage.setItem("timerEndTime", timerEndTime.toISOString());

  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else {
      clearInterval(timer);
      store.dispatch("sendCode", phone);
      seconds.value = 120;
      startTimer();
    }
  }, 1000);
};

const submitHandlerInValidCode = async () => {
  try {
    tg.MainButton.hide();
    const userData = {
      phone,
      code: code.value,
    };
    await store.dispatch("validConfirmCode", userData);
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

onMounted(() => {
  startTimer();
  tg.MainButton.setParams({ text: "OK" });
  tg.onEvent("mainButtonClicked", submitHandlerInValidCode);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});

watch(code, showButton);
</script>
