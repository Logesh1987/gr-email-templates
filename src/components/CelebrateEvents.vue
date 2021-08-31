<template>
  <div class="celebrateEvents">
    <div class="celebrateEventsInner">
      <h1>Get rewards for your events</h1>
      <div class="pointDiv">
        <div class="pointDivInner">
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
      </div>
      <h2>Enter your anniversary date</h2>
      <p>
        Some text here to explain how to earn more rewards plus second line.
      </p>
      <md-datepicker v-model="date" />
    </div>
    <p>
      <small
        >* Rewards will be given the following year, if date entered is in the
        next 14 days</small
      >
    </p>
  </div>
</template>
<script>
export default {
  name: "CelebrateEvents",
  components: {},

  data: function() {
    return {
      date: new Date().toISOString().substr(0, 10)
    };
  }
};
</script>
<style lang="less" scoped>
.celebrateEvents {
  width: 478px;
  border-radius: 4px;
  background: #ffc80a url(../assets/img/cake.png) right bottom no-repeat;
  padding: 50px;
  margin: 50px 60px;
  .celebrateEventsInner {
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 50px;
    h1 {
      color: #000;
      font-size: 32px;
      font-weight: 400;
      line-height: 32px;
      margin-top: 0;
      text-align: center;
    }
    .pointDiv {
      display: flex;
      margin: 20px 0 0;
      justify-content: center;
      position: relative;
      &:before {
        background: #fff;
        height: 1px;
        content: "";
        width: 100%;
        position: absolute;
        top: 50%;
      }
      .pointDivInner {
        background: #ffc80a;
        z-index: 1;
        display: flex;
        padding: 0 10px;

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
    }
    h2 {
      color: #000;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.19285715px;
      margin-bottom: 0;
      text-align: center;
    }
    p {
      color: #000;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      text-align: center;
    }
  }
  p small {
    width: 60%;
    display: inline-block;
    font-size: 10px;
    line-height: normal;
  }
}
</style>

<style lang="less">
.celebrateEvents {
  .md-datepicker {
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    background: #ffffff;
    padding: 10px;
    margin: 0;

    &.md-field .md-input-action {
      top: auto;

      i {
        margin-right: 0;
      }
    }

    .md-icon:after {
      display: none;
    }

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
  .celebrateEvents {
    .celebrateEventsInner {
      padding: 50px 25px;
    }
  }
}
</style>
