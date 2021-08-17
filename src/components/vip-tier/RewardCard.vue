<template>
  <div class="amvip-rewardItem">
    <img
      v-if="rewardData.reward_icon.length > 0"
      :src="getImgUrl(rewardData.reward_icon)"
      alt="rewardData.reward_icon"
    /><span>{{ rewardData.name }}</span>
    <div class="amvip--rewardItemActions">
      <span class="icon-amedit" @click="editReward($event, rewardData)"></span
      ><span
        class="icon-amdelete"
        @click="deleteReward($event, rewardData)"
      ></span>
    </div>
    <span
      class="amvip--rewardItemType"
      :class="
        rewardData.settings.rewardtype == RewardType.OnGoing ? 'onGoing' : ''
      "
      >{{ rewardData.settings.rewardtype }}</span
    >
  </div>
</template>
<style lang="less"></style>
<script>
// import RewardType from "./../../model/vip-tier/constants.js";
export const RewardType = {
  OnGoing: "On Going",
  OneTime: "One Time",
};
export default {
  name: "VipRewardCard",
  props: ["rewardData"],
  model: {
    event: "editClicked, deleteClicked",
  },
  data: () => ({
    RewardType: RewardType,
  }),
  methods: {
    getImgUrl(image) {
      return require("./../../assets/vip-tier/images/" + image);
    },
    editReward(eve, data) {
      this.$emit("editClicked", { context: this, data: data, eventObj: eve });
    },
    deleteReward(eve, data) {
      this.$emit("deleteClicked", { context: this, data: data, eventObj: eve });
    },
  },
};
</script>
