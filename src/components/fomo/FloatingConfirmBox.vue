<template>
  <div :class="`confirmationInfoBoxVue ${position || 'top-right'}`">
    <h5>{{ title || "Important!" }}</h5>
    <p>{{ description }}</p>
    <nav>
      <button class="bordered" @click="handleCancel">
        {{ cancelBtn || "Cancel" }}
      </button>
      <button class="proceed" @click="handleProceed">
        {{ proceedBtn || "Ok, GOT IT" }}
      </button>
    </nav>
  </div>
</template>
<script>
export default {
  name: "FloatingConfirmBox",
  props: [
    "title",
    "description",
    "proceedBtn",
    "cancelBtn",
    "handleCancel",
    "handleProceed",
    "position",
  ],
};
</script>
<style lang="less" scoped>
.confirmationInfoBoxVue {
  background: #ff6a48;
  border-radius: 5px;
  color: #fff;
  position: absolute;
  width: 200px;
  padding: 10px;
  transform: translateX(100%);
  z-index: 10;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    background: #ff6a48;
    position: absolute;
    left: -5px;
    transform: rotate(45deg);
  }
  &.top-right {
    top: 10%;
    right: 10px;
  }
  &.bottom-right {
    bottom: -10%;
    right: 10px;
    &:before {
      bottom: 10px;
    }
  }
  &.top-left {
    top: 10%;
    left: -10px;
    transform: translateX(-100%);
    &:before {
      right: -5px;
      left: auto;
    }
  }
  &.bottom-left {
    bottom: -10%;
    left: -10px;
    transform: translateX(-100%);
    &:before {
      bottom: 10px;
      right: -5px;
      left: auto;
    }
  }

  p {
    line-height: 1.2;
    font-size: 0.9em;
  }

  h5 {
    margin-top: 0;
    font-size: 1em;
    margin-bottom: 0.8em;
  }

  nav {
    text-align: right;
    padding-top: 1em;
  }

  button.bordered {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    margin-right: 5px;
  }
  button {
    border: none;
    background: #fff;
    border-radius: 15px;
    color: #ff6a48;
    font-weight: bold;
    line-height: 1;
    font-size: 0.9em;
    padding: 5px;
    cursor: pointer;
  }
}
</style>
