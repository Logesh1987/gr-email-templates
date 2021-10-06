<template>
  <div class="amvip--tierCol" :class="getTierClass(tierData.name)">
    <div>
      <header :style="{ 'background-color': tierData.color }">
        <div
          class="amvip--cardImg"
          v-if="tierData.icon.length > 0"
          v-bind:style="{
            backgroundImage: 'url(' + getCDNImage(tierData.icon) + ')',
            backgroundSize: '100% 100%',
          }"
        >
          <span
            class="icon-amedit"
            @click="editTierIcon($event, tierData)"
          ></span>
        </div>
        <div class="amvip--cardImg" v-else>
          <span
            class="icon-amedit"
            @click="editTierIcon($event, tierData)"
          ></span>
        </div>
        <h3>{{ tierData.name }}</h3>
        <div class="amvip--cardAction">
          <span class="icon-amedit" @click="editTier($event, tierData)"></span>
          <span
            v-if="isDeleteEnabled"
            class="icon-amdelete"
            @click="deleteTier($event, tierData)"
          ></span>
        </div>
      </header>
      <div class="amvip--tierDetails">
        <h4 v-if="tierData.goal !== 0">Eligibility</h4>
        <ul class="amvip--bulletList" v-if="tierData.goal !== 0">
          <li>
            {{ tierData.goaltxt }}
          </li>
        </ul>
        <div v-else class="eligibilityDesc">{{ tierData.description }}</div>
        <h4>Benefits</h4>
        <ul class="amvip--bulletList">
          <li
            v-for="benefit of tierData.rewards"
            :key="benefit.index"
            class="rewardItem"
          >
            {{ benefit.name }}
            <span
              class="icon-amedit rewardEdit"
              @click="editRewardIcon($event, benefit, tierData.id)"
            ></span>
          </li>
          <li v-if="tierData.rewards.length == 0" class="info">
            Rewards yet to be added!!!
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.amvip--tierDetails.pt-20 {
  padding-top: 20px;
}
li.info {
  color: rgb(252, 76, 76);
}
li.rewardItem {
  .rewardEdit {
    display: none;
    cursor: pointer;
    padding: 0 10px;
  }
  &:hover {
    .rewardEdit {
      display: inline-block;
    }
  }
}
.eligibilityDesc {
  margin: 15px 0;
}
</style>
<script>
export const TierType = {
  Bronze: "Bronze",
  Silver: "Silver",
  Gold: "Gold",
  Diamond: "Diamond",
  Platinum: "Platinum",
};
export default {
  name: "VipTierCard",
  props: ["tierData", "isDeleteEnabled"],
  model: {
    event:
      "editClicked, deleteClicked, editTierIconClicked, editRewardIconClicked",
  },
  data: () => ({}),
  methods: {
    getImgUrl(image) {
      return require("./../../assets/vip-tier/images/" + image);
    },
    editTier(eve, data) {
      this.$emit("editClicked", { context: this, data: data, eventObj: eve });
    },
    editTierIcon(eve, data) {
      this.$emit("editTierIconClicked", {
        context: this,
        data: data,
        event: eve,
      });
    },
    editRewardIcon(eve, data, tierId) {
      this.$emit("editRewardIconClicked", {
        context: this,
        data: data,
        event: eve,
        tierId: tierId,
      });
    },
    deleteTier(eve, data) {
      this.$emit("deleteClicked", { context: this, data: data, eventObj: eve });
    },
    getTierClass(title) {
      let tierClass = "";
      switch (title) {
        case TierType.Gold:
          tierClass = "amvip--gold";
          break;
        case TierType.Platinum:
          tierClass = "amvip--platinum";
          break;
        case TierType.Bronze:
          tierClass = "amvip--bronze";
          break;
        case TierType.Silver:
          tierClass = "amvip--silver";
          break;
        default:
          break;
      }
      return tierClass;
    },
  },
};
</script>
