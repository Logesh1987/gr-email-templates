<template>
  <div id="shellWrapper" :class="getBannerClass()">
    <VipBanner :showBanner="showBanner"></VipBanner>
    <router-view></router-view>
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
export default {
  name: "Shell",
  components: { VipBanner },
  data: function() {
    return {
      showBanner: false,
    };
  },
  mounted() {
    const urlName = this.$route.name;
    this.toggleBanner(urlName);
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
