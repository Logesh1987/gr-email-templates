<template>
  <div class="amvip--wrapper">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <!-- <span class="icon-next-arrow" @click="goHome"></span> -->
        <h2>Manage Tiers</h2>
        <div class="amvip--inlineFlex">
          <router-link to="/view/tiers/editProgram" class="homeLink"
            >Edit program</router-link
          >
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
          v-on:editTierIconClicked="showIconPopup"
          v-on:editClicked="gotoEditTier"
          v-on:deleteClicked="confirmDelete"
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
      showSnackbar: false,
      responseData: "",
    };
  },
  mounted() {
    this.loader = true;
    const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
    Axios.get(statusUrl)
      .then(res => {
        if (res.data.error) {
          this.responseData = res.data.error.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          return false;
        } else {
          if (res.data.data.message != undefined) {
            this.responseData = res.data.data.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
          }
          this.tierStatus = res.data.data.status;
        }
      })
      .catch(err => {
        this.responseData = err;
        this.showSnackbar = true;
      })
      .finally(() => {
        this.loader = false;
      });
    const url = this.getApiUrl("Tiers/Managetiers");
    Axios.get(url)
      .then(res => {
        if (res.data.error) {
          this.responseData = res.data.error.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          return false;
        } else {
          if (res.data.data.message != undefined) {
            this.responseData = res.data.data.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
          }
          this.tierData = res.data.data;
        }
      })
      .catch(err => {
        this.responseData = err;
        this.showSnackbar = true;
      })
      .finally(() => {
        this.loader = false;
      });
  },
  methods: {
    getTierStatus() {
      return this.tierStatus ? "Active" : "Inactive";
    },
    gotoEditReward(obj) {
      const currentRewardId = obj.data.id_tier_rewards;
      this.$router.push("/view/tiers/manage-reward/" + currentRewardId);
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
      this.loader = true;
      const url = this.getApiUrl(`Tiers/Managetiers/${obj.data.id}`);
      Axios.delete(url)
        .then(res => {
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
            this.loader = true;
            const manageUrl = this.getApiUrl("Tiers/Managetiers");
            Axios.get(manageUrl)
              .then(res => {
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
              .catch(err => {
                this.responseData = err;
                this.showSnackbar = true;
              })
              .finally(() => {
                this.loader = false;
              });
          }
        })
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
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
      this.loader = true;
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      Axios.post(statusUrl, { status: this.tierStatus ? 1 : 0 })
        .then(res => {
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
            this.getTierStatus();
          }
        })
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .finally(() => {
          this.loader = false;
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
