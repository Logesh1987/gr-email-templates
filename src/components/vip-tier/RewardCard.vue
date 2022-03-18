<template>
  <div class="gradientBox oneTimeSection">
    <div class="gradientBoxInner">
      <div class="rewardContent">
        <h4>{{ getBenefitCategory() }}</h4>
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
            class="far fa-trash-alt rewardDelete"
            @click="deleteReward($event, benefit)"
          ></span>
          <span
            class="far fa-edit rewardEdit"
            @click="editReward($event, benefit)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.rewardItems {
  font-size: 1.2rem;
}
</style>
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
