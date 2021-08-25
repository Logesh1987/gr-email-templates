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
      this.$emit("confirmed", { id: this.dialogId });
    },
    onCancel() {
      this.value = this.popupConfig.cancelText;
      this.active = false;
      this.$emit("canceled", { id: this.dialogId });
    },
  },
};
</script>
