<script setup>
import "swiper/css";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import http from "@/utils/axios";
import router from "@/router";
import { useGeolocation } from "../useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import { Swiper, SwiperSlide } from "swiper/vue";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const getMe = async () => {
  http
    .post("/me")
    .then((res) => {
      console.log(res.data.result.client);
    })
    .catch((err) => {
      console.log(err);
    });
};
const issetToken = async () => {
  try {
    const token = localStorage.getItem("yallavebtoken");
    if (token) {
      getMe();
    } else {
      router.push("/login");
      localStorage.removeItem("yallavebtoken");
      localStorage.removeItem("yallavebphone");
      localStorage.removeItem("yallavebkey");
      localStorage.removeItem("yallavebcode");
    }
  } catch (error) {
    console.log(error);
  }
};

// ===================map start=============================

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
const otherPos = ref(null);
const currentPosition = ref(""); // Address of the currentPosition
const otherAddress = ref(""); // Address of the clickedPosition

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;
let updateTimer = null;

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 15,
  });
  clickListener = map.value.addListener("click", debounceClick);

  // Fetch address when component mounts
  currentPosition.value = await getAddress(
    currPos.value.lat.toFixed(2),
    currPos.value.lng.toFixed(2)
  );
});
const getAddress = async (lat, lng) => {
  try {
    const res = await http.get("/map/geocoding", {
      params: { lat, lng },
    });
    if (!res || !res.data || !res.data.result || !res.data.result.name) {
      console.log("Address not found");
      return;
    }
    return res.data.result.name;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
// Watch for changes in currPos to update address
watch(currPos, async (newPos) => {
  currentPosition.value = await getAddress(
    newPos.lat.toFixed(2),
    newPos.lng.toFixed(2)
  );
});

onUnmounted(() => {
  if (clickListener) clickListener.remove();
  if (updateTimer) clearTimeout(updateTimer);
});

const debounceClick = async ({ latLng: { lat, lng } }) => {
  if (updateTimer) clearTimeout(updateTimer);
  updateTimer = setTimeout(async () => {
    otherPos.value = { lat: lat(), lng: lng() };
    otherAddress.value = await getAddress(lat(), lng()); // Fetch address for the clicked position
  }, 300);
};

let line = null;
watch([map, currPos, otherPos], () => {
  if (line) line.setMap(null);
  if (map.value && otherPos.value != null)
    line = new google.maps.Polyline({
      path: [currPos.value, otherPos.value],
      map: map.value,
    });
});

const haversineDistance = (pos1, pos2) => {
  const R = 6371.071; // Radius of the Earth in kilometers
  const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitude)
  const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitude)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};

const distance = computed(() =>
  otherPos.value === null ? 0 : haversineDistance(currPos.value, otherPos.value)
);

onMounted(async () => {
  issetToken();
});
</script>

<template>
  <div class="home_wrapper">
    <div ref="mapDiv" style="width: 100%; height: 100vh" />
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

<style scoped>
.home_wrapper {
  height: 100%;
}
.map_container {
  height: 100%;
}
.header_wrapper {
  width: calc(100% - 0rem);
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem;
  z-index: 3;
  background: transparent;
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
  z-index: 3;
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
