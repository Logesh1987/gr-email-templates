<template>
  <header class="amvip--header" v-if="showBanner">
    <div class="amvip--headerLogo">
      <span class="icon-vip-crown"></span>
      VIP <span>Tiers</span>
      <small>Beta</small>
    </div>
  </header>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
</style>
<script>
export default {
  name: "VipBanner",
  props: ["showBanner"],
};
</script>
