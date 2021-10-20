<template>
  <div class="amvip-rewardItem">
    <img
      v-if="rewardData.reward_icon && rewardData.reward_icon.length > 0"
      :src="getImgUrl(rewardData.reward_icon)"
      alt="rewardData.reward_icon"
    /><span>{{ rewardData.name }}</span>
    <div class="amvip--rewardItemActions">
      <span class="far fa-edit" @click="editReward($event, rewardData)"></span
      ><span
        class="far fa-trash-alt"
        @click="deleteReward($event, rewardData)"
      ></span>
    </div>
    <span
      class="amvip--rewardItemType"
      :class="rewardData.is_onetime_ongoing == 2 ? 'onGoing' : 'oneTime'"
      >{{ rewardData.is_onetime_ongoing == 2 ? "On Going" : "One Time" }}</span
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
  mounted() {},
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
