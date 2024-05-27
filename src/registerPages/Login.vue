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
      <!-- <button
        class="btn main_button"
        :disabled="isLoading"
        @click="submitHandler()"
      >
        OK
      </button> -->
    </div>
  </div>
</template>

<script setup>
// import http from "@/utils/axios";
// import router from "@/router";
import { ref, watch, computed } from "vue";
const tg = window.Telegram.WebApp;
import { vMaska } from "maska";
import { useStore } from "vuex";

const store = useStore();

const phoneNumber = ref("+998 90 537 67 68");

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

const showButton = () => {
  if (phoneNumber.length >= 17) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};
watchEffect(() => {
  showButton();
  tg.MainButton.setParams({
    text: "OK",
  });
  tg.onEvent("mainButtonClicked", submitHandler);
});
</script>
