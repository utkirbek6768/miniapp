const tg = window.Telegram.WebApp;

const userTelegram = () => {
  const onClose = () => {
    tg.close();
  };

  return {
    onClose,
    tg,
    user: tg.initDataUnsafe?.user,
  };
};

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
