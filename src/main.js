import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueGoogleMaps from "@fawmi/vue-google-maps";

const googlekey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const app = createApp(App);

app.use(router);
app.use(store);
// app.use(VueGoogleMaps, {
//   load: {
//     key: googlekey, // Replace with your actual API key
//     libraries: "places", // This is optional if you need to use the places library
//   },
// });

app.mount("#app");
