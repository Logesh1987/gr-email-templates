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
      <div
        class="amvip--tierDetails"
        v-if="tierData.default !== 'Y' || tierData.goal !== 0"
      >
        <h4>Eligibility</h4>
        <ul class="amvip--bulletList">
          <li>
            {{ tierData.goal == 0 ? "NA" : tierData.goaltxt }}
          </li>
        </ul>
        <h4>Benefits</h4>
        <ul class="amvip--bulletList">
          <li v-for="benefit of tierData.rewards" :key="benefit.index">
            {{ benefit.description }}
          </li>
          <li v-if="tierData.rewards.length == 0">
            NA
          </li>
        </ul>
      </div>
      <div class="amvip--tierDetails pt-20" v-else>
        <!-- <h4>Description</h4> -->
        <p>{{ tierData.description }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.amvip--tierDetails.pt-20 {
  padding-top: 20px;
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
    event: "editClicked, deleteClicked, editTierIconClicked",
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
