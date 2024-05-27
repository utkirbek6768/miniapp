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
        <select
          v-model="formData.gender"
          name="gender"
          id="gender"
          class="select"
          placeholder="Выберите свой пол"
        >
          <option value="MALE">Мужской</option>
          <option value="FEMALE">Женщина</option>
        </select>
        <input
          type="date"
          class="input"
          placeholder="День рождения"
          v-model="formData.birthday"
        />
      </form>
      <button class="btn main_button" @click="submitHandler()">OK</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";
import { ref, watch, watchEffect } from "vue";
const tg = window.Telegram.WebApp;
const phone = localStorage.getItem("yallavebphone");
const key = localStorage.getItem("yallavebkey");
const formData = ref({
  phone: phone,
  given_names: "",
  sur_name: "",
  gender: "MALE",
  birthday: "",
  key: key,
});

const submitHandler = async () => {
  try {
    await store.dispatch("registerUser", formData);
  } catch (err) {
    console.error("Error validating code:", err);
  }
};
const showButton = () => {
  const { given_names, sur_name, birthday } = formData.value;
  if (given_names && sur_name && birthday) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};
watch(formData, (newValue) => {
  const { given_names, sur_name, birthday } = newValue;
  if (given_names && sur_name && birthday) {
  }
});
watchEffect(() => {
  showButton();
  tg.MainButton.setParams({
    text: "Tayyor",
  });
  tg.expand();
  tg.ready();
  //   tg.onEvent("mainButtonClicked", submitHandler);
});
</script>
<style scoped></style>
