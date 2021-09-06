<template>
  <md-button class="md-raised md-primary" :md-ripple="false">{{
    btnName
  }}</md-button>
</template>
<script>
export default {
  name: "ButtonPrimary",
  props: ["btnName"]
};
</script>
<style lang="less">
:root {
  --md-theme-default-primary: #24c16f !important;
}
</style>
