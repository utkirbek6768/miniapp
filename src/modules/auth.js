import http from "@/utils/axios";
import router from "@/router";
// import AuthServise from "@/utils/authservise";
// const tg = window.Telegram.WebApp;

const state = {
  isLoading: false,
  useTimer: false,
};

const mutations = {
  sedCodeStart(state) {
    state.isLoading = true;
  },
  sedCodeSuccess(state) {
    state.isLoading = false;
    state.useTimer = true;
    localStorage.setItem("startTimer", "start");
  },
  sedCodeFailure(state) {
    state.isLoading = false;
    state.useTimer = false;
    localStorage.setItem("startTimer", "stop");
  },
  //=================sedCodeStart=======================
  validcodeStart(state) {
    state.isLoading = true;
    state.useTimer = false;
  },
  validcodeSuccess(state) {
    state.isLoading = false;
    state.useTimer = false;
    localStorage.setItem("startTimer", "stop");
  },
  validcodeFailure(state) {
    state.isLoading = false;
    state.useTimer = false;
  },
  //   =================registerStart=================
  registerStart(state) {
    state.isLoading = true;
  },
  registerSuccess(state) {
    state.isLoading = false;
  },
  registerFailure(state) {
    state.isLoading = false;
  },

  //   =================logoutStart=================
  logoutStart(state) {
    state.isLoading = true;
  },
  logoutSuccess(state) {
    state.isLoading = false;
  },
  logoutFailure(state) {
    state.isLoading = false;
  },
};

const actions = {
  sendCode(context, phone) {
    return new Promise(() => {
      context.commit("sedCodeStart");
      http
        .post("/client", { phone: phone })
        .then(async (res) => {
          if (res.data.success) {
            context.commit("sedCodeSuccess");
            localStorage.setItem("yallavebphone", phone);
            console.log(res.data.result.code);
          }
        })
        .catch((err) => {
          context.commit("sedCodeFailure");
          console.log("err.response.data", err.response.data);
        });
    });
  },
  validConfirmCode(context, userData) {
    return new Promise(() => {
      context.commit("validcodeStart");
      http
        .post("/valid", {
          phone: userData.phone,
          code: userData.code,
        })
        .then(async (res) => {
          //   console.log(res.data.result);
          context.commit("validcodeSuccess");
          if (res.data.result.key) {
            localStorage.setItem("yallavebkey", res.data.result.key);
            router.push("/register");
          } else if (res.data.result.access_token) {
            localStorage.setItem("yallavebtoken", res.data.result.access_token);
            router.push("/");
          } else {
            console.log(
              "So'rov bajarildi lekin shartga tushmadi modules ni ichidagi auth.js ga qara validConfirmCode da"
            );
          }
        })
        .catch((err) => {
          context.commit("validcodeFailure");
          console.log("err.response.data", err.response.data);
        });
    });
  },
  registerUser(context, userData) {
    return new Promise(() => {
      context.commit("registerStart");
      http
        .post("/register", {
          phone: userData.phone,
          given_names: userData.given_names,
          sur_name: userData.sur_name,
          father_name: userData.father_name,
          gender: userData.gender,
          birthday: userData.birthday,
          key: userData.key,
        })
        .then(async (res) => {
          context.commit("registerSuccess");
          if (res.data.result.access_token) {
            localStorage.setItem("yallavebtoken", res.data.result.access_token);
            router.push("/");
          }
        })
        .catch((err) => {
          context.commit("registerFailure");
          console.log("err.response.data", err.response.data);
        });
    });
  },
  logoutUser(context) {
    return new Promise(() => {
      context.commit("logoutStart");
      http
        .post("/logout")
        .then(async (res) => {
          context.commit("logoutSuccess");
          router.push("/login");
          localStorage.removeItem("yallavebtoken");
          localStorage.removeItem("yallavebphone");
          localStorage.removeItem("yallavebkey");
          localStorage.removeItem("yallavebcode");
        })
        .catch((err) => {
          context.commit("logoutFailure");
          console.log("err.response.data", err.response.data);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
// const clearLocalStorage = () => {
//   localStorage.removeItem("yallavebtoken");
//   localStorage.removeItem("yallavebphone");
//   localStorage.removeItem("yallavebkey");
//   localStorage.removeItem("yallavebcode");
// };
// clearLocalStorage();
