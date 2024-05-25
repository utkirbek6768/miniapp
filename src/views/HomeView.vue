<template>
  <div class="home_wrapper">
    <div class="header_wrapper">
      <header>
        <nav>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
          <RouterLink to="/validcode">validcode</RouterLink>
          <RouterLink to="/abaut">Abaut</RouterLink>
        </nav>
      </header>
    </div>
    <!-- <div class="map_container">
      <GMapMap
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
      >
        <GMapCluster>
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
          />
        </GMapCluster>
      </GMapMap>
    </div> -->

    <div class="tarifs">
      <swiper :slidesPerView="3" :spaceBetween="10" class="mySwiper">
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 2</swiper-slide>
        <swiper-slide class="mySlide">Slide 3</swiper-slide>
        <swiper-slide class="mySlide">Slide 4</swiper-slide>
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

const center = ref({ lat: 51.093048, lng: 6.84212 });

const markers = ref([
  {
    position: {
      lat: 51.093048,
      lng: 6.84212,
    },
  },
]);

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
    const token = localStorage.getItem("yallavebtoken");
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
  //   localStorage.removeItem("yallavebtoken");
  //   localStorage.removeItem("yallavebphone");
  //   localStorage.removeItem("yallavebkey");
  //   localStorage.removeItem("yallavebcode");
  issetToken();
});
</script>

<style scoped>
.home_wrapper {
  height: 100%;
}
.map_container {
  height: 100%;
}
.header_wrapper {
  width: calc(100% - 2.6rem);
  position: absolute;
  left: 0;
  top: 0;
  padding: 1.3rem;
  z-index: 3;
  background-color: var(--tg-theme-bg-color, rgba(255, 245, 245, 0.5));
}
.vue-map-container {
  height: inherit;
}

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
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #222222);
  border-radius: 0.6rem;
  height: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
