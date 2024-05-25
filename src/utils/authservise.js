import http from "@/utils/axios";

const authServise = {
  sendSms(phone) {
    return http.post("/client", { phone });
  },
  validCode(userData) {
    return http.post("/valid", { userData });
  },
};

export default authServise;
