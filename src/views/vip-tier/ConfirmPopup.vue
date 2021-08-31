<template>
  <div v-if="popupConfig">
    <md-dialog-confirm
      :md-active.sync="openPopup"
      :md-title="popupConfig.title"
      :md-content="popupConfig.content"
      :md-confirm-text="popupConfig.confirmText"
      :md-cancel-text="popupConfig.cancelText"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    />
  </div>
</template>
<style lang="less"></style>

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
