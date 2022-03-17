<template>
  <!-- <div class="amvip-rewardItem">
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
      >{{
        rewardData.is_onetime_ongoing == 2
          ? "In-Tier Benefits"
          : "Welcome reward"
      }}</span
    >
  </div> -->
  <div class="gradientBox oneTimeSection">
    <div class="gradientBoxInner">
      <div class="rewardContent">
        <h3>{{ getBenefitCategory() }}</h3>
        <md-button class="md-raised secondaryBtn" @click="addReward($event)">
          <span class="far fa-plus"></span>
          <span>Add</span>
        </md-button>
      </div>
      <div
        class="rewardItems"
        v-for="benefit of rewardData"
        :key="benefit.index"
      >
        <div class="benefitContent">
          <i class="fas fa-check-circle pointer"></i> {{ benefit.name }}
        </div>
        <div class="actionIcons">
          <span
            class="far fa-edit rewardEdit"
            @click="editReward($event, benefit)"
          ></span>
          <span
            class="far fa-trash rewardDelete"
            @click="deleteReward($event, benefit)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less"></style>
<script>
export default {
  name: "VipRewardCard",
  props: ["rewardData", "type"],
  model: {
    event: "editClicked, deleteClicked, addClicked",
  },
  data: () => ({}),
  mounted() {},
  methods: {
    getBenefitCategory() {
      return this.type == "oneTime" ? "One Time Benefits" : "Annual Benefits";
    },
    addReward(eve) {
      this.$emit("addClicked", { context: this, eventObj: eve });
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
