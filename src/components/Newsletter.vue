<template>
  <div class="newsLetter">
    <div class="imgDiv">
      <img src="../assets/img/signup_newsletter.png" alt="" />
    </div>
    <div class="pointDiv">
      <span class="material-icons">
        card_giftcard
      </span>
      <div>
        <span class="material-icons">
          stars
        </span>
        <span>100</span>
      </div>
    </div>
    <h2>Sign up to our Newsletter.</h2>
    <p>Get 100 Instant reward points</p>
    <md-field md-inline>
      <label>Inline</label>
      <md-input v-model="inline"></md-input>
      <span matPrefix class="material-icons">
        east
      </span>
    </md-field>
  </div>
</template>
<script>
export default {
  name: "Newsletter",
  components: {},

  data: function() {
    return {
      inline: ""
    };
  }
};
</script>
<style lang="less" scoped>
.newsLetter {
  width: 478px;
  border-radius: 4px;
  background: radial-gradient(circle, #733fda, #191272);
  padding: 50px;
  margin: 50px 60px;
  .imgDiv {
    text-align: center;
    margin-top: 50px;
  }
  .pointDiv {
    display: flex;
    margin: 20px 0 0;
    span.material-icons {
      margin-right: 4px;
      border: 1px solid #8f75be;
      border-radius: 50%;
      color: #8f75be;
      font-size: 18px;
      padding: 6px;
    }
    div {
      background: #8f75be;
      border-radius: 25px;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 4px 10px 4px 4px;
      span.material-icons {
        color: #fff;
        margin-right: 4px;
        font-size: 24px;
        padding: 0;
      }
    }
  }
  h2 {
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.19285715px;
    margin-bottom: 0;
  }
  p {
    color: #ffffff;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
  }
}
</style>

<style lang="less">
.newsLetter {
  .md-field {
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    background: #ffffff;
    padding: 15px;
    margin: 0;

    &:after,
    &:before {
      height: 0;
    }

    label {
      left: 15px;
    }

    .material-icons {
      margin-top: 5px;
    }
  }
}
.mobileActive {
  .newsLetter {
    padding: 50px 25px;
  }
}
</style>
