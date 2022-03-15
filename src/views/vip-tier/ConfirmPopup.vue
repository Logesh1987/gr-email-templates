<template>
  <div v-if="popupConfig">
    <md-dialog
      :md-active.sync="openPopup"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    >
      <div class="contentWrapper" v-bind:style="styleObject">
        <div class="infoIcon" v-if="popupConfig.iconClass">
          <i v-bind:class="popupConfig.iconClass"></i>
        </div>
        <div class="messageArea">
          <div class="popupTitle">{{ popupConfig.title }}</div>
          <div class="popupContent">
            {{ popupConfig.content }}
          </div>
        </div>
      </div>
      <md-dialog-actions>
        <md-button
          class="secondaryBtn"
          @click="onCancel"
          v-if="popupConfig.cancelText && popupConfig.cancelText.length > 0"
          >{{ popupConfig.cancelText }}</md-button
        >
        <md-button class="primaryBtn" @click="onConfirm">{{
          popupConfig.confirmText
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_variables");
.primaryBtn {
  background-color: @primary-color !important;
  color: #fff !important;
}
.primaryBlueBtn {
  background-color: @accent-color !important;
  color: #fff !important;
}
.secondaryBtn {
  background-color: #fff !important;
  color: #a9a9a9 !important;
  border: 1px solid #a9a9a9 !important;
}
.popupTitle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.popupContent {
  font-size: 14px;
}
.md-dialog-actions {
  justify-content: space-around;
  box-sizing: border-box;
  padding: 15px;
  button {
    width: calc(50% - 15px);
    border-radius: 5px !important;
    height: 35px;
  }
}
.md-dialog-container {
  border-radius: 15px;
  .contentWrapper {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .infoIcon {
      min-width: 80px;
      max-width: 80px;
      height: 80px;
      font-size: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-right: 15px;
    }
  }
}
</style>

<script>
export default {
  name: "ConfirmPopup",
  event: ["confirmed", "canceled"],
  props: ["showPopup", "popupConfig"],
  data: function() {
    return {
      active: false,
      value: null,
      dialogId: this.popupConfig.id,
      styleObject: {
        width: this.popupConfig?.width ? this.popupConfig.width : "350px",
      },
    };
  },
  computed: {
    openPopup: {
      // getter
      get: function() {
        return this.$props.showPopup;
      },
      // setter
      set: function(newValue) {
        this.$props.showPopup = newValue;
      },
    },
  },
  watch: {
    popupConfig: {
      handler(val, oldVal) {
        console.log({ val, oldVal });
        this.styleObject = {
          width: val && val.width ? val.width : "350px",
        };
      },
      deep: true,
    },
  },
  methods: {
    onConfirm() {
      this.value = this.popupConfig.confirmText;
      this.active = false;
      this.$emit("confirmed", {
        id: this.popupConfig.id,
        params: this.popupConfig.params,
      });
    },
    onCancel() {
      this.value = this.popupConfig.cancelText;
      this.active = false;
      this.$emit("canceled", {
        id: this.popupConfig.id,
        params: this.popupConfig.params,
      });
    },
  },
};
</script>
