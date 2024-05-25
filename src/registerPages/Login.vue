<template>
  <div class="login_wrapper">
    <div class="login_text_control">
      <div class="title">Введите номер телефона</div>
      <div class="hint gray">Мы отправим вам код подтверждения</div>
    </div>
    <div class="login_form_control">
      <form @submit.prevent class="login_form">
        <input
          type="tel"
          class="input"
          v-model="phoneNumber"
          placeholder="Telefon number"
          v-maska
          data-maska="+998 ## ### ## ##"
        />
      </form>
      <pre>{{ store.state }}</pre>
      <button
        class="btn main_button"
        :disabled="isLoading"
        @click="submitHandler()"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
// import http from "@/utils/axios";
// import router from "@/router";
import { ref, watch, computed } from "vue";
import { vMaska } from "maska";
import { useStore } from "vuex";

const store = useStore();

const disabled = ref(true);
const phoneNumber = ref("+998 ");

const submitHandler = async () => {
  try {
    const phone = phoneNumber.value.replace(/[\s\+]/g, "");
    store.dispatch("sendCode", phone);
  } catch (error) {
    console.error("Error:", error);
  }
};
const isLoading = computed(() => store.state.auth.isLoading);
watch(phoneNumber, (newValue) => {
  const phone = newValue.replace(/[\s\+]/g, "");
  if (phone.length >= 12) {
  }
});
</script>
