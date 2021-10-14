import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

Vue.config.productionTip = false;

if (window.location.origin.includes("localhost")) {
  window.Config = {
    callback_url: "https://gr-v1.devam.pro",
    cdn_img_url: "https://gr-v1.devam.pro/public",
    cdn_raw_url: "https://gr-v1.devam.pro/public",
    s3_image_url: "https://s3.us-east-1.amazonaws.com/devam.pro/gr/master",
  };
}

var hostname = window.location.hostname;
var pathname = window.location.pathname;

if (hostname == "localhost") {
  Vue.prototype.$callback_url = "https://arun.devam.pro/gr";
} else if (pathname.includes("/gr/")) {
  Vue.prototype.$callback_url = "https://" + hostname + "/gr";
} else {
  Vue.prototype.$callback_url = "https://" + hostname;
}

Vue.prototype.$shop_id = "1953";
Vue.prototype.$email = "akash@appsmav.com";
Vue.prototype.$asset_url = `${Vue.prototype.$callback_url}/public`;

// Interceptors
Axios.interceptors.request.use(
  config => {
    console.log("requestData=====>", config);
    return config;
  },
  error => {
    console.log("error====>", error);
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  config => {
    console.log("responseData====>", config);
    return config;
  },
  error => {
    console.log("error====>", error);
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#email-app");
