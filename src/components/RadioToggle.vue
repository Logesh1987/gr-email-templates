<template>
  <div class="switch-field">
    <div
      class="switch-wrapper"
      v-bind:class="checkedValue == radioItem.value ? 'checked' : ''"
      v-for="radioItem in dataSource"
      :key="radioItem.id"
    >
      <div class="customIcon" v-if="radioItem.iconClass">
        <i v-bind:class="radioItem.iconClass"></i>
      </div>
      <input
        type="radio"
        :id="'radio-' + radioItem.value + '-' + radioItem.id"
        :name="groupName"
        :value="radioItem.value"
        @change="optionChange($event, radioItem)"
      />
      <label :for="'radio-' + radioItem.value + '-' + radioItem.id">{{
        radioItem.viewValue
      }}</label>
    </div>
  </div>
</template>
<style lang="less">
@import url("./../assets/styles/variables.less");
.switch-field {
  display: flex;
  .switch-wrapper {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    border: 1px solid #efefef;
    border-collapse: collapse;
    &.checked {
      background-color: @primaryColor;
      label {
        color: #fff;
      }
      .customIcon {
        color: #fff;
      }
    }
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
    .customIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0 0 10px;
    }
    input {
      position: absolute !important;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      width: 1px;
      border: 0;
      overflow: hidden;
    }
    label {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      text-align: center;
      height: 100%;
      display: inline-block;
      line-height: 15px;
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
<script>
export default {
  name: "RadioToggle",
  props: ["radioData", "radioGroupName"],
  events: ["radioChange"],
  data: () => {
    return {
      dataSource: [],
      groupName: "",
      checkedValue: "",
    };
  },
  mounted() {
    this.dataSource = this.$props.radioData;
    this.groupName = this.$props.radioGroupName;
  },
  methods: {
    optionChange(event, data) {
      this.checkedValue = data.value;
      this.$emit("radioChange", event, data);
    },
  },
};
</script>
