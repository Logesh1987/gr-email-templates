<template>
  <md-menu md-direction="bottom-end" :mdCloseOnClick="true">
    <a class="dLink" md-menu-trigger>
      <i class="fas fa-code">
        <md-tooltip md-direction="right">
          Insert Dynamic variables
        </md-tooltip>
      </i>
    </a>
    <md-menu-content class="dLinkMenu">
      <md-menu-item
        v-for="item in data"
        :key="item"
        class="dLinkMenuItem"
        @click="_ => click(index, name, item)"
        ><i class="fal fa-plus-square"></i> {{ item }}</md-menu-item
      >
    </md-menu-content>
  </md-menu>
</template>
<script>
export default {
  name: "CustomVariables",
  props: ["data", "click", "name", "index"]
};
</script>
<style lang="less">
.dLinkMenuItem {
  div {
    justify-content: flex-start;
    font-size: 0.9em;
    min-height: 40px;
  }
  i {
    padding-right: 0.5em;
  }
}
</style>
<style lang="less" scoped>
.dLink {
  font-size: 0.8em;
  font-weight: 400;
  cursor: pointer;
  color: inherit !important;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  span {
    text-decoration: underline;
  }
  i {
    font-size: 1.2em;
    margin-left: 0.4em;
    transform: translateY(0.1em);
  }
}
</style>
