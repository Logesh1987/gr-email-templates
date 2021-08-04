<template>
  <div class="amvip--tierCol" :class="getTierClass(tierData.title)">
    <div>
      <header>
        <div class="amvip--cardImg">
          <img :src="getImgUrl(tierData.imgurl)" :alt="tierData.imgurl" />
          <span
            class="icon-amedit"
            @click="editTierIcon($event, tierData)"
          ></span>
        </div>
        <h3>{{ tierData.title }}</h3>
        <div class="amvip--cardAction">
          <span class="icon-amedit" @click="editTier($event, tierData)"></span>
          <span
            class="icon-amdelete"
            @click="deleteTier($event, tierData)"
          ></span>
        </div>
      </header>
      <div class="amvip--tierDetails">
        <h4>{{ tierData.eleigibityTitle }}</h4>
        <ul class="amvip--bulletList">
          <li
            v-for="eligibility of tierData.elegibilityList"
            :key="eligibility.index"
          >
            {{ eligibility }}
          </li>
        </ul>
        <h4>{{ tierData.benefitsTitle }}</h4>
        <ul class="amvip--bulletList">
          <li v-for="benefit of tierData.benefitsList" :key="benefit.index">
            {{ benefit }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less"></style>
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
  props: ["tierData"],
  model: {
    event: "editClicked, deleteClicked, editTierIconClicked",
  },
  data: () => ({}),
  methods: {
    getImgUrl(image) {
      debugger;
      return require("./../../assets/vip-tier/images/" + image);
    },
    editTier(eve, data) {
      console.log("editClicked", data);
      this.$emit("editClicked", { context: this, data: data, eventObj: eve });
    },
    editTierIcon(eve, data) {
      console.log("editIconClicked", data);
      this.$emit("editTierIconClicked", {
        context: this,
        data: data,
        event: eve,
      });
    },
    deleteTier(eve, data) {
      console.log("deleteClicked", data);
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
