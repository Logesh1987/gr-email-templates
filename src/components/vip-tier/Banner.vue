<template>
  <header class="amvip--header" v-if="showBanner">
    <div class="amvip--headerLogo">
      <span class="icon-crown"></span>
      <div>
        <h2>VIP</h2>
        <h3>Tiers</h3>
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
