<template>
  <div class="fomo_embed">
    <div class="title">
      <h3>Embed FOMO</h3>
      <md-button class="md-raised btn-default" @click="doCopy(copyCode)"
        >Copy</md-button
      >
    </div>
    <div class="embedMode">
      <h5>Embed as</h5>
      <ul>
        <li
          @click="() => handleEmbedMode(true)"
          :class="`${embedMode ? 'active' : ''}`"
        >
          Floating window
        </li>
        <li
          @click="() => handleEmbedMode(false)"
          :class="`${!embedMode ? 'active' : ''}`"
        >
          Inline window
        </li>
      </ul>
    </div>
    <div class="iframe-block">
      <pre>
                {{ copyCode }}
              </pre
      >
    </div>
    <p>
      By embedding our program on your site, you are agreeing to our API Terms
      of Service.
    </p>
  </div>
</template>
<script>
export default {
  name: "EmbedInfo",
  mixins: ["doCopy"],
  props: ["id", "embedMode", "handleEmbedMode"],
  computed: {
    copyCode() {
      return `<script src="https://unpkg.com/vue@2.6"><\/script><script src="${Vue.prototype.$asset_url}/assets/js/fomo/am.js"><\/script><am-fomo id="${this.id}" embed="${this.embedMode ? "floating" : "inline"}" />`; // eslint-disable-line
    },
  },
};
</script>
<style lang="less" scoped>
.embedMode {
  border: 1px solid #ccc;
  border-bottom: 0;
  h5 {
    margin: 0;
    background: #f0f7ff;
    padding: 3px 10px;
    line-height: 2;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    list-style: none;
  }
  li {
    background-color: #beddff;
    cursor: pointer;
    text-align: center;
    padding: 5px;
    width: 50%;
    &.active {
      background-color: #007aff;
      color: #fff;
    }
  }
}
.fomo_embed {
  position: absolute;
  top: 55px;
  background: #fff;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  right: 0px;

  p {
    font-size: 11px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h3 {
      margin: 0;
      font-size: 14px;
      color: #007aff;
    }
  }

  .iframe-block {
    border: 1px solid #ccc;
    padding: 20px;
    width: 100%;
    height: 130px;
    font-size: 12px;
    color: #66788a;
    pre {
      white-space: pre-line;
      word-break: break-all;
      margin: 0;
      padding: 0;
      background: transparent;
      border: none;
    }
  }

  .link-block {
    margin: 10px 0;

    a {
      font-size: 11px;
      color: #428bca;
      text-decoration: underline;
      margin-right: 10px;
      display: inline-block;

      &:hover {
        color: #2a6496;
        text-decoration: underline;
      }
    }
  }
}
</style>
