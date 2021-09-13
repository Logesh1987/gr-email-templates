<template>
  <div>
    <div class="heroBanner" v-for="(hero, index) in heroBanner" :key="index">
      <h2>{{ hero.heroHeading }}</h2>
      <p>{{ hero.heroDesc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroBanner",
  props: ["heroBanner"],
};
</script>
<style lang="less">
.heroBanner {
  background: #010f49 url(../assets/img/bg-heading-faq.jpg) no-repeat left
    center;
  background-size: cover;
  color: #fff;
  overflow: hidden;
  height: 115px;
  display: flex;
  align-items: center;
  padding: 15px 15%;
  margin-bottom: 20px;
  h2 {
    font-size: 18px;
    margin: 0;
    padding-right: 50px;
    margin-right: 50px;
    border-right: 1px solid #ddd;
    color: #ffffff;
  }
  p {
    color: #e6991c;
    margin: 0;
  }
}
</style>
