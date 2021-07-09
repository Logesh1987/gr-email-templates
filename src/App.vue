<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Home from "@/views/Home.vue";
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
// import "@/assets/icon/fontawesome.min.css";

Vue.use(VueMaterial);

// GLOBAL MIXINS - HELPER FUNCTIONS
Vue.mixin({
  methods: {
    renderTemplate: data =>
      data.email_template.length > 5
        ? data.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
            data.json_fields[property]
              ? data.json_fields[property].value
              : property
          )
        : "<div>Invalid Template</div>",
    createFormData: data => {
      let formData = new FormData();
      for (let key in data) {
        if (typeof data[key] === "object") {
          for (let subKey in data[key]) {
            formData.append(`${key}[${subKey}]`, data[key][subKey]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
      return formData;
    },
    getAssetUrl: function(url) {
      return `${Vue.prototype.$asset_url}/assets/img/${url}`;
    },
    getImgUrl: function(value) {
      return `${window.Config.s3_image_url}/${value}`;
    },
    getApiUrl: function(url) {
      var hostname = window.location.hostname;
      if (hostname == "localhost") {
        const linker = url.includes("?") ? "&" : "?";
        return `${Vue.prototype.$callback_url}/${url}${linker}id_shop=${Vue.prototype.$shop_id}&admin_email=${Vue.prototype.$email}`;
      } else {
        return `${Vue.prototype.$callback_url}/${url}`;
      }
    }
  }
});

export default {
  name: "app",
  mounted: function() {
    document.documentElement.classList.remove("md-theme-default");
    document.querySelector("#app").classList.add("md-theme-default");
  }
};
</script>

<style lang="less">
:root {
  --md-theme-default-tooltip-on-background: rgba(0, 0, 0, 0.8);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fafafa;
}

.m-0 {
  margin: 0 !important;
}
.m-20 {
  margin: 20px !important;
}
.mx-20 {
  margin: 0 20px !important;
}
.my-20 {
  margin: 20px 0 !important;
}
.mt-20 {
  margin-top: 20px !important;
}
.mb-20 {
  margin-bottom: 20px !important;
}
.mr-20 {
  margin-right: 20px !important;
}
.ml-20 {
  margin-left: 20px !important;
}

.p-0 {
  padding: 0 !important;
}
.p-20 {
  padding: 20px !important;
}
.px-20 {
  padding: 0 20px !important;
}
.py-20 {
  padding: 20px 0 !important;
}
.pt-20 {
  padding-top: 20px !important;
}
.pb-20 {
  padding-bottom: 20px !important;
}
.pr-20 {
  padding-right: 20px !important;
}
.pl-20 {
  padding-left: 20px !important;
}
.display-flex {
  display: flex;
}
.align-items-start {
  align-items: flex-start;
}
.justify-content-space-between {
  justify-content: space-between;
}
.align-items-center {
  align-items: center;
}
.flex-direction-column {
  flex-direction: column;
}
.fieldError {
  color: red;
}
.noMinHeight {
  min-height: 0;
}

.fomoIcon {
  font-family: "Font Awesome 5 Pro";
  font-style: normal;
  font-weight: 300;
  font-size: 0.9em;
}
.icon_signup_bonus:before {
  content: "\f234";
  font-size: 0.9em;
}
.icon_newsletter:before {
  content: "\f1ea";
}
.icon_new_product_release:before {
  content: "\f5d2";
}
.icon_next_rewards:before {
  content: "\f2f2";
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.md-raised {
  border: 1px solid #d5d5d5;
  color: #202020;
  border-radius: 5px;
  box-shadow: none !important;
  text-transform: capitalize;

  &.md-accent {
    border: 0;
    font-weight: bold;
    color: #fff !important;
  }
}
.md-snackbar {
  max-width: 700px;
}
.md-tooltip {
  max-width: 280px;
  height: auto;
  white-space: normal;
  line-height: 1.5;
  padding: 5px 10px;
  font-size: 11px;
}
.md-tooltip:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent
    var(--md-theme-default-tooltip-on-background);
  position: absolute;
}
.md-tooltip-left {
  transform: translateX(10px);
  &:before {
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
  }
}
.md-tooltip-right {
  transform: translateX(-10px);
  &:before {
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%) rotateY(180deg);
  }
}
.md-tooltip-bottom {
  transform: translateY(-8px);
}
.md-field.md-disabled {
  opacity: 0.3;
}

.md-dialog.warn .md-title {
  background-color: #f95b56;
  color: #fff;
  padding: 24px;
  text-align: center;
  &:before {
    font-family: "Font Awesome 5 Pro";
    font-weight: 900;
    content: "\f071";
    margin-bottom: 0.2em;
    font-size: 2.5em;
    line-height: 1;
    display: block;
  }
}

.switch {
  font-size: 14px;
  display: inline-block;
  height: 1.7em;
  position: relative;
  width: 3.3em;
  margin: 0;

  input {
    display: none;
  }

  i {
    background-color: #d12e2e;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
    border-radius: 34px;
    border: 1px solid #d12e2e;

    &:before {
      background-color: #fff;
      top: 0;
      left: 0;
      content: "";
      height: 1.25em;
      position: absolute;
      transition: 0.4s;
      margin: 0.15em;
      width: 1.3em;
      border-radius: 50%;
    }
  }

  input:checked + i {
    background-color: #2ed176;
    border-color: #ccc;
    color: #fff;
    content: "oui";
    &:before {
      transform: translateX(1.6em);
      background-color: fff;
    }
  }
}

.container {
  margin: auto;
  max-width: 1400px;
  padding: 0 20px;
}

.msgSnack {
  span {
    display: flex;
    align-items: center;
  }
  i {
    font-size: 1.8em;
    display: inline-flex;
    margin-right: 0.4em;
    background: #fff;
    border-radius: 50%;
    width: 1.05em;
    height: 1.05em;
    align-items: center;
    &.fa-exclamation-circle {
      color: #f00;
    }
    &.fa-check-circle {
      color: #2aa900;
    }
  }
}

.fixedHeaderBlock {
  background: #fff;
  flex: 1;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 9999;
  right: 0;
  left: 64px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 1px 0px rgb(0, 0, 0, 0.2);
  .show-notification & {
    top: 36px;
  }

  .fixedHeaderBlockInner {
    display: flex;
    align-items: stretch;

    a.link-back {
      color: #333;
      padding: 0 25px;
      font-size: 16px;
      margin: 0;
      cursor: pointer;
      border-right: 1px solid #eaeaea;
      line-height: 60px;
    }

    .title {
      display: flex;
      align-items: center;
      color: #333;
      padding: 12px 20px;
      font-size: 16px;

      .icon {
        padding: 10px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background: #e2f3ff;
        color: #5988bc;
        position: relative;
        margin-right: 10px;
        i.fomoIcon {
          font-size: 1.2em;
        }
      }
    }
  }

  .md-button {
    margin-right: 10px;
  }
}
.uploadWrap {
  label {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    opacity: 0;
    font-size: 2.5em;
    transition: opacity 0.5s;
    input {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
      right: 0;
      top: 0;
    }
    &:hover {
      opacity: 1;
    }
  }
}
// Quill editor font sizes
.ql-size-small {
  font-size: 0.8em;
}
.ql-size-large {
  font-size: 1.3em;
}
.ql-size-huge {
  font-size: 1.5em;
}
.ql-formats {
  span,
  button {
    position: relative;
    &:after {
      position: absolute;
      background: #000;
      color: white;
      padding: 0.5em;
      border-radius: 0.5em;
      left: -50%;
      top: 100%;
      width: max-content;
      z-index: 1;
    }
    &.ql-bold:hover:after,
    &.ql-bold:active:after,
    &.ql-bold:focus:after {
      content: "Bold";
    }
    &.ql-italic:hover:after,
    &.ql-italic:active:after,
    &.ql-italic:focus:after {
      content: "Italic";
    }
    &.ql-underline:hover:after,
    &.ql-underline:active:after,
    &.ql-underline:focus:after {
      content: "Underline";
    }
    &.ql-strike:hover:after,
    &.ql-strike:active:after,
    &.ql-strike:focus:after {
      content: "Strike";
    }
    &.ql-link:hover:after,
    &.ql-link:active:after,
    &.ql-link:focus:after {
      content: "Link";
    }
    &.ql-direction:hover:after,
    &.ql-direction:active:after,
    &.ql-direction:focus:after {
      content: "Direction";
    }
    &.ql-indent:hover:after,
    &.ql-indent:active:after,
    &.ql-indent:focus:after {
      content: "Indent";
    }
    &.ql-list:hover:after,
    &.ql-list:active:after,
    &.ql-list:focus:after {
      content: "List";
    }
    &.ql-align:hover:after,
    &.ql-align:active:after,
    &.ql-align:focus:after {
      content: "Align";
    }
    &.ql-size:hover:after,
    &.ql-size:active:after,
    &.ql-size:focus:after {
      content: "Font size";
    }
    &.ql-header:hover:after,
    &.ql-header:active:after,
    &.ql-header:focus:after {
      content: "Header";
    }
    &.ql-background:hover:after,
    &.ql-background:active:after,
    &.ql-background:focus:after {
      content: "Text background";
    }
    &.ql-color:hover:after,
    &.ql-color:active:after,
    &.ql-color:focus:after {
      content: "Text color";
    }
  }
}
</style>
