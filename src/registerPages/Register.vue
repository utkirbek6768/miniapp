<template>
  <div class="register_wrapper">
    <div class="register_text_control">
      <div class="title">Давайте познакомимся</div>
      <div class="hint gray">Сообщите нам, как правильно к вам обращаться</div>
    </div>
    <div class="register_form_control">
      <form class="register_form">
        <input type="text" class="input" placeholder="Имя" />
        <input type="text" class="input" placeholder="Имя" />
        <input type="text" class="input" placeholder="Имя" />
        <input type="text" class="input" placeholder="Имя" />
      </form>
      <button class="btn main_button" @click="getMe()">OK</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";

const getMe = async () => {
  http
    .post("/me")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style scoped></style>
