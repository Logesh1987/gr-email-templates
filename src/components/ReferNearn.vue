<template>
  <div class="referNearn">
    <div class="imgDiv">
      <img src="../assets/img/refer_earn_header.png" alt="" />
    </div>
    <div class="referNearnInner">
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
      <h2>Refer. Earn</h2>
      <p>You get 100 reward points. Your friend get $30.</p>
      <md-field md-inline>
        <label>{{ referralCode }}</label>
        <md-input
          v-model="inline"
          type="text"
          id="testing-code"
          disabled
        ></md-input>
        <span
          matPrefix
          class="material-icons"
          @click.stop.prevent="copyTestingCode"
        >
          content_copy
        </span>
      </md-field>
      <div class="md-button-group">
        <md-button class="md-raised"
          ><img src="../assets/img/Facebook_icon.svg" alt=""
        /></md-button>
        <md-button class="md-raised"
          ><img src="../assets/img/in_icon.svg" alt=""
        /></md-button>
        <md-button class="md-raised"
          ><img src="../assets/img/twitter_icon.svg" alt=""
        /></md-button>
        <md-button class="md-raised"
          ><img src="../assets/img/instagram_icon.svg" alt=""
        /></md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReferNearn",
  components: {},

  data: function() {
    return {
      referralCode: "amaze.me/urlhere/Referral",
      inline: ""
    };
  },
  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Testing code was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "text");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>
<style lang="less" scoped>
.referNearn {
  width: 478px;
  background: #fff;
  margin: 50px 60px;
  .imgDiv {
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  .referNearnInner {
    padding: 50px;
    border: 1px solid #e8e8e8;
    border-top: none;
    .pointDiv {
      display: flex;
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
      color: #000;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.19285715px;
      margin-bottom: 0;
    }
    p {
      color: #000;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
    }

    .md-button-group {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .md-button.md-theme-default.md-raised {
        border: 1px solid #dfdfdf;
        border-left: none;
        border-radius: 0;
        min-width: 25%;
        min-height: 50px;
        padding: 0;

        &:first-child {
          border-left: 1px solid #dfdfdf;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.referNearn {
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
      cursor: pointer;
    }
  }
}

.mobileActive {
  .referNearn {
    .referNearnInner {
      padding: 25px;
      text-align: center;
      .pointDiv {
        justify-content: center;
      }
    }
  }
}
</style>
