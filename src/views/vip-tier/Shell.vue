<template>
  <div id="shellWrapper" :class="getBannerClass()">
    <VipBanner :showBanner="showBanner"></VipBanner>
    <router-view></router-view>
    <Loader :status="loader"></Loader>
    <md-snackbar
      :md-position="'center'"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ responseData }}</span>
    </md-snackbar>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/style");
#shellWrapper {
  position: relative;
  .noBanner .amvip--landingGrey {
    padding-top: 0;
  }
}
</style>
<script>
import "./../../assets/vip-tier/font.css";
import VipBanner from "./../../components/vip-tier/Banner";
import Loader from "./../../components/Loader";
import Axios from "axios";
export default {
  name: "Shell",
  components: { VipBanner, Loader },
  data: function() {
    return {
      showBanner: false,
      loader: false,
      showSnackbar: false,
      responseData: "",
    };
  },
  mounted() {
    const urlName = this.$route.name;
    this.toggleBanner(urlName);

    // Interceptors
    Axios.interceptors.request.use(
      (config) => {
        console.log("requestData=====>", config);
        this.loader = true;
        return config;
      },
      (error) => {
        console.log("Request error====>", error);
        this.loader = false;
        return Promise.reject(error);
      }
    );
    Axios.interceptors.response.use(
      (config) => {
        console.log("responseData====>", config);
        if (
          config.config.method.toLowerCase() != "get" &&
          !config.config.url.includes("S3Uploader/tier")
        ) {
          this.showSnackbar = false;
          this.responseData = config.data.data.message;
          this.showSnackbar = true;
        }
        this.loader = false;
        return config;
      },
      (error) => {
        console.log("Response error====>", error);
        this.loader = false;
        return Promise.reject(error);
      }
    );
  },
  methods: {
    getBannerClass() {
      return !this.showBanner ? "noBanner" : "";
    },
    toggleBanner(name) {
      const bannerDisabledRoutes = ["Home", "Intro", "Setup"];
      this.showBanner = !(bannerDisabledRoutes.indexOf(name) > -1);
    },
  },
  watch: {
    $route(to) {
      this.toggleBanner(to.name);
    },
  },
};
</script>
