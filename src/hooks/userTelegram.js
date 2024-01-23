const tg = window.Telegram.WebApp;

const onClose = () => {
  tg.close();
};
const userTelegram = () => {
  return {
    onClose,
    tg,
    user: tg.initDataUnsafe?.user,
  };
};
// const sendMsg = () => {
//   const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
//   const chatId = 177482674;
//   const message = "Main button bosildi";
//   const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
//   fetch(apiUrl, { method: "GET" })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Message sent:", data);
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });
// };

const onToggleButton = () => {
  if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.show();
  }
};
module.exports = {
  userTelegram,
  onToggleButton,
};
