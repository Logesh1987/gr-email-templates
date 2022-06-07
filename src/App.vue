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
import Popover from "vue-js-popover";
import mixins from "./mixins";

// if (process.env.NODE_ENV == "development") {
//   require("@/assets/icon/fontawesome.min.css");
// }

Vue.use(VueMaterial);
Vue.use(Popover);

// GLOBAL MIXINS - HELPER FUNCTIONS
Vue.mixin({
  methods: mixins,
});

export default {
  name: "app",
  mounted: function() {
    document.documentElement.classList.remove("md-theme-default");
    document.querySelector("#app").classList.add("md-theme-default");
  },
  destroyed() {
    console.log(
      `At this point, watchers, child components, and event listeners have been torn down.`
    );
    console.log("Component destroyed.");
    window.sessionStorage.clear();
  },
};
</script>

<style lang="less">
:root {
  --md-theme-default-tooltip-on-background: rgba(0, 0, 0, 0.8);
  --md-theme-default-accent: #187aff !important;
  --md-theme-default-accent-on-background: #187aff !important;
  --md-theme-default-primary-on-background: #187aff !important;
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
.mx-0 {
  margin: 0 !important;
}
.my-0 {
  margin: 0 !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.mr-0 {
  margin-right: 0 !important;
}
.ml-0 {
  margin-left: 0 !important;
}
.mb-0 {
  margin-bottom: 0 !important;
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
.m-10 {
  margin: 10px !important;
}
.mx-10 {
  margin: 0 10px !important;
}
.my-10 {
  margin: 10px 0 !important;
}
.mt-10 {
  margin-top: 10px !important;
}
.mb-10 {
  margin-bottom: 10px !important;
}
.mr-10 {
  margin-right: 10px !important;
}
.ml-10 {
  margin-left: 10px !important;
}
.m-5 {
  margin: 5px !important;
}
.mx-5 {
  margin: 0 5px !important;
}
.my-5 {
  margin: 5px 0 !important;
}
.mt-5 {
  margin-top: 5px !important;
}
.mb-5 {
  margin-bottom: 5px !important;
}
.mr-5 {
  margin-right: 5px !important;
}
.ml-5 {
  margin-left: 5px !important;
}

.p-0 {
  padding: 0 !important;
}
.p-10 {
  padding: 10px !important;
}
.px-10 {
  padding: 0 10px !important;
}
.py-10 {
  padding: 10px 0 !important;
}
.pt-10 {
  padding-top: 10px !important;
}
.pb-10 {
  padding-bottom: 10px !important;
}
.pr-10 {
  padding-right: 10px !important;
}
.pl-10 {
  padding-left: 10px !important;
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
.display-inline-flex {
  display: inline-flex;
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
.relative {
  position: relative;
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
.md-field .md-input {
  box-shadow: none;
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
.toggleCheckCross {
  position: relative;
  display: inline-block;
  font-size: 0.6em;
  --false-color: #d74215;
  --true-color: #65d300;
  input {
    width: 0;
    height: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
  }
  label {
    width: 7em;
    background: var(--false-color);
    height: 3em;
    display: block;
    border-radius: 50px;
    position: relative;
    transition: all 0.3s ease;
    transform-origin: 20% center;
    cursor: pointer;
    &:before {
      content: none;
      display: block;
      transition: all 0.2s ease;
      width: 2.3em;
      height: 2.3em;
      top: 0.25em;
      left: 0.25em;
      border-radius: 2em;
      border: 2px solid #88cf8f;
      transition: 0.3s ease;
    }
  }
  .check {
    border-radius: 50%;
    width: 2.4em;
    height: 2.4em;
    position: absolute;
    background: #fff;
    transition: 0.4s ease;
    top: 0.25em;
    left: 0.25em;
    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 0.2em;
      border-radius: 10px;
      background: var(--false-color);
      transition: 0.4s ease;
    }
    &:before {
      width: 1.6em;
      transform: rotate(-45deg) translate(-0.5em, 1.1em);
    }
    &:after {
      width: 1.6em;
      transform: rotate(45deg) translate(1.1em, 0.5em);
    }
  }
  input:checked + label {
    background: var(--true-color);
    .check {
      left: 4.3em;
      transform: rotate(360deg);
      &:before,
      &:after {
        background: var(--true-color);
      }
      &:before {
        width: 1.6em;
        transform: rotate(-45deg) translate(-0.4em, 1.3em);
      }
      &:after {
        width: 0.7em;
        transform: rotate(45deg) translate(1.3em, 0.7em);
      }
    }
  }
}
.switch {
  font-size: 11px;
  display: inline-block;
  height: 1.7em;
  position: relative;
  width: 3.5em;
  margin: 0;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    opacity: 0.5;
  }

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
      height: 1.2em;
      position: absolute;
      transition: 0.4s;
      margin: 0.15em;
      width: 1.2em;
      border-radius: 50%;
    }
  }

  input:checked + i {
    background-color: #2ed176;
    border-color: #ccc;
    color: #fff;
    content: "oui";
    &:before {
      transform: translateX(1.8em);
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
  z-index: 1039;
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
      font-size: 23px;
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
      font-size: 20px;
      font-weight: 600;

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

.ql-html-popupContainer {
  max-height: 700px;
  max-width: 700px;
  margin: auto;
  .ql-html-textArea {
    position: absolute !important;
    left: 20px;
    width: calc(100% - 40px);
  }
  .ql-syntax {
    background: none;
    border: none;
  }
  .ql-html-buttonGroup {
    transform: none;
    bottom: -25px;
    left: 15px;
    right: 15px;
    text-align: right;
    button {
      cursor: pointer;
      padding: 5px 20px;
      &.ql-html-buttonOk {
        background: var(--md-theme-default-accent);
        border: none;
        color: #fff;
      }
      &.ql-html-buttonCancel {
        background: #fff;
        border: 1px solid #bdbdbd;
        margin-right: 10px;
      }
    }
  }
}
.vc-chrome {
  z-index: 2;
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
      left: 50%;
      transform: translateX(-50%);
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
.quill-editor {
  background-color: #fff;
}
.ql-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ql-formats {
    margin-right: 5px !important;
  }
}
.ql-snow .ql-tooltip {
  left: -1px !important;
  position: static;
  transform: none;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  z-index: 99;
}
.ql-snow strong {
  font-weight: bold;
}
.md-overlay {
  z-index: 10000;
}
.md-dialog {
  z-index: 10001;
}
.previewBlock a {
  pointer-events: none;
}
.hide {
  display: none !important;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.md-button {
  text-transform: capitalize;
  padding: 0 10px;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin: 0;
  i {
    margin-right: 10px;
  }
  &[disabled] {
    pointer-events: none;
  }
}

.btn-custom-default {
  border: 1px solid #005dff;
  color: #005dff !important;
  background: transparent !important;
}
.btn-custom-active {
  color: #fff !important;
}
.md-list {
  border: 1px solid #e8e8e8;
  --vsa-highlight-color: #d2d2d2;

  &--is-active .vsa-item__heading,
  .md-list-item:not(:last-of-type) {
    border-bottom: 1px solid #e8e8e8;
  }

  .md-list-item-text {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 10px;
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
    nav {
      width: auto;
      display: flex;
      a {
        margin-left: 5px;
      }
    }
  }
  .md-list-expand-icon {
    margin-left: 0 !important;
  }
  .md-list-item-expand.md-active .md-list-expand {
    padding: 10px;
  }
}
.eAccordion {
  display: flex;
  background-color: #fff;
  flex-direction: column;
  &-title {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #e8e8e8;
    position: relative;
    transition: background-color 0.5s;
    nav {
      display: flex;
      align-items: center;
      padding-right: 5px;
      position: absolute;
      font-size: 1.1em;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      a {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
      }
      i {
        margin: 0 5px;
        transition: transform 0.5s;
      }
    }
    i.fa-arrows-alt {
      cursor: grab;
    }
    &:hover a {
      opacity: 1;
      pointer-events: auto;
    }
  }
  &-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.8s, background-color 0.5s;
    > div {
      border: 1px solid #e8e8e8;
      padding: 10px;
      border-top: 0;
    }
  }
  &-items {
    &.active {
      .eAccordion-content {
        max-height: 2000px;
        background-color: #eef9f9;
        animation: 1s o-visible 1s forwards;
        > div {
          border-color: #afafaf;
        }
      }
      .eAccordion-title {
        border-color: #afafaf;
        background-color: #187aff;
        color: #fff;
        a {
          color: #fff !important;
        }
        .fa-chevron-right {
          transform: rotate(90deg);
        }
      }
    }
  }
}
@keyframes o-visible {
  to {
    overflow: visible;
  }
}
</style>
