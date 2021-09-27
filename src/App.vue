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
import "@/assets/icon/fontawesome.min.css";

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
    getImgUrl: function(value) {
      return `${window.Config.s3_image_url}/${value}`;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fafafa;
}

.fieldError {
  color: red;
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
.md-snackbar {
  max-width: 700px;
}
.md-tooltip:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent rgba(97, 97, 97, 0.9);
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
    align-items: center;

    a.link-back {
      color: #333;
      padding: 10px 25px;
      font-size: 16px;
      margin: 0;
      cursor: pointer;
    }

    .title {
      border-left: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      color: #333;
      padding: 12px 20px;
      font-size: 16px;

      .icon {
        padding: 10px;
        border-radius: 50%;
        width: 35px;
        background: #e2f3ff;
        color: #5988bc;
        position: relative;
        margin-right: 10px;
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


.settingContainer,
.announcementContainer,
.plansContainer {
  .headingBlock {
    background: #e3e3e3;
    padding: 5px 20px;
    border: 1px solid #d1d1d1;
    border-bottom: 0;
  }
  form .row {
    margin-bottom: 20px;
  }
  .md-tabs.md-theme-default .md-tabs-navigation .md-button.md-active {
    color: #fb5903;
  }
  .md-tabs.md-theme-default .md-tabs-indicator {
    background: #fb5903;
  }
  .md-field {
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    background: #ffffff;
    padding: 0 10px;
    min-height: auto;
    margin: 4px 0 4px;

    &:hover {
      border-color: #ccc;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(204, 204, 204, 0.6);
    }

    &:focus {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
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
  .asterisk {
    color: #e85855;
    font-size: 7px;
    vertical-align: super;
    display: inline;
  }
  .material-icons {
    font-size: 21px;
  }
  .flexBlock-Space-between {
    display: flex;
    justify-content: space-between;
  }
  .flexBlock-Space-between-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  label.flexBlock {
    display: flex;
  }
  .md-field .md-prefix,
  .md-field .md-suffix {
    display: block;
    line-height: 20px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    background-color: #eee;
  }
  .md-field .md-prefix {
    margin-left: -10px;
    margin-right: 10px;
  }
  .md-field .md-suffix {
    margin-left: 10px;
    margin-right: -10px;
  }
  .md-switch.md-theme-default.md-checked.md-primary {
    color: #24c16f;
    .md-switch-container {
      background: rgba(36, 193, 111, 0.3);
    }
    .md-switch-thumb {
      background: #24c16f;
    }
  }
  .md-switch.custom {
    width: 100%;
    margin: 4px 0 24px;
  }
  .alert-info {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    padding: 20px;
    label {
      font-weight: 600;
    }
  }
  .small {
    font-size: 12px;
  }
  .alert.small {
    color: #e30303 !important;
    font-size: 85% !important;
    .material-icons {
      margin-left: 0;
      padding-right: 10px;
    }
  }
  .rightAlign {
    text-align: right;
  }
  .centerAlign {
    text-align: center;
  }
}

.customTooltip {
  max-width: 200px;
  white-space: pre-line;
  height: auto;
  &:before {
    display: none;
  }
}
</style>
