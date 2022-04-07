<template>
  <header class="amvip--header" v-if="showBanner">
    <div class="amvip--headerLogo">
      <span class="vipTierLogoSmall"></span>
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
