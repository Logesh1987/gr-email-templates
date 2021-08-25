<template>
  <div class="amvip--wrapper">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goHome"></span>
        <h2>Manage Tiers</h2>
        <div class="amvip--inlineFlex">
          <button class="amvip--btnCommon" @click="gotoAddTier">
            <span class="icon-plus"></span> <span>Add Tier</span>
          </button>
          <div class="amvip--statusToggle">
            <span>Your Promotion is currently {{ getTierStatus() }}</span>
            <input
              type="checkbox"
              name="status"
              id="statusToggle"
              :checked="tierStatus"
              v-model="tierStatus"
              @change="togglePromotion"
            />
            <label for="statusToggle" class="amvip--customToggle"></label>
          </div>
        </div>
      </hgroup>

      <section class="amvip--tierWrap">
        <VipTierCard
          :tierData="tierObj"
          v-for="(tierObj, index) in tierData"
          :key="index"
          :isDeleteEnabled="tierObj.default !== 'Y'"
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
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
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
      popupConfig: {},
      tierData: [],
      loader: false,
      tierStatus: true,
    };
  },
  mounted() {
    this.loader = true;
    const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
    Axios.get(statusUrl)
      .then(res => {
        console.log(res);
        this.tierStatus = res.data.data.status;
      })
      .catch(err => err)
      .finally(() => {
        this.loader = false;
      });
    const url = this.getApiUrl("Tiers/Managetiers");
    Axios.get(url)
      .then(res => {
        console.log(res);
        this.tierData = res.data.data;
      })
      .catch(err => {
        console.log("error", err);
      })
      .finally(() => {
        this.loader = false;
      });
  },
  methods: {
    getTierStatus() {
      return this.tierStatus ? "Active" : "Inactive";
    },
    gotoEditTier(obj) {
      console.log("from edit tier fn=======", obj);
      this.currentTierId = obj.data.id;
      this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
    },
    deleteTier(obj) {
      console.log("delete Tier fn=====", obj.data.id);
      this.loader = true;
      const url = this.getApiUrl(`Tiers/Managetiers/${obj.data.id}`);
      Axios.delete(url)
        .then(res => {
          console.log(res);
          this.loader = true;
          const manageUrl = this.getApiUrl("Tiers/Managetiers");
          Axios.get(manageUrl)
            .then(res => {
              console.log(res);
              this.tierData = res.data.data;
            })
            .catch(err => {
              console.log("error", err);
            })
            .finally(() => {
              this.loader = false;
            });
        })
        .catch(err => err)
        .finally(() => {
          this.loader = false;
        });
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
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you agree to change the tier status?",
        confirmText: "Agree",
        cancelText: "Disagree",
        id: "statusPopup",
      };
      this.showConfirmPopup = true;
    },
    confirmClicked(eve) {
      console.log(eve);
      this.showConfirmPopup = false;
      this.loader = true;
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      Axios.post(statusUrl, { status: this.tierStatus ? 1 : 0 })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          this.loader = false;
        });
      this.getTierStatus();
    },
    cancelClicked(eve) {
      console.log(eve);
      this.tierStatus = !this.tierStatus;
      this.showConfirmPopup = false;
      this.getTierStatus();
    },
    goBack() {
      this.$router.push("/view/tiers/home");
    },
    goHome() {
      this.$router.push("/view/tiers/home");
    },
  },
};
</script>
