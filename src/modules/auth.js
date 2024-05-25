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
    localStorage.removeItem("yallavebcode");
  },
  sedCodeSuccess(state) {
    state.isLoading = true;
  },
  sedCodeFailure(state) {
    state.isLoading = false;
    localStorage.removeItem("yallavebcode");
  },
};

const actions = {
  sendCode(context, phone) {
    return new Promise(() => {
      context.commit("sedCodeStart");
      AuthServise.sendSms(phone)
        .then(async (res) => {
          if (res.data.success) {
            const { code } = res.data.result;
            console.log("Verification code:", code);
            localStorage.setItem("yallavebphone", phone);
            localStorage.setItem("yallavebcode", code);
            router.push("/validcode");
          }
          context.commit("sedCodeSuccess");
          console.log(res);
        })
        .catch((err) => {
          context.commit("sedCodeFailure");
          console.log("err.response.data", err.response.data);
        });
    }); //+998883249955
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
