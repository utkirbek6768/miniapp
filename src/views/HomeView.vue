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
      router.push("/login");
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
