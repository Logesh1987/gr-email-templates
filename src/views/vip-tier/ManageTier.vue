<template>
  <div class="amvip--wrapper">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <!-- <span class="far fa-arrow-left" @click="goHome"></span> -->
        <h2>Manage Tiers</h2>
        <div class="amvip--inlineFlex">
          <router-link to="/view/tiers/editProgram" class="homeLink"
            >Edit program</router-link
          >
          <button class="amvip--btnCommon" @click="gotoAddTier">
            <span class="far fa-plus"></span> <span>Add Tier</span>
          </button>
          <div class="amvip--statusToggle">
            <span>Your Promotion is currently {{ getTierStatus() }}</span>
            <input
              type="checkbox"
              name="status"
              id="statusToggle"
              :checked="tierStatus"
              v-model="tierStatus"
              @change="confirmTogglePromotion"
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
          v-on:editTierIconClicked="showIconPopup(tierObj)"
          v-on:editClicked="gotoEditTier"
          v-on:deleteClicked="confirmDelete"
          v-on:editRewardIconClicked="gotoEditReward"
        ></VipTierCard>
      </section>
    </div>
    <IconPopup
      ref="iconPopupEle"
      :showPopup="enableIcon"
      v-on:close-btn-click="hideIconPopup"
    ></IconPopup>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
    ></ConfirmPopup>
    <md-snackbar
      :md-position="'center'"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ responseData }}</span>
    </md-snackbar>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_tier");
.homeLink {
  margin: 0 20px;
  font-weight: bold;
}
</style>
<script>
import IconPopup from "./IconPopup";
import ConfirmPopup from "./ConfirmPopup";
import VipTierCard from "./../../components/vip-tier/TierCard";
import Axios from "axios";
export default {
  name: "ManageTier",
  components: {
    IconPopup,
    ConfirmPopup,
    VipTierCard,
  },
  props: ["currentTierId"],
  data: function() {
    return {
      enableIcon: false,
      showConfirmPopup: false,
      popupConfig: {},
      tierData: [],
      tierStatus: true,
      showSnackbar: false,
      responseData: "",
    };
  },
  mounted() {
    const statusData = window.sessionStorage.getItem("statusData")
      ? +window.sessionStorage.getItem("statusData")
      : null;
    if (statusData === null) {
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      Axios.get(statusUrl)
        .then((res) => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.tierStatus = res.data.data.status;
            window.sessionStorage.setItem("statusData", this.tierStatus);
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        });
    } else {
      this.tierStatus = statusData;
    }
    const tierData = window.sessionStorage.getItem("tierData");
    const dataChanged = window.sessionStorage.getItem("dataChanged") == "true";
    if (!tierData || (dataChanged && tierData)) {
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.get(url)
        .then((res) => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.tierData = res.data.data;
            window.sessionStorage.setItem(
              "tierData",
              JSON.stringify(this.tierData)
            );
            window.sessionStorage.setItem("dataChanged", false);
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        });
    } else {
      this.tierData = JSON.parse(tierData);
    }
  },
  methods: {
    getTierStatus() {
      return this.tierStatus ? "Active" : "Inactive";
    },
    gotoEditReward(obj) {
      const currentRewardId = obj.data.id_tier_rewards;
      this.currentRewardId = currentRewardId;
      this.$router.replace({
        name: "EditReward",
        params: {
          id_tier: obj.tierId,
          currentRewardId: currentRewardId,
          origin: "manageTier",
        },
      });
    },
    gotoEditTier(obj) {
      this.currentTierId = obj.data.id;
      this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
    },
    confirmDelete(obj) {
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you sure, you want to delete the tier?",
        confirmText: "OK",
        cancelText: "Cancel",
        id: "deleteTierPopup",
        params: obj,
      };
      this.showConfirmPopup = true;
    },
    deleteTier(obj) {
      const url = this.getApiUrl(`Tiers/Managetiers/${obj.data.id}`);
      Axios.delete(url)
        .then((res) => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.data.message != undefined) {
              this.responseData = res.data.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            window.sessionStorage.setItem("dataChanged", true);
            const manageUrl = this.getApiUrl("Tiers/Managetiers");
            Axios.get(manageUrl)
              .then((res) => {
                if (res.data.error) {
                  this.responseData = res.data.error.message;
                  if (this.responseData && this.responseData.length > 0) {
                    this.showSnackbar = true;
                  }
                  return false;
                } else {
                  if (res.data.data.message != undefined) {
                    this.responseData = res.data.data.message;
                    if (this.responseData && this.responseData.length > 0) {
                      this.showSnackbar = true;
                    }
                  }
                  this.tierData = res.data.data;
                }
              })
              .catch((err) => {
                this.responseData = err;
                this.showSnackbar = true;
              });
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        });
    },
    gotoAddTier() {
      this.$router.push("/view/tiers/add-tier");
    },
    showIconPopup(tierObj) {
      this.$refs.iconPopupEle.iconConfig = tierObj;
      this.enableIcon = true;
    },
    hideIconPopup() {
      this.enableIcon = false;
    },
    confirmTogglePromotion() {
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you agree to change the tier status?",
        confirmText: "Agree",
        cancelText: "Disagree",
        id: "statusUpdatePopup",
      };
      this.showConfirmPopup = true;
    },
    updateStatus() {
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      Axios.post(statusUrl, { status: this.tierStatus ? 1 : 0 })
        .then((res) => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.data.message != undefined) {
              this.responseData = res.data.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            window.sessionStorage.setItem(
              "statusData",
              this.tierStatus ? 1 : 0
            );
            this.getTierStatus();
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        });
    },
    confirmClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteTierPopup":
          this.deleteTier(eve.params);
          break;
        case "statusUpdatePopup":
          this.updateStatus();
          break;
        default:
          break;
      }
    },
    cancelClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteTierPopup":
          break;
        case "statusUpdatePopup":
          this.tierStatus = !this.tierStatus;
          this.getTierStatus();
          break;
        default:
          break;
      }
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
