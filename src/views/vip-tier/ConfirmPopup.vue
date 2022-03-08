<template>
  <div v-if="popupConfig">
    <!-- <md-dialog-confirm
      :md-active.sync="openPopup"
      :md-title="popupConfig.title"
      :md-content="popupConfig.content"
      :md-confirm-text="popupConfig.confirmText"
      :md-cancel-text="popupConfig.cancelText"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    /> -->
    <md-dialog
      :md-active.sync="openPopup"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    >
      <div class="contentWrapper">
        <div class="infoIcon"></div>
        <div class="content">
          <md-dialog-title>{{ popupConfig.title }}</md-dialog-title>
          <md-dialog-content>
            {{ popupConfig.content }}
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="secondaryBtn" @click="onCancel">{{
              popupConfig.cancelText
            }}</md-button>
            <md-button class="primaryBtn" @click="onConfirm">{{
              popupConfig.confirmText
            }}</md-button>
          </md-dialog-actions>
        </div>
      </div>
    </md-dialog>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_variables");
.primaryBtn {
  background-color: @primary-color;
  color: #fff !important;
}
.secondaryBtn {
  background-color: transparent;
  color: #e7e7e7;
  border: 1px solid #dbdbdb;
}
span.md-dialog-title {
  font-size: 18px;
  font-weight: bold;
}
.md-dialog-actions {
  justify-content: space-around;
  box-sizing: border-box;
  padding: 15px 15px 0 15px;
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
      width: 80px;
      height: 100%;
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
