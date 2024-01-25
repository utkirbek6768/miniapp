<template>
  <body class="" style="visibility: hidden">
    <section id="top_sect" class="second">
      <button id="main_btn" onclick="DemoApp.sendMessage('');">
        Send «Hello, World!»
      </button>
      <button id="with_webview_btn" onclick="DemoApp.sendMessage('', true);">
        Send «Hello, World!» with inline webview button
      </button>
      <button id="data_btn" onclick="DemoApp.sendTime(true);">
        Send current time to bot (x10)
      </button>
      <button onclick="DemoApp.expand();">Expand Webview</button>
      <button onclick="DemoApp.toggleMainButton(this);">
        Hide Main Button
      </button>
      <input
        type="text"
        placeholder="Input text in regular input..."
        id="regular_field"
      />
      <div
        class="input"
        contenteditable="true"
        data-placeholder="Input text in contenteditable field..."
        id="text_field"
      ></div>
      <div id="peer_wrap" style="display: none">
        <img id="peer_photo" class="chat_img" src="" />
        <span id="peer_name"></span>
      </div>
      <div class="sect_row">
        Header:
        <select id="header_color_sel">
          <option value="bg_color" selected>bg_color</option>
          <option value="secondary_bg_color">secondary_bg_color</option>
        </select>
      </div>
      <div class="sect_row">
        Background: <input type="color" id="bg_color_input" />
        <select id="bg_color_sel">
          <option value="bg_color" selected>bg_color</option>
          <option value="secondary_bg_color">secondary_bg_color</option>
          <option value="custom" id="bg_color_val">custom...</option>
        </select>
      </div>
    </section>
    <section>
      <div id="btn_status" class="hint" style="display: none"></div>
      <p>Test links:</p>
      <ul>
        <li>
          <a id="regular_link" href="">Regular link #2</a> (opens inside
          webview)
        </li>
        <li>
          <a href="https://telegram.org/" target="_blank"
            >target="_blank" link</a
          >
          (opens outside webview)
        </li>
        <li>
          <a href="javascript:window.open('https://telegram.org/');"
            >window.open() link</a
          >
          (opens outside webview)
        </li>
        <li>
          <a href="https://t.me/like">LikeBot t.me link</a> (opens inside
          Telegram app)
        </li>
        <li>
          <a
            href="javascript:Telegram.WebApp.openTelegramLink('https://t.me/vote');"
            >web_app_open_tg_link()</a
          >
          (opens inside Telegram app)
        </li>
        <li>
          <a href="javascript:Telegram.WebApp.openLink('https://google.com/');"
            >web_app_open_link()</a
          >
          (opens outside webview)
        </li>
        <li>
          <a href="tg://resolve?domain=vote">VoteBot tg:// link</a> (does not
          open)
        </li>
        <li>
          <a
            href="javascript:Telegram.WebApp.openLink('https://telegra.ph/api',{try_instant_view:true});"
            >web_app_open_link({try_instant_view:true})</a
          >
          (opens IV inside Telegram app)
        </li>
      </ul>
      <p>Test permissions:</p>
      <ul>
        <li>
          <a href="javascript:;" onclick="return DemoApp.requestLocation(this);"
            >Request Location</a
          >
          <span></span>
        </li>
        <li>
          <a href="javascript:;" onclick="return DemoApp.requestVideo(this);"
            >Request Video</a
          >
          <span></span>
        </li>
        <li>
          <a href="javascript:;" onclick="return DemoApp.requestAudio(this);"
            >Request Audio</a
          >
          <span></span>
        </li>
        <li>
          <a
            href="javascript:;"
            onclick="return DemoApp.requestAudioVideo(this);"
            >Request Audio+Video</a
          >
          <span></span>
        </li>
        <li>
          <a
            href="javascript:;"
            onclick="return DemoApp.testClipboard(this);"
            id="clipboard_test"
            >Read from clipboard</a
          >
          <span></span>
        </li>
      </ul>
      <p>Test alerts:</p>
      <div class="columns">
        <ul>
          <li><a href="javascript:;" onclick="alert('Hello!');">alert</a></li>
          <li>
            <a href="javascript:;" onclick="confirm('Are you sure?');"
              >confirm</a
            >
          </li>
          <li>
            <a href="javascript:;" onclick="prompt('How old are you?');"
              >prompt</a
            >
          </li>
        </ul>
        <ul>
          <li>
            <a href="javascript:;" onclick="DemoApp.showAlert('Hello!');"
              >showAlert</a
            >
          </li>
          <li>
            <a
              href="javascript:;"
              onclick="DemoApp.showConfirm('Are you sure?');"
              >showConfirm</a
            >
          </li>
          <li>
            <a href="javascript:;" onclick="DemoApp.requestWriteAccess();"
              >requestWriteAccess</a
            >
          </li>
          <li>
            <a href="javascript:;" onclick="DemoApp.requestContact();"
              >requestContact</a
            >
          </li>
          <li>
            <a href="javascript:;" onclick="DemoApp.showPopup();">showPopup</a>
          </li>
          <li>
            <a href="javascript:;" onclick="DemoApp.showScanQrPopup();"
              >showScanQrPopup</a
            >
          </li>
          <li>
            <a href="javascript:;" onclick="DemoApp.showScanQrPopup(true);"
              >showScanQrPopup (links only)</a
            >
          </li>
        </ul>
      </div>
      <p>Haptics:</p>
      <ul>
        <li>
          Impact:
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.impactOccurred('heavy');"
            >heavy</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.impactOccurred('light');"
            >light</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.impactOccurred('medium');"
            >medium</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.impactOccurred('rigid');"
            >rigid</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.impactOccurred('soft');"
            >soft</a
          ><br /><br />
        </li>
        <li>
          Notification:
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.notificationOccurred('error');"
            >error</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.notificationOccurred('success');"
            >success</a
          >, &nbsp;
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.notificationOccurred('warning');"
            >warning</a
          ><br /><br />
        </li>
        <li>
          Selection:
          <a
            href="javascript:Telegram.WebApp.HapticFeedback.selectionChanged();"
            >Changed</a
          ><br /><br />
        </li>
      </ul>
      <pre><code id="webview_data"></code></pre>
      <div class="hint">
        Data passed to webview.
        <span id="webview_data_status" class="status_need"
          >Checking hash...</span
        >
      </div>
      <pre><code id="theme_data"></code></pre>
      <div class="hint">Theme params</div>
      <div class="hint">
        Version: <span id="ver"></span>, platform: <span id="platform"></span>
      </div>
    </section>
    <div class="viewport-border"></div>
    <div class="viewport-stable_border"></div>
  </body>
</template>

<script setup>
const tg = window.Telegram.WebApp;
const DemoApp = {
  initData: Telegram.WebApp.initData || "",
  initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
  MainButton: Telegram.WebApp.MainButton,
};

const DemoAppMenu = {
  init() {
    DemoApp.init();
    document.body.classList.add("gray");
    Telegram.WebApp.setHeaderColor("secondary_bg_color");
  },
};

const DemoAppInitData = {
  init() {
    DemoApp.init();
    Telegram.WebApp.onEvent("themeChanged", function () {
      document.getElementById("theme_data").innerHTML = JSON.stringify(
        Telegram.WebApp.themeParams,
        null,
        2
      );
    });
    document.getElementById("webview_data").innerHTML = JSON.stringify(
      DemoApp.initDataUnsafe,
      null,
      2
    );
    document.getElementById("theme_data").innerHTML = JSON.stringify(
      Telegram.WebApp.themeParams,
      null,
      2
    );
    DemoApp.checkInitData();
  },
};

const DemoAppViewport = {
  init() {
    DemoApp.init();
    Telegram.WebApp.onEvent("viewportChanged", DemoAppViewport.setData);
    DemoAppViewport.setData();
  },
  setData() {
    document
      .querySelector(".viewport-border")
      .setAttribute(
        "text",
        window.innerWidth + " x " + round(Telegram.WebApp.viewportHeight, 2)
      );
    document
      .querySelector(".viewport-stable_border")
      .setAttribute(
        "text",
        window.innerWidth +
          " x " +
          round(Telegram.WebApp.viewportStableHeight, 2) +
          " | is_expanded: " +
          (Telegram.WebApp.isExpanded ? "true" : "false")
      );
  },
};
</script>

<style>
body {
  --bg-color: var(--tg-theme-bg-color, #fff);
  font-family: sans-serif;
  background-color: var(--bg-color);
  color: var(--tg-theme-text-color, #222);
  font-size: 14px;
  margin: 0;
  padding: 0;
  color-scheme: var(--tg-color-scheme);
}

body.gray {
  background-color: var(--tg-theme-secondary-bg-color, #efefef);
}

.title {
  margin: 1rem auto;
  width: 90%;
  font-size: 1.5rem;
  /* text-align: center; */
}
a {
  color: var(--tg-theme-link-color, #2678b6);
  border: 1px solid var(--tg-theme-link-color, #000);
  margin-right: 10px;
}
.btn {
  font-size: 14px;
  padding: 10px 17px;
}

.btn-primary {
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #fff);
  border: none;
}

button {
  display: block;
  width: 100%;
  font-size: 14px;
  margin: 15px 0;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #ffffff);
  cursor: pointer;
}

.main-container {
  padding: 15px;
}
.list-header {
  text-transform: uppercase;
  font-size: 0.92em;
  color: var(--tg-theme-hint-color, #ccc);
  margin: 0 0 10px;
}

button[disabled] {
  opacity: 0.6;
  cursor: auto;
  pointer-events: none;
}

button.close_btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  margin: 0;
  padding: 16px 20px;
  text-transform: uppercase;
}
input[type="text"],
.input[contenteditable] {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}

input[type="text"]::-webkit-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]::-moz-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]:-ms-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

.input[data-placeholder] {
  position: relative;
}

.input[data-placeholder]:empty:before {
  position: absolute;
  left: 0;
  right: 0;
  content: attr(data-placeholder);
  color: var(--tg-theme-hint-color, #ccc);
  padding: 0 20px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.hint {
  color: var(--tg-theme-hint-color);
  margin: auto;
  margin-bottom: 1rem;
  width: 90%;
}

.link {
  color: var(--tg-theme-link-color);
}
</style>
