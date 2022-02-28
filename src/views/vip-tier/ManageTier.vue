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
    <md-dialog :md-active.sync="showDeleteDialog" id="deleteDialog">
      <div id="moveCurrentUsers">
        <h3>
          Move current users
          <div id="popoverWrapper">
            <span class="far fa-info-circle" v-popover:foo></span>
            <popover name="foo" event="hover">
              We will directly moved all the users in Gold to Silver
            </popover>
          </div>
        </h3>

        <div>
          <md-radio v-model="deleteRadio" value="tier_down">Tier down</md-radio>
          <md-radio v-model="deleteRadio" value="tier_up">Tier up</md-radio>
          <md-radio v-model="deleteRadio" value="same_tier">Same tier</md-radio>
        </div>
      </div>
      <div class="dialogTitle">Confirm!</div>
      <div class="dialogContent">
        {{
          this.deleteRadio == "same_tier"
            ? "Are you sure, you want to pause the tier?"
            : "Are you sure, you want to delete the tier?"
        }}
      </div>
      <md-dialog-actions>
        <md-button class="md-raised" @click="onDeleteDialogClose(0)"
          >No, Keep it</md-button
        >
        <md-button
          class="md-raised deleteBtn"
          @click="onDeleteDialogClose(1)"
          >{{
            this.deleteRadio == "same_tier" ? "Yes, Pause it" : "Yes, Delete it"
          }}</md-button
        >
      </md-dialog-actions>
    </md-dialog>
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
#deleteDialog {
  .md-dialog-container {
    background: #eee;
    > div {
      padding: 10px 20px;
    }
  }

  .dialogTitle {
    font-weight: bold;
  }

  div#moveCurrentUsers {
    background: #12443b;
    color: #fff;
    h3 {
      display: flex;
    }
    #popoverWrapper {
      margin-left: 10px;
      position: relative;
      [data-popover="foo"] {
        background: #f9f9f9;
        color: #444;
        font-size: 12px;
        line-height: 1.5;
        margin: 5px;
        z-index: 10000 !important;
        top: 20px !important;
        left: -85px !important;
        position: absolute !important;
      }
    }
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    color: #fff;
    background-color: #aaa8aa;
    &.deleteBtn {
      background-color: #12443b;
    }
  }
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
      deleteRadio: "tier_down",
      showDeleteDialog: false,
      currentDeleteObj: null,
    };
  },
  mounted() {
    this.popupConfig = {
      title: "Review or Launch",
      content:
        "We have setup 4 tiers with default settings. You can review or launch.",
      confirmText: "Yes, Launch",
      cancelText: "No, Review",
      id: "finalConfirmSetup",
    };
    this.showConfirmPopup = true;
    const statusData = window.sessionStorage.getItem("statusData")
      ? +window.sessionStorage.getItem("statusData")
      : null;
    if (statusData === null) {
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      Axios.get(statusUrl).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          this.tierStatus = res.data.data.status;
          window.sessionStorage.setItem("statusData", this.tierStatus);
        }
      });
    } else {
      this.tierStatus = statusData;
    }
    const tierData = window.sessionStorage.getItem("tierData");
    const dataChanged = window.sessionStorage.getItem("dataChanged") == "true";
    if (!tierData || (dataChanged && tierData)) {
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.get(url).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          this.tierData = res.data.data;
          window.sessionStorage.setItem(
            "tierData",
            JSON.stringify(this.tierData)
          );
          window.sessionStorage.setItem("dataChanged", false);
        }
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
      this.currentDeleteObj = obj;
      this.showDeleteDialog = true;
    },
    onDeleteDialogClose(status) {
      if (status == 0) {
        this.showDeleteDialog = false;
        this.currentDeleteObj = null;
      } else {
        this.deleteTier();
        this.showDeleteDialog = false;
      }
    },
    deleteTier() {
      const url = this.getApiUrl(
        `Tiers/Managetiers/${this.currentDeleteObj.data.id}`
      );
      console.log(this.deleteRadio);
      Axios.delete(url, { data: { userStatus: this.deleteRadio } }).then(
        (res) => {
          if (res.data.error) {
            return false;
          } else {
            window.sessionStorage.setItem("dataChanged", true);
            const manageUrl = this.getApiUrl("Tiers/Managetiers");
            Axios.get(manageUrl).then((res) => {
              if (res.data.error) {
                return false;
              } else {
                this.tierData = res.data.data;
              }
            });
          }
          this.currentDeleteObj = null;
          this.deleteRadio = "tier_down";
        }
      );
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
      Axios.post(statusUrl, { status: this.tierStatus ? 1 : 0 }).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          window.sessionStorage.setItem("statusData", this.tierStatus ? 1 : 0);
          this.getTierStatus();
        }
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
        case "finalConfirmSetup":
          this.tierStatus = 1;
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
        case "finalConfirmSetup":
          this.tierStatus = 0;
          this.updateStatus();
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
