<template>
  <main>
    <button class="btn" @click="setBackgroundColor('gray')">
      setBackgroundColor
    </button>
    <button class="btn btn-primary">btn-primary</button>
    <button class="close_btn">close_btn</button>
    <button class="btn" @click="tg.requestContact()">requestContact</button>
    <button class="btn" @click="tg.showAlert('Salom!')">showAlert</button>
    <button class="btn" @click="tg.showConfirm('Ishonchingiz komilmi?')">
      showConfirm
    </button>
    <button class="btn" @click="tg.requestWriteAccess()">
      requestWriteAccess
    </button>
    <button class="btn" @click="tg.showPopup()">showPopup</button>
    <button class="btn" @click="showScanQrPopup()">showScanQrPopup</button>
    <button class="btn" @click="tg.showScanQrPopup(true)">
      showScanQrPopup(true)
    </button>

    <form :model="form" class="form">
      <input v-model="form.name" type="text" class="input" placeholder="Name" />
      <input v-model="form.age" type="text" class="input" placeholder="Age" />
      <select v-model="form.region" name="region" id="region" class="select">
        <option value="fergana">Farg'ona</option>
        <option value="andijon">Andijon</option>
        <option value="namangan">Namangan</option>
      </select>
    </form>
  </main>
</template>

<script setup>
// https://habr.com/ru/articles/666278/          // <====bu tg class veribl lar

import { ref, watchEffect } from "vue";

const tg = window.Telegram.WebApp;

const form = ref({
  name: "",
  age: "",
  region: "",
});
// const showScanQrPopup = async () => {
// tg.showScanQrPopup(params)
// .then((qrText) => {
//   console.log('QR-kod matni:', qrText);

//   if (callback) {
//     const shouldClosePopup = callback(qrText);

//     if (shouldClosePopup) {
//       console.log('Pop-upni yopish');
//       tg.closePopup();
//     }
//   }
// })
// .catch((error) => {
//   console.error('QR-kod skanlashda xato yuz berdi:', error);
// });
// };

const showScanQrPopup = async () => {
  tg.showScanQrPopup(
    {
      text: linksOnly ? "ya.ru" : "google.com",
    },
    function (text) {
      if (linksOnly) {
        const lowerText = text.toString().toLowerCase();
        if (
          lowerText.substring(0, 7) === "http://" ||
          lowerText.substring(0, 8) === "https://"
        ) {
          setTimeout(function () {
            tg.openLink(text);
          }, 50);
          return true;
        }
      } else {
        tg.showAlert(text);
        return true;
      }
    }
  );
};

const onSendData = () => {
  try {
    tg.sendData(JSON.stringify(form.value));
  } catch (error) {
    console.log(error);
  }
};

watchEffect(() => {
  try {
    tg.expand();
    tg.MainButton.setParams({
      text: "Tayyor",
    });

    tg.onEvent("mainButtonClicked", onSendData);

    if (
      form.value.name == "" ||
      form.value.age == "" ||
      form.value.region == ""
    ) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.input {
  display: block;
  margin-top: 10px;
}
</style>
