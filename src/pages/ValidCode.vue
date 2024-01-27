<template>
  <div class="valid_wrapper">
    <div class="valid_form_control">
      <form class="valid_form">
        <input type="text" class="input" />
      </form>
      <button class="btn" @click="valid()">OK</button>
    </div>
  </div>
</template>

<script setup>
import http from "@/utils/axios";

const valid = async () => {
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
.valid_wrapper {
  width: 100%;
  /* height: var(--tg-viewport-stable-height); */
  height: var(--tg-viewport-height);
}
.valid_form_control {
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.valid_form {
  margin-top: 25%;
}
</style>
