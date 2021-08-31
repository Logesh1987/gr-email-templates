<template>
  <div class="notification">
    <p class="info">
      <span class="material-icons campaign">
        campaign
      </span>
      <b>Footer credit!</b> Do you want to display your branding on the front
      end? Upgrade to add on.
      <span class="material-icons">
        help
        <md-tooltip
          >Upgrading will remove our branding & allow you to display your
          branding in the front end.</md-tooltip
        >
      </span>
    </p>
  </div>
</template>
<script>
export default {
  name: "Notifications",
  components: {},

  data: function() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.notification {
  background: #fff8d7;
  border: 1px solid #efe6be;
  border-radius: 3px;
  color: #000;
  padding: 0 5px 0 15px;
  margin: 0 0 20px;
  .info {
    display: flex;
    align-items: center;
    .campaign {
      font-size: 36px;
      padding-right: 10px;
    }
    b {
      padding-right: 10px;
    }
  }
}
</style>
