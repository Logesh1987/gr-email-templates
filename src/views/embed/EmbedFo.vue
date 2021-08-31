// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="embedFo">
    <header>
      <button
        :class="{ open: showMobileMenu }"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      LOGO
    </header>
    <nav v-if="showMobileMenu">
      <ul>
        <li>Our Rewards</li>
        <li>Winners</li>
        <li>Referral</li>
        <li>Earn Rewards</li>
      </ul>
    </nav>
    <nav class="desktopMenu" v-if="!showMobileMenu">
      <ul>
        <li>Our Rewards</li>
        <li>Winners</li>
        <li>Referral</li>
        <li>Earn Rewards</li>
      </ul>
    </nav>
    <div class="heroBanner">
      <div class="heroTxt">
        <div>
          <small>Welcome to the</small>
          <h1>Loyalty Program</h1>
        </div>
        <p>
          Some text here to explain how to earn more rewards plus second line.
        </p>
      </div>
    </div>
    <div class="ourRewards">
      <h2>Our Rewards</h2>
      <CarouselslideFo />
      <md-button class="md-raised md-primary">View all photos</md-button>
    </div>
    <div class="howitWorks">
      <div class="howitWorksInner">
        <div class="paddLR20Percent">
          <h2>How it works</h2>
          <ol>
            <li>Signup</li>
            <li>Earn Points</li>
            <li>Redeem Rewards</li>
          </ol>
        </div>
      </div>
      <div class="imgDiv">
        <img src="../../assets/img/howitworks_banner.png" alt="" />
      </div>
    </div>
    <div class="recentWinners">
      <div class="imgDiv">
        <img src="../../assets/img/winner_banner.png" alt="" />
      </div>
      <div class="recentWinnersInner">
        <div class="paddLR20Percent">
          <h2>Recent Winners</h2>
          <h3>Mr Krishna Mahesh</h3>
          <p>
            (MD, Sundaram Brake Linings and son of alumnus Mr K. Mahesh
            [1965/BT/MT])
          </p>
          <md-button class="md-raised md-primary">View Winners List</md-button>
        </div>
      </div>
    </div>
    <div class="subscribe">
      <div class="subscribeInner">
        <h2>Subscribe to our Newsletter</h2>
        <div class="inputBox">
          <md-field md-inline>
            <label>Email Address</label>
            <md-input v-model="inline"></md-input>
            <md-button class="md-raised md-primary"
              >View Publications</md-button
            >
          </md-field>
        </div>
      </div>
    </div>
    <div class="offerBanner">
      <div class="offerTxt">
        <h2>Give 50. Get 100</h2>
        <div class="bg">
          <h3>Refer your friends now</h3>
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
              ><img src="../../assets/img/Facebook_icon.svg" alt=""
            /></md-button>
            <md-button class="md-raised"
              ><img src="../../assets/img/in_icon.svg" alt=""
            /></md-button>
            <md-button class="md-raised"
              ><img src="../../assets/img/twitter_icon.svg" alt=""
            /></md-button>
            <md-button class="md-raised"
              ><img src="../../assets/img/instagram_icon.svg" alt=""
            /></md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="celebrateEvents">
      <div class="imgDiv">
        <img src="../../assets/img/celebrate_banner.png" alt="" />
      </div>
      <div class="celebrateEventsInner">
        <div class="paddLR20Percent">
          <h2>Celebrate Events</h2>
          <p>
            Some text here to explain how to earn more rewards plus second line.
          </p>
          <md-datepicker v-model="date" />
          <md-button class="md-raised md-primary">SUBMIT</md-button>
          <small
            >* Rewards will be given the following year, if date entered is in
            the next 14 days</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselslideFo from "../../components/CarouselslideFo.vue";
export default {
  name: "EmailFo",
  components: {
    CarouselslideFo
  },
  data: function() {
    return {
      showMobileMenu: false,
      referralCode: "amaze.me/urlhere/Referral",
      date: new Date().toISOString().substr(0, 10),
      inline: ""
    };
  },
  mixins: [""],
  computed: {},
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
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.embedFo {
  margin: 0 auto;
  max-width: 1600px;
  background: #fff;
  font-family: "Montserrat", serif;
  header {
    background: #8d6e3e;
    font-size: 32px;
    padding: 20px 50px;
    color: #fff;
    font-weight: bold;
    line-height: 24px;
    margin-top: 25px;
    font-family: "DM Sans", serif;
    position: relative;
    button {
      display: none;
    }

    @media only screen and (max-width: 599px) {
      padding: 20px 10px;
      display: flex;
      justify-content: center;
      margin-top: 5px;
      button {
        width: 25px;
        height: 22px;
        position: absolute;
        cursor: pointer;
        display: block;
        background: transparent;
        left: 10px;
        border: 0;
        top: 21px;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.5s ease-in-out;
        -moz-transition: 0.5s ease-in-out;
        -o-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        span {
          display: block;
          position: absolute;
          height: 4px;
          width: 50%;
          background: #ffffff;
          opacity: 1;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: 0.25s ease-in-out;
          -moz-transition: 0.25s ease-in-out;
          -o-transition: 0.25s ease-in-out;
          transition: 0.25s ease-in-out;
        }

        span:nth-child(even) {
          left: 50%;
          border-radius: 0 9px 9px 0;
        }

        span:nth-child(odd) {
          left: 0px;
          border-radius: 9px 0 0 9px;
        }

        span:nth-child(1),
        span:nth-child(2) {
          top: 0px;
        }

        span:nth-child(3),
        span:nth-child(4) {
          top: 10px;
        }

        span:nth-child(5),
        span:nth-child(6) {
          top: 20px;
        }

        &.open span:nth-child(1),
        &.open span:nth-child(6) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        &.open span:nth-child(2),
        &.open span:nth-child(5) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }

        &.open span:nth-child(1) {
          left: 0px;
          top: 5px;
        }

        &.open span:nth-child(2) {
          left: calc(50% - 4px);
          top: 5px;
        }

        &.open span:nth-child(3) {
          left: -50%;
          opacity: 0;
        }

        &.open span:nth-child(4) {
          left: 100%;
          opacity: 0;
        }

        &.open span:nth-child(5) {
          left: 0px;
          top: 13px;
        }

        &.open span:nth-child(6) {
          left: calc(50% - 4px);
          top: 13px;
        }
      }
    }
  }
  nav {
    background: #005964;
    font-size: 14px;
    color: #fff;
    line-height: 17px;
    font-family: "Montserrat", serif;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      li {
        list-style-type: none;
        margin: 0 2vw;
        padding: 10px;
        cursor: pointer;
        &:hover,
        &.active {
          background: rgba(51, 121, 132, 0.4);
        }
      }
    }

    @media only screen and (max-width: 599px) {
      &.desktopMenu {
        display: none;
      }
      ul {
        flex-direction: column;
        li {
          margin: 0;
        }
      }
    }
  }
  .heroBanner {
    /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../../assets/img/hero_banner.png");

    /* Set a specific height */
    height: 500px;

    /* Position and center the image to scale nicely on all screens */
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    /* Place text in the middle of the image */
    .heroTxt {
      position: absolute;
      bottom: 15%;
      right: 0;
      padding: 30px;
      color: white;
      background: rgba(0, 89, 100, 0.8);
      display: flex;
      width: 50%;
      font-family: "DM Sans", serif;
      div:first-child {
        border-right: 1px solid rgba(255, 255, 255, 0.8);
        margin-right: 20px;
        padding-right: 20px;
      }
      small {
        font-size: 22px;
        font-weight: bold;
        line-height: 33px;
      }
      h1 {
        font-size: 70px;
        font-weight: bold;
        line-height: 60px;
        margin: 10px 0;
      }
      p {
        font-size: 19px;
      }

      @media only screen and (max-width: 989px) {
        width: auto;
        flex-direction: column;
        div:first-child {
          border-right: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
          padding-bottom: 20px;
          margin-right: 0;
          padding-right: 0;
        }
      }
    }
  }
  .ourRewards {
    margin: 25px 0;
    text-align: center;

    h2 {
      font-size: 50px;
      line-height: normal;
      margin: 0 0 20px;
      color: #000;
      font-family: "DM Sans", serif;
      text-align: center;
    }
    button.md-button.md-raised.md-primary.md-theme-default {
      background: #f4f4f4 !important;
      border-radius: 0;
      font-size: 14px;
      text-transform: uppercase;
      color: #555;
      font-family: "DM Sans", serif;
      border: none;
      margin: 25px 0;
    }
  }
  .offerBanner {
    /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../../assets/img/offer_banner.png");

    /* Set a specific height */
    height: 500px;

    /* Position and center the image to scale nicely on all screens */
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    /* Place text in the middle of the image */
    .offerTxt {
      position: absolute;
      bottom: 15%;
      left: 10%;
      width: 40%;
      font-family: "DM Sans", serif;
      color: white;

      .bg {
        padding: 30px;
        background: rgba(0, 89, 100, 0.8);
      }

      @media only screen and (max-width: 989px) {
        width: auto;
        flex-direction: column;
      }

      h2 {
        font-size: 50px;
        line-height: normal;
        margin: 0 0 20px;
      }
      h3 {
        font-size: 30px;
        margin: 0 0 20px;
        line-height: normal;
      }

      @media only screen and (max-width: 599px) {
        left: 5%;
        width: 90%;
        h2 {
          font-size: 30px;
        }
        h3 {
          font-size: 20px;
        }
      }

      .md-button-group {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .md-button.md-theme-default.md-raised {
          border: 1px solid #fff;
          background: none;
          border-left: none;
          border-radius: 0;
          min-width: 25%;
          min-height: 50px;
          padding: 0;

          &:first-child {
            border-left: 1px solid #fff;
          }

          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }
  }
  .celebrateEvents,
  .recentWinners,
  .howitWorks {
    display: flex;
    align-items: stretch;
    margin: 25px 0;
    .imgDiv {
      flex: 1;
      width: 50%;
      img {
        width: 100%;
      }
    }
    .celebrateEventsInner,
    .recentWinnersInner,
    .howitWorksInner {
      background: #e2ddd6;
      flex: 1;
      width: 50%;
      display: flex;
      align-items: center;
      .paddLR20Percent {
        padding: 0 20%;
      }
      h2 {
        font-size: 51px;
        font-family: "DM Sans", serif;
        font-weight: bold;
        margin: 0;
        line-height: 51px;
        color: #000;
      }
      p {
        font-size: 22px;
        font-family: "DM Sans", serif;
      }
      small {
        font-size: 12px;
        font-family: "DM Sans", serif;
        display: block;
        width: 60%;
        line-height: 12px;
      }
      .md-datepicker {
        border-radius: 0;
      }
      button.md-button.md-raised.md-primary.md-theme-default {
        background: #8d6e3e !important;
        border-radius: 0;
        font-size: 12px;
        margin: 20px 0;
        text-transform: uppercase;
        font-family: "DM Sans", serif;
      }
    }
    .recentWinnersInner {
      background: #ffffff;
      h3 {
        font-size: 25px;
        font-family: "DM Sans", serif;
        font-weight: bold;
        color: #000;
      }
    }
    .howitWorksInner {
      ol {
        padding: 0;
        list-style-position: inside;
        font-size: 20px;
        color: #8d6e3e;
        text-transform: uppercase;
        line-height: 29px;
      }
    }
    @media only screen and (max-width: 989px) and (min-width: 700px) {
      .celebrateEventsInner,
      .recentWinnersInner,
      .howitWorksInner {
        .paddLR20Percent {
          padding: 0 20px;
        }
        h2 {
          font-size: 25px;
          line-height: 25px;
        }
        h3 {
          font-size: 20px;
        }
        p {
          font-size: 16px;
        }
        .md-field {
          width: 70%;
        }
      }
    }
    @media only screen and (max-width: 699px) {
      flex-direction: column;
      .imgDiv,
      .celebrateEventsInner,
      .recentWinnersInner,
      .howitWorksInner {
        flex: auto;
        width: 100%;
        .paddLR20Percent {
          padding: 10% 20px;
        }
        .md-field {
          width: 100%;
        }
      }
    }
  }
  .howitWorks {
    @media only screen and (max-width: 699px) {
      flex-direction: column-reverse;
    }
  }
  .subscribe {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../../assets/img/subscribe_banner.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 50px;
    padding: 100px 0;
    display: flex;
    justify-content: center;

    .subscribeInner {
      width: 70%;
    }

    h2 {
      font-size: 50px;
      line-height: normal;
      margin: 0 0 20px;
      color: #fff;
      font-family: "DM Sans", serif;
    }
    button.md-button.md-raised.md-primary.md-theme-default {
      background: #8d6e3e !important;
      border-radius: 0;
      font-size: 12px;
      text-transform: uppercase;
      font-family: "DM Sans", serif;
    }
  }
}
</style>

<style lang="less">
.offerBanner,
.subscribe {
  .md-field {
    border-radius: 0px;
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
      color: #000;
    }
  }
}
</style>
