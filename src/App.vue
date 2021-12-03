<template>
  <div id="app">
    <!-- <link rel="stylesheet" href="https://gr-v1.devam.pro/public/assets/css/lib/fontawesome.min.css?v=1613393918"> -->
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
import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

Vue.use(VueMaterial);
Vue.use(VueQuillEditor);
// GLOBAL MIXINS - HELPER FUNCTIONS
Vue.mixin({
  methods: {
    renderTemplate: (data) =>
      data.email_template.length > 5
        ? data.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
            data.json_fields[property]
              ? data.json_fields[property].value
              : property
          )
        : "<div>Invalid Template</div>",
    createFormData: (data) => {
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
    },
  },
});

export default {
  name: "app",
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
    display: inline-flex;
    align-items: center;
    input {
      position: absolute;
      opacity: 0;
    }
  }
}
</style>
