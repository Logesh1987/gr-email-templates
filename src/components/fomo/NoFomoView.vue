<template>
  <div class="noData">
    <figure>
      <img :src="getAssetUrl(`admin/no-contest.jpg`)" />
    </figure>
    <figcaption>
      <h3>No Fomos Found</h3>
      <p>Create one from the list beside</p>
      <br />
      <p>
        You can run multiple FOMOs to populate your following and drive more
        sales on ordinary days or specific occasions.
      </p>
      <div>
        <h4 class="mt-0 mb-10">What is FOMO Marketing?</h4>
        <p>
          FOMO is a form of marketing where you leverage the consumers’ desire
          to grab every opportunity that they get. The messaging in it is framed
          such that you push the customers to make an impulse purchase rather
          than regretting the lack of action later.
        </p>
      </div>
    </figcaption>
  </div>
</template>
<script>
export default {
  name: "NoFomoView",
  mixins: ["getAssetUrl"]
};
</script>
<style lang="less" scoped>
.noData::v-deep {
  background-color: #fff;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  color: #000;
  h3 {
    color: #2196f3;
    font-size: 1.5em;
    margin: 0;
  }
  p {
    font-size: 0.9em;
    margin: 0.6em 0;
  }
  figure {
    width: 50%;
    margin: 0;
  }
  figcaption {
    width: 50%;
    div {
      background: #eee;
      padding: 10px;
      margin-top: 20px;
      font-size: 0.9em;
      position: relative;
      &:before {
        content: "\f10e";
        font-family: "Font Awesome 5 Pro";
        font-weight: bold;
        font-size: 32px;
        position: absolute;
        right: 0.4em;
        top: -0.3em;
        opacity: 0.5;
      }
    }
  }
  h4 {
    color: rgba(0, 0, 0, 0.5);
    & + p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
    }
  }
}
</style>
