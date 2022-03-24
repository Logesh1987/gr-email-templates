<template>
  <div v-bind:id="eleId" class="popoverWrapper" v-bind:class="cssClass">
    <span
      class="fal fa-times closeIcon"
      @click="closeIconClick($event)"
      v-if="enableCloseIcon"
    ></span>
    <div class="popover-content">{{ content }}</div>
    <div class="actionBtns" v-if="enableButtons">
      <md-button
        class="md-dense md-raised"
        v-for="buttonData in buttons"
        @click="buttonClick($event, buttonData)"
        :key="buttonData.id"
        v-bind:id="buttonData.id"
        >{{ buttonData.value }}</md-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Popover",
  events: ["afterPopoverClose", "actionBtnClicked"],
  props: [
    "targetId",
    "cssClass",
    "showCloseIcon",
    "popoverContent",
    "showButtons",
    "buttonData",
    "popoverId",
  ],
  data: () => {
    return {
      eleId: null,
      parentId: null,
      enableCloseIcon: true,
      content: "Test Content",
      enableButtons: true,
      buttons: [
        {
          id: "testBtn",
          value: "OK",
        },
      ],
    };
  },
  mounted() {
    if (this.popoverId) {
      this.eleId = this.popoverId;
    }
    if (this.showCloseIcon) {
      this.enableCloseIcon = this.showCloseIcon;
    }
    if (this.popoverContent) {
      this.content = this.popoverContent;
    }
    if (this.showButtons) {
      this.enableButtons = this.showButtons;
    }
    if (this.buttonData) {
      this.buttons = this.buttonData;
    }
    const targetEle = document.getElementById(this.targetId);
    targetEle.addEventListener("hover", (eve) => {
      console.log(eve);
    });
  },
  computed: {},
  methods: {
    closeIconClick(eve) {
      console.log("close clicked");
      this.$emit("afterPopoverClose", { context: this, event: eve });
    },
    buttonClick(eve, data) {
      console.log("Button clicked");
      this.$emit("actionBtnClicked", { context: this, event: eve, data });
    },
  },
};
</script>

<style lang="less" scoped>
.popoverWrapper {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(204, 204, 204);
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 5px 5px 5px #ccc;
  .closeIcon {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 2px;
    padding: 10px;
  }
  .popover-content {
    margin-top: 20px;
    padding: 10px;
  }
  .actionBtns {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
