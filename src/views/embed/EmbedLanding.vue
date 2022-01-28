<template>
  <div class="embedLanding">
    <div class="noCampaignWrapper">
      <h3 class="heading">No Embed Campaign Page created</h3>
      <h5 class="SubHeading">Create your own custom campaign page design</h5>
      <figure class="campaign-img"></figure>
      <md-button class="md-raised md-primary primaryBtn mt-10"
        >Create Campaign Page</md-button
      >
    </div>
    <div class="campaignWrapper" style="display:none;">
      <header class="pageHeader">
        <i class="fal fa-laptop-code"></i>
        Embed Campaign
      </header>
      <header class="subPageHeadder">
        <div class="leftArea">
          <span class="title"> Campaign Pages</span>
          <md-field class="searchBox">
            <label>Search</label>
            <md-input v-model="searchText"></md-input>
          </md-field>
        </div>
        <div class="rightArea">
          <md-button class="md-raised md-primary primaryBtn"
            >Create Campaign Page</md-button
          >
        </div>
      </header>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "../../components/Footer.vue";

export default {
  name: "EmailListing",
  components: {
    Footer,
  },
  data: function() {
    return {
      message: "",
      searchText: "",
    };
  },
  mixins: ["createFormData"],
  computed: {},
  methods: {
    doCopy() {
      let codeToCopy = document.querySelector("#copiedText");
      codeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Embed code was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }
    },
  },
  mounted: function() {
    axios
      .get("https://run.mocky.io/v3/200413b9-05f1-4d42-bde2-1ebca27290d4")
      .then((res) => {
        this.message = res.data.embedCode;
      });
  },
};
</script>

<style lang="less">
@import url("./../../assets/styles/variables.less");
.embedLanding {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  button.md-button.primaryBtn {
    background-color: @primaryColor !important;
  }
  .noCampaignWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 115px);
    width: 100%;
    .campaign-img {
      background: url("./../../assets/img/onboarding.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 175px;
      height: 125px;
    }
  }
  .campaignWrapper {
    min-height: calc(100vh - 115px);
    width: 100%;
    .subPageHeadder {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .leftArea {
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchBox {
          width: 350px;
          margin: 0;
        }
      }
      .rightArea {
        width: 30%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
