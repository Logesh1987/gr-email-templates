<template>
  <div class="amvip--wrapper">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goBack"></span>
        <h2>Manage Tiers</h2>
        <div class="amvip--inlineFlex">
          <button class="amvip--btnCommon" @click="gotoAddTier">
            <span class="icon-plus"></span> <span>Add Tier</span>
          </button>
          <div class="amvip--statusToggle">
            <span>Your Promotion is currently Inactive</span>
            <input
              type="checkbox"
              name=""
              id="statusToggle"
              @change="togglePromotion"
            />
            <label for="statusToggle" class="amvip--customToggle"></label>
          </div>
        </div>
      </hgroup>

      <section class="amvip--tierWrap">
        <VipTierCard
          :tierData="tierObj"
          v-for="tierObj of tierData"
          :key="tierObj.index"
          v-on:editTierIconClicked="showIconPopup"
          v-on:editClicked="gotoEditTier"
          v-on:deleteClicked="deleteTier"
        ></VipTierCard>
      </section>
    </div>
    <IconPopup
      :showPopup="enableIcon"
      v-on:close-btn-click="hideIconPopup"
    ></IconPopup>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      v-on:confirmed="confirmClicked"
      v-on:canceled="cancelClicked"
    ></ConfirmPopup>
    <Loader :status="loader"></Loader>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_tier");
</style>
<script>
import IconPopup from "./IconPopup";
import ConfirmPopup from "./ConfirmPopup";
import VipTierCard from "./../../components/vip-tier/TierCard";
import Axios from "axios";
import Loader from "./../../components/Loader.vue";
export default {
  name: "ManageTier",
  components: {
    IconPopup,
    ConfirmPopup,
    VipTierCard,
    Loader,
  },
  props: ["currentTierId"],
  data: function() {
    return {
      enableIcon: false,
      showConfirmPopup: false,
      tierData: [],
      loader: false,
    };
  },
  mounted() {
    this.loader = true;
    Axios.get("https://vip-tier.free.beeceptor.com/Tiers/Managetiers")
      .then(res => {
        console.log(res);
        this.tierData = res.data;
      })
      .catch(err => {
        console.log("error", err);
      })
      .finally(() => {
        this.loader = false;
      });
  },
  methods: {
    gotoEditTier(obj) {
      console.log("from edit tier fn=======", obj);
      this.currentTierId = obj.data.id;
      this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
    },
    deleteTier(data) {
      console.log("delete Tier fn=====", data);
    },
    gotoAddTier() {
      this.$router.push("/view/tiers/add-tier");
    },
    showIconPopup() {
      this.enableIcon = true;
    },
    hideIconPopup() {
      this.enableIcon = false;
    },
    togglePromotion() {
      this.showConfirmPopup = true;
    },
    confirmClicked() {
      this.showConfirmPopup = false;
    },
    cancelClicked() {
      const checkboxEle = document.getElementById("statusToggle");
      checkboxEle.checked = !checkboxEle.checked;
      this.showConfirmPopup = false;
    },
    goBack() {
      history.back();
    },
  },
};
</script>
