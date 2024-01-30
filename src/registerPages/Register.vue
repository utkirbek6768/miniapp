<template>
  <div class="register_wrapper">
    <div class="register_text_control">
      <div class="title">Давайте познакомимся</div>
      <div class="hint gray">Сообщите нам, как правильно к вам обращаться</div>
    </div>
    <div class="register_form_control">
      <form class="register_form" :model="formData">
        <input
          type="text"
          class="input"
          placeholder="Имя"
          v-model="formData.given_names"
        />
        <input
          type="text"
          class="input"
          placeholder="Фамилия"
          v-model="formData.sur_name"
        />
        <input
          type="date"
          class="input"
          placeholder="День рождения"
          v-model="formData.birthday"
        />
      </form>
      <button class="btn main_button" @click="register()">OK</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";
import { ref } from "vue";
const phone = localStorage.getItem("phone");
const key = localStorage.getItem("key");
const formData = ref({
  phone: phone,
  given_names: "",
  sur_name: "",
  birthday: "",
  key: key,
});

const register = async () => {
  http
    .post("/register", formData.value)
    .then((res) => {
      console.log(res.data.result);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style scoped></style>
