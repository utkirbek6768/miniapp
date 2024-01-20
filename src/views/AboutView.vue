<template>
  <button @click="sendDataToTelegram" id="button1">Button 1</button>
</template>

<script setup>
const sendDataToTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData("BUTTON1");
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const handleMainButtonClicked = (eventData) => {
  console.log("Received mainButtonClicked event:", eventData);

  // Send a message to the bot when the mainButtonClicked event fires
  const message = "Main button clicked!";
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify({ message }));
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
};

const sendMsg = () => {
  const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const chatId = 177482674;
  const message = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent:", data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// Other script setup code if needed

// Attach the event listener when the component is mounted
onMounted(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.onEvent("mainButtonClicked", sendMsg);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});

// Remove the event listener when the component is unmounted
onUnmounted(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.offEvent("mainButtonClicked", sendMsg);
  } else {
    console.error("Telegram WebApp library is not loaded.");
  }
});
</script>

<style scoped>
/* Add your styles if needed */
</style>
