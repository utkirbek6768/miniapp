import http from "@/utils/axios";
import router from "@/router";
import AuthServise from "@/utils/authservise";

const state = {
  isLoading: false,
};

const mutations = {
  sedCodeStart(state) {
    state.isLoading = true;
  },
  sedCodeSuccess(state) {
    state.isLoading = false;
  },
  sedCodeFailure(state) {
    state.isLoading = false;
  },
};
const actions = {
  sendCode(context, phone) {
    return new Promise(() => {
      context.commit("sedCodeStart");
      AuthServise.sendSms(phone)
        .then((res) => {
          context.commit("sedCodeSuccess");
          console.log(res);
        })
        .catch((err) => {
          context.commit("sedCodeFailure");
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
