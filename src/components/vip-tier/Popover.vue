<template>
  <div id="gr-popover">
    <span class="fal fa-times closeIcon" @click="closeIconClick()"></span>
  </div>
</template>

<script>
export default {
  name: "Popover",
  events: ["afterPopoverClose"],
  props: ["targetId", "cssClass"],
  data: () => {
    return {};
  },
  mounted() {},
  methods: {
    closeIconClick() {
      this.$emit("afterPopoverClose", { context: this });
    },
  },
};
</script>

<style></style>
