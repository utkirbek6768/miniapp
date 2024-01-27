<template>
  <div class="login_wrapper">
    <div class="login_form_control">
      <form class="login_form">
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
.login_wrapper {
  width: 100%;
  /* height: var(--tg-viewport-stable-height); */
  height: var(--tg-viewport-height);
}
.login_form_control {
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.login_form {
  margin-top: 25%;
}
</style>
