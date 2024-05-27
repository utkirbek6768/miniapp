import http from "@/utils/axios";
import router from "@/router";
import AuthServise from "@/utils/authservise";

const state = {
  isLoading: false,
  useTimer: false,
};

const mutations = {
  sedCodeStart(state) {
    state.isLoading = true;
    localStorage.removeItem("yallavebtoken");
  },
  sedCodeSuccess(state) {
    state.isLoading = false;
    state.useTimer = true;
  },
  sedCodeFailure(state) {
    state.isLoading = false;
    state.useTimer = false;
  },
  //=================sedCodeStart=======================
  validcodeStart(state) {
    state.isLoading = true;
  },
  validcodeSuccess(state) {
    state.isLoading = false;
  },
  validcodeFailure(state) {
    state.isLoading = false;
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
};

const actions = {
  sendCode(context, phone) {
    return new Promise(() => {
      context.commit("sedCodeStart");
      AuthServise.sendSms(phone)
        .then(async (res) => {
          if (res.data.success) {
            context.commit("sedCodeSuccess");
            localStorage.setItem("yallavebphone", phone);
            router.push("/validcode");
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
      AuthServise.validCode(userData)
        .then(async (res) => {
          console.log(res.data.result);
          context.commit("validcodeSuccess");
          if (res.data.result.key) {
            localStorage.setItem("yallavebkey", res.data.result.key);
            router.push("/register");
          } else if (res.data.result.access_token) {
            localStorage.setItem("yallavebtoken", res.data.result.access_token);
            router.push("/");
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
      AuthServise.register(userData)
        .then(async (res) => {
          console.log(res.data.result);
          context.commit("registerSuccess");
          router.push("/");
          //   if (res.data.result.key) {
          //     localStorage.setItem("yallavebkey", res.data.result.key);
          //     router.push("/register");
          //   } else if (res.data.result.access_token) {
          //     localStorage.setItem("yallavebtoken", res.data.result.access_token);
          //   }
        })
        .catch((err) => {
          context.commit("registerFailure");
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
