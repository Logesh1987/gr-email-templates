<template>
  <div class="amvip-rewardItem">
    <img :src="getImgUrl(rewardData.imgurl)" alt="rewardData.imgurl" /><span>{{
      rewardData.value
    }}</span>
    <div class="amvip--rewardItemActions">
      <span class="icon-amedit" @click="editReward($event, rewardData)"></span
      ><span
        class="icon-amdelete"
        @click="deleteReward($event, rewardData)"
      ></span>
    </div>
    <span
      class="amvip--rewardItemType"
      :class="rewardData.rewardType == RewardType.OnGoing ? 'onGoing' : ''"
      >{{ rewardData.rewardType }}</span
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
      console.log("editClicked", data);
      this.$emit("editClicked", { context: this, data: data, eventObj: eve });
    },
    deleteReward(eve, data) {
      console.log("deleteClicked", data);
      this.$emit("deleteClicked", { context: this, data: data, eventObj: eve });
    },
  },
};
</script>
