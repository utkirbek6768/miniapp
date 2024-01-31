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
        <input type="text" class="input" v-model="code" />
      </form>
      <div class="hint gray">
        Отправить код ещё раз через <span>{{ formatTime() }}</span>
      </div>
      <button class="btn main_button" @click="validCode()">OK</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import http from "@/utils/axios";
import router from "@/router";

const code = ref(null);
const phone = localStorage?.getItem("phone");
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
      console.log("Timer reached 0");
      router.push("/login");
      //   seconds.value = 60;
      //   startTimer();
    }
  }, 1000);
};

const validCode = async () => {
  try {
    await http
      .post("/valid", {
        phone: phone,
        code: code.value,
      })
      .then((res) => {
        if (res.data.result.key) {
          localStorage.setItem("key", res.data.result.key);
          router.push("/register");
        } else if (res.data.result.access_token) {
          localStorage.setItem("token", res.data.result.access_token);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped></style>
