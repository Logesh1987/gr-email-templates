<template>
  <header class="amvip--header" v-if="showBanner">
    <div class="amvip--headerLogo">
      <img src="./../../assets/vip-tier/vip-tier-logo.png" alt="Logo" />
      <div>
        VIP <span>Tiers</span>
        <small>Beta</small>
      </div>
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
