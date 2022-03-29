<template>
  <div
    v-bind:id="eleId"
    class="popoverWrapper"
    v-bind:class="generateClasses()"
  >
    <span
      class="fal fa-times closeIcon"
      @click="closeIconClick($event)"
      v-if="enableCloseIcon"
    ></span>
    <div class="popover-header">{{ title }}</div>
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
    <div
      class="container__arrow"
      v-if="enablePointer"
      v-bind:class="pointerPositionClass"
    ></div>
  </div>
</template>

<script>
export default {
  name: "gr-popover",
  events: ["afterPopoverClose", "actionBtnClicked"],
  props: [
    "targetId",
    "cssClass",
    "showCloseIcon",
    "popoverTitle",
    "popoverContent",
    "showButtons",
    "buttonData",
    "popoverId",
    "showPointer",
    "pointerPosition",
    "showOnLoad",
    "position",
    "popoverOffset",
  ],
  data: () => {
    return {
      eleId: null,
      parentId: null,
      enableCloseIcon: true,
      content: "Test Content",
      title: "Test Title",
      enableButtons: true,
      buttons: [
        {
          id: "testBtn",
          value: "OK",
        },
      ],
      enablePointer: true,
      pointerPositionClass: "container__arrow--tc",
      enableOnLoad: false,
      popoverPosition: "bottom",
      offset: null,
    };
  },
  mounted() {
    const targetEle = document.getElementById(this.targetId);
    this.setValues();
    this.wireEvents();
    setTimeout(() => {
      this.calculatePosition(targetEle);
    }, 350);
  },
  unmounted() {
    const targetEle = document.getElementById(this.targetId);
    targetEle.removeEventListener("mouseover");
    targetEle.removeEventListener("mouseleave");
    window.removeEventListener("resize");
  },
  computed: {},
  methods: {
    setValues() {
      if (this.popoverId) {
        this.eleId = this.popoverId;
      }
      if (this.popoverTitle) {
        this.title = this.popoverTitle;
      }
      if (this.popoverContent) {
        this.content = this.popoverContent;
      }
      if (this.buttonData) {
        this.buttons = this.buttonData;
      }
      if (this.popoverOffset) {
        this.offset = this.popoverOffset;
      }
      if (this.position) {
        this.popoverPosition = this.position;
      }
      this.enableCloseIcon =
        this.showCloseIcon != undefined && this.showCloseIcon != null
          ? this.showCloseIcon
          : true;
      this.enableButtons =
        this.showButtons != undefined && this.showButtons != null
          ? this.showButtons
          : false;
      this.enablePointer =
        this.showPointer != undefined && this.showPointer != null
          ? this.showPointer
          : true;
      this.enableOnLoad =
        this.showOnLoad != undefined && this.showOnLoad != null
          ? this.showOnLoad
          : false;
      this.pointerPositionClass = this.generatePositionClass();
    },
    wireEvents() {
      const targetEle = document.getElementById(this.targetId);
      console.log(targetEle);
      targetEle.addEventListener("mouseover", (eve) => {
        console.log("enter", eve);
        if (!this.enableOnLoad) {
          this.$el.classList.add("show");
          this.calculatePosition(targetEle);
        }
      });
      targetEle.addEventListener("mouseleave", (eve) => {
        console.log("leave", eve);
        if (!this.enableOnLoad) {
          this.$el.classList.remove("show");
        }
      });
      window.addEventListener("resize", () => {
        this.calculatePosition(targetEle);
      });
    },
    generateClasses() {
      let returnClasses = "";
      if (this.enableOnLoad) {
        returnClasses += "show ";
      }
      if (this.cssClass) {
        returnClasses += this.cssClass + " ";
      }
      return returnClasses;
    },
    closeIconClick(eve) {
      console.log("close clicked");
      this.$el.classList.remove("show");
      this.$emit("afterPopoverClose", { context: this, event: eve });
    },
    buttonClick(eve, data) {
      console.log("Button clicked");
      this.$emit("actionBtnClicked", { context: this, event: eve, data });
    },
    generatePositionClass() {
      let pointerClass = "container__arrow--tc";
      if (this.pointerPosition && this.pointerPosition.length > 0) {
        pointerClass = "container__arrow--" + this.pointerPosition;
      }
      return pointerClass;
    },
    calculatePosition(target) {
      let targetTop = target.offsetTop;
      let targetLeft = target.offsetLeft;
      let targetWidth = target.offsetWidth;
      let targetHeight = target.offsetHeight;
      let popoverWidth = this.$el.offsetWidth;
      // let popoverHeight = this.$el.offsetHeight;
      let top;
      if (this.offset && this.offset.top) {
        top = targetTop + targetHeight + 15 + this.offset.top;
      } else {
        top = targetTop + targetHeight + 15;
      }
      let left;
      if (this.offset && this.offset.left) {
        left = targetLeft + targetWidth / 2 + left - popoverWidth / 2;
      } else {
        left = targetLeft + targetWidth / 2 - popoverWidth / 2;
      }
      this.$el.style.top = top + "px";
      this.$el.style.left = left + "px";
    },
  },
};
</script>

<style lang="less" scoped>
.popoverWrapper {
  display: none;
  position: absolute;
  border: 1px solid rgb(204, 204, 204);
  padding: 5px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 10%);
  font-size: 12px;
  &.show {
    display: block;
  }
  .closeIcon {
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px;
  }
  .popover-content {
    padding: 5px;
  }
  .actionBtns {
    padding: 5px;
    display: flex;
    justify-content: center;
  }

  .popover-header {
    font-size: 13px;
    font-weight: bold;
    padding: 5px 25px 5px 5px;
  }
  .container__arrow {
    /* Size */
    height: 16px;
    width: 16px;

    background-color: #fff;
    position: absolute;
    /* Border */
    &.container__arrow--tl {
      /* Position at the top left corner */
      left: 32px;
      top: 0px;

      /* Border */
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(50%, -50%) rotate(45deg);
    }

    &.container__arrow--tc {
      /* Position at the top center */
      left: 50%;
      top: 0px;

      /* Border */
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.container__arrow--tr {
      /* Position at the top right corner */
      right: 32px;
      top: 0px;

      /* Border */
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.container__arrow--rt {
      /* Position at the right top corner */
      right: 0;
      top: 32px;

      /* Border */
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(50%, 50%) rotate(45deg);
    }

    &.container__arrow--rc {
      /* Position at the right center */
      right: 0;
      top: 50%;

      /* Border */
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(50%, -50%) rotate(45deg);
    }

    &.container__arrow--rb {
      /* Position at the right bottom corner */
      bottom: 32px;
      right: 0;

      /* Border */
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(50%, -50%) rotate(45deg);
    }

    &.container__arrow--bl {
      /* Position at the bottom left corner */
      bottom: -16px;
      left: 32px;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(50%, -50%) rotate(45deg);
    }

    &.container__arrow--bc {
      /* Position at the bottom center */
      bottom: -16px;
      left: 50%;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.container__arrow--br {
      /* Position at the bottom right corner */
      bottom: -16px;
      right: 32px;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.container__arrow--lt {
      /* Position at the left top corner */
      left: 0;
      top: 32px;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, 50%) rotate(45deg);
    }

    &.container__arrow--lc {
      /* Position at the left center */
      left: 0;
      top: 50%;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.container__arrow--lb {
      /* Position at the left bottom corner */
      bottom: 32px;
      left: 0;

      /* Border */
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
