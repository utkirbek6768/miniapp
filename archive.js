// onUnmounted(async () => {
//   try {
//     tg.offEvent("mainButtonClicked", sendMyName);
//   } catch (error) {
//     console.log(error);
//   }
// });
////=========================================
// const sendMsg = () => {
// 	const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
// 	const chatId = 177482674;
// 	const message = "Main button bosildi";
// 	const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
// 	fetch(apiUrl, { method: "GET" })
// 	  .then((response) => response.json())
// 	  .then((data) => {
// 		console.log("Message sent:", data);
// 	  })
// 	  .catch((error) => {
// 		console.error("Error sending message:", error);
// 	  });
//   };

//////========================

// .select,
// select {
//   display: block;
//   box-sizing: border-box;
//   font-size: 14px;
//   width: 90%;
//   padding: 12px 20px; /* Fix: Corrected 'by' to '20px' */
//   margin: 15px auto;
//   border: 1px solid var(--tg-theme-link-color, #000);
//   background-color: var(--tg-theme-bg-color, #ffffff);
//   border-radius: 4px;
//   color: var(--tg-theme-text-color, #222222);
//   text-align: start;
// }

// .input[data-placeholder]:empty:before,
// select[data-placeholder]:empty:before {
//   position: absolute;
//   left: 0;
//   right: 0;
//   content: attr(data-placeholder);
//   color: var(--tg-theme-hint-color, #ccc);
//   padding: 0 20px;
//   font-weight: normal;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   pointer-events: none;
//   z-index: -1;
// }

// .select[data-placeholder]::-webkit-input-placeholder,
// select[data-placeholder]::-webkit-input-placeholder {
//   color: var(--tg-theme-hint-color, #ccc);
// }

// .select[data-placeholder]::-moz-placeholder,
// select[data-placeholder]::-moz-placeholder {
//   color: var(--tg-theme-hint-color, #ccc);
// }

// .select[data-placeholder]:-ms-input-placeholder,
// select[data-placeholder]:-ms-input-placeholder {
//   color: var(--tg-theme-hint-color, #ccc);
// }
////======================================================================
// const sendMsg = () => {
// 	const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
// 	const chatId = 177482674;
// 	const message = "Main button bosildi";
// 	const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
// 	fetch(apiUrl, { method: "GET" })
// 	  .then((response) => response.json())
// 	  .then((data) => {
// 		console.log("Message sent:", data);
// 	  })
// 	  .catch((error) => {
// 		console.error("Error sending message:", error);
// 	  });
//   };
///////=============tg.function()========================================
const tg = window.Telegram.WebApp;
tg.close();
tg.init();
tg.expand();
tg.ready();
tg.showAlert(text);
tg.openLink("https://ya.ru");
tg.setHeaderColor("secondary_bg_color");
tg.checkInitData();
tg.onEvent("themeChanged", function () {});
tg.onEvent("viewportChanged", function () {});
tg.onEvent("settingsButtonClicked", function () {
  tg.alert("Settings opened!");
});
tg.showConfirm(message);
tg.setBackgroundColor("gray");
tg.MainButton.showProgress();
tg.MainButton.hideProgress();
Telegram.WebApp.MainButton.setParams({
  text: "main button closed",
  is_visible: true,
}).onClick(DemoApp.close);
tg.setHeaderColor("secondary_bg_color");
tg.testClipboard(document.getElementById("clipboard_test"));
tg.showScanQrPopup(
  {
    text: linksOnly ? "with any link" : "for test purposes",
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

tg.requestContact(function (result) {
  if (result) {
    DemoApp.showAlert("Contact granted");
  } else {
    DemoApp.showAlert("Contact denied");
  }
});

tg.showPopup(
  {
    title: "Popup title",
    message: "Popup message",
    buttons: [
      { id: "delete", type: "destructive", text: "Delete all" },
      { id: "faq", type: "default", text: "Open FAQ" },
      { type: "cancel" },
    ],
  },
  function (buttonId) {
    if (buttonId === "delete") {
      tg.showAlert("'Delete all' selected");
    } else if (buttonId === "faq") {
      tg.openLink("https://telegram.org/faq");
    }
  }
);

tg.requestWriteAccess(function (result) {
  if (result) {
    tg.showAlert("Write access granted");
  } else {
    tg.showAlert("Write access denied");
  }
});

tg.sendData(new Date().toString());

tg.apiRequest("checkInitData", {}, function (result) {
  if (result.ok) {
    console.log(result);
  } else {
    console.log("else error");
  }
});
