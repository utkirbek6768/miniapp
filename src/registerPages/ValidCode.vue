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
      <!-- <button class="btn main_button" @click="submitHandler">OK</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect, onMounted } from "vue";
const tg = window.Telegram.WebApp;
import { vMaska } from "maska";
import { useStore } from "vuex";

const store = useStore();

const code = ref("");
const phone = localStorage.getItem("yallavebphone") || "";
const seconds = ref(120);
let timer;

const formatTime = computed(() => {
  const minutes = Math.floor(seconds.value / 60);
  const remainingSeconds = seconds.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
});

const startTimer = () => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else {
      clearInterval(timer);
      store.dispatch("sendCode", phone);
      seconds.value = 120;
    }
  }, 1000);
};

const useTimer = computed(() => store.state.auth.useTimer);

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

watch(useTimer, (newValue) => {
  if (newValue) {
    clearInterval(timer);
    startTimer();
  }
});

onMounted(() => {
  startTimer();
});
watchEffect(() => {
  showButton();
  tg.MainButton.setParams({
    text: "OK",
  });
  tg.onEvent("mainButtonClicked", submitHandlerInValidCode);
});
</script>
