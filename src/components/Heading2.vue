<template>
  <h2>{{ heroHeading }} {{ dynamicValue }}</h2>
</template>

<script>
export default {
  name: "Heading2",
  props: ['heroHeading', 'dynamicValue'],
};
</script>
<style lang="less">
</style>
