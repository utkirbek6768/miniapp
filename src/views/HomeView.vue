<template>
  <div class="home_wrapper">
    <header>
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/validcode">validcode</RouterLink>
        <RouterLink to="/abaut">Abaut</RouterLink>
      </nav>
      {{ text }}
      <RouterView />
    </header>
    <button @click="reqresIn()">ReqresIn</button>
    <button @click="yalla()">YALLA</button>
    <button @click="yalla1()">YALLA1</button>
    <button @click="yalla2()">YALLA2</button>
    <div class="tarifs">
      <swiper :slidesPerView="3" :spaceBetween="10" class="mySwiper">
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import http from "@/utils/axios";
import router from "@/router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const text = ref(null);

const reqresIn = () => {
  const apiUrl = `https://reqres.in/api/users`;
  fetch(apiUrl, {
    method: "POST",
    data: {
      name: "paul rudd",
      movies: ["I Love You Man", "Role Models"],
    },
  })
    .then((res) => {
      console.log("bu data:", res);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

const yalla = () => {
  const apiUrl = `http://api.ildam.uz:1701/cli/client`;
  fetch(apiUrl, {
    method: "POST",
    "brand-id": "2",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: "998905376768",
    }),
  })
    .then((res) => {
      const response = JSON.stringify(res);
      sendMsg(response);
    })
    .catch((error) => {
      const err = JSON.stringify(error);
      sendMsg(err);
    });
};
const yalla1 = () => {
  const apiUrl = `http://api.ildam.uz:1701/cli/client`;
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: "998905376768",
    }),
  })
    .then((res) => {
      const response = JSON.stringify(res);
      sendMsg(response);
    })
    .catch((error) => {
      const err = JSON.stringify(error);
      sendMsg(err);
    });
};

const yalla2 = () => {
  const apiUrl = `http://ildam-api.loc/client`;
  fetch(apiUrl, {
    method: "POST",
    "brand-id": "2",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: "998905376768",
    }),
  })
    .then((res) => {
      const response = JSON.stringify(res);
      sendMsg(response);
    })
    .catch((error) => {
      const err = JSON.stringify(error);
      sendMsg(err);
    });
};

const sendMsg = (msg) => {
  // Constants
  const botToken = "6978212908:AAEjdFxJgAWe3ToUT-cz6qhjot-8qkUqIRU";
  const chatId = 177482674;
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${msg}`;
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent:", data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// =================================
const getMe = async () => {
  http
    .post("/me")
    .then((res) => {
      text.value = res.data.result.client;
    })
    .catch((err) => {
      text.value = err;
    });
};
const issetToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      getMe();
    } else {
      router.push("/");
    }
    console.log(token ? token : "token topilmadi");
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  issetToken();
});
</script>

<style scoped>
.tarifs {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 1.3rem;
  left: 1.3rem;
  width: calc(100% - 2.6rem);
}
.tarifs .mySwiper {
  height: 100%;
}
.tarifs .mySwiper .mySlide {
  border: 1px solid blue;
  border-radius: 0.6rem;
  height: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
