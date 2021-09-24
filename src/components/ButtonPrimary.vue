<template>
  <md-button class="md-raised md-primary" :class="margin" :md-ripple="false">{{
    btnName
  }}</md-button>
</template>
<script>
export default {
  name: "ButtonPrimary",
  props: ['btnName', 'margin']
};
</script>
<style lang="less">
:root {
  --md-theme-default-primary: #448aff !important;
}
</style>
