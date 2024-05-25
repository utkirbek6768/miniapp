import http from "@/utils/axios";

const authServise = {
  sendSms(phone) {
    return http.post("/client", { phone });
  },
};

export default authServise;
