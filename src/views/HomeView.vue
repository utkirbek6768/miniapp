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
  try {
    const res = await http.post("/me");
    console.log(res.data.result.client);
  } catch (err) {
    console.error(err);
  }
};

const issetToken = () => {
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
};

// ===================map start=============================

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
const otherPos = ref(null);
const currentAddress = ref(""); // Address of the currentAddress
const otherAddress = ref(""); // Address of the clickedPosition

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;
let updateTimer = null;

const getAddress = async (lat, lng) => {
  try {
    const res = await http.get("/map/geocoding", { params: { lat, lng } });
    if (!res?.data?.result?.name) {
      console.log("Address not found");
      return "";
    }
    return res.data.result.name;
  } catch (error) {
    console.error("Error fetching address:", error);
    return "";
  }
};

// Watch for changes in currPos to update address
watch(currPos, async (newPos) => {
  currentAddress.value = await getAddress(
    newPos.lat.toFixed(2),
    newPos.lng.toFixed(2)
  );
});

const debounceClick = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const handleMapClick = async ({ latLng: { lat, lng } }) => {
  otherPos.value = { lat: lat(), lng: lng() };
  otherAddress.value = await getAddress(lat(), lng());
};

const debouncedHandleMapClick = debounceClick(handleMapClick, 300);

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 15,
    disableDefaultUI: true, // Disables all default controls
  });
  clickListener = map.value.addListener("click", debouncedHandleMapClick);

  // Fetch address when component mounts
  currentAddress.value = await getAddress(
    currPos.value.lat.toFixed(2),
    currPos.value.lng.toFixed(2)
  );

  issetToken();
});

onUnmounted(() => {
  if (clickListener) clickListener.remove();
  if (updateTimer) clearTimeout(updateTimer);
});

let line = null;
watch([map, currPos, otherPos], () => {
  if (line) line.setMap(null);
  if (map.value && otherPos.value)
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
  otherPos.value ? haversineDistance(currPos.value, otherPos.value) : 0
);
</script>

<template>
  <div class="home_wrapper">
    <div class="tarifs_control">
      <div class="where">
        <div class="disc"></div>
        <div class="where_address">
          {{ currentAddress }}
        </div>
      </div>
      <div class="whereto">
        <div class="disc"></div>
        <div class="whereto_address">
          {{ otherAddress ? otherAddress : "Manzilni kiriting" }}
        </div>
      </div>
    </div>
    <div class="tarifsInSwiper">
      <swiper :slidesPerView="3" :spaceBetween="10" class="mySwiper">
        <swiper-slide class="mySlide">Slide 1</swiper-slide>
        <swiper-slide class="mySlide">Slide 2</swiper-slide>
        <swiper-slide class="mySlide">Slide 3</swiper-slide>
        <swiper-slide class="mySlide">Slide 4</swiper-slide>
      </swiper>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 100vh" />
  </div>
</template>

<style scoped>
.tarifs_control {
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% - 1rem);
  z-index: 3;
  padding: 0.7rem;
  background-color: transparent;
  border-radius: 15px;
  margin: 0.5rem;
  background-color: #ffffff;
}
.where,
.whereto {
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 13px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.disc {
  /* #912DF8 */
  border: 5px solid #00d17e;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  margin-right: 0.7rem;
}
.whereto {
  margin-bottom: 0px;
}
</style>
