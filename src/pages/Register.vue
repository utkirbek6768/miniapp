<template>
  <div class="register_wrapper">
    <div class="register_form_control">
      <form class="register_form">
        <input type="text" class="input" />
        <input type="text" class="input" />
        <input type="text" class="input" />
      </form>
      <button class="btn" @click="getMe()">OK</button>
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
<style scoped>
.register_wrapper {
  width: 100%;
  /* height: var(--tg-viewport-stable-height); */
  height: var(--tg-viewport-height);
}
.register_form_control {
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.register_form {
  margin-top: 25%;
}
</style>
