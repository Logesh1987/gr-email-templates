<template>
  <h3>{{ heroHeading }} {{ dynamicValue }}</h3>
</template>

<script>
export default {
  name: "Heading3",
  props: ['heroHeading', 'dynamicValue'],
};
</script>
<style lang="less">
</style>
