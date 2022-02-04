<template>
  <div id="embedEditBase">
    <header class="pageHeader">
      <i class="fa fa-laptop-code"></i>
      Embed Campaign
    </header>
    <div class="contentWrapper">
      <div class="leftPane">
        <md-tabs md-alignment="fixed">
          <md-tab id="tab-home" md-label="Basic Settings">
            Basic Setting Content Goes Here...
          </md-tab>
          <md-tab id="tab-pages" md-label="Common Settings">
            Common Setting Content Goes Here...
          </md-tab>
        </md-tabs>
      </div>
      <div class="rightPane">
        <div class="subHeader">
          <RadioToggle
            v-bind:radioData="signData"
            v-bind:radioGroupName="'signOption'"
            v-on:radioChange="optionChange"
          ></RadioToggle>
          <RadioToggle
            v-bind:radioData="modeData"
            v-bind:radioGroupName="'modeOption'"
            v-on:radioChange="optionChange"
          ></RadioToggle>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.contentWrapper {
  width: 100%;
  min-height: calc(100% - 65px);
  overflow: auto;
  .leftPane {
    width: 450px;
    height: 100%;
    border-right: 1px solid #ccc;
    position: absolute;
  }
  .rightPane {
    width: calc(100% - 450px);
    height: 100%;
    position: absolute;
    left: 450px;
    background-color: #fbfbfb;
    .subHeader {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      > * {
        margin: 5px;
      }
    }
  }
}
</style>
<script>
// import Vue from "vue";
import RadioToggle from "./../../components/RadioToggle";
export default {
  name: "EmbedEditBase",
  components: { RadioToggle },
  data: () => {
    return {
      signData: [
        {
          id: 1,
          viewValue: "Signed-in",
          value: "signedIn",
          iconClass: "fas fa-sign-in-alt",
        },
        {
          id: 2,
          viewValue: "Signed-out",
          value: "signedOut",
          iconClass: "fas fa-sign-out-alt",
        },
      ],
      modeData: [
        {
          id: 1,
          viewValue: "Desktop",
          value: "desktop",
          iconClass: "fas fa-desktop",
        },
        {
          id: 2,
          viewValue: "Mobile",
          value: "mobile",
          iconClass: "fas fa-mobile",
        },
      ],
    };
  },
  methods: {
    optionChange(event, data) {
      console.table({ data });
    },
  },
};
</script>
