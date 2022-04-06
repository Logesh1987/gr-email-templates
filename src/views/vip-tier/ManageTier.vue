<template>
  <div class="amvip--wrapper">
    <hgroup class="amvip--pageHeader">
      <div class="headerGroup">
        <!-- <span class="far fa-arrow-left" @click="goHome"></span> -->
        <h2>Manage Tiers</h2>
      </div>
      <div class="btnGroup">
        <div class="amvip--inlineFlex">
          <button
            id="emailSettings"
            class="amvip--btnCommon primaryBlueBtn"
            @click="gotoEmailSettings"
          >
            <span class="btnIcon far fa-envelope"></span>
            <span>Email Settings</span>
          </button>
          <button class="amvip--btnCommon primaryBtn" @click="gotoHome">
            <span class="btnIcon far fa-pen-square"></span>
            <span>Edit Tier Settings</span>
          </button>
          <!-- <router-link to="/view/tiers/editProgram" class="homeLink"
            >Edit program</router-link
          > -->
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
            <label
              for="statusToggle"
              id="statusToggleLable"
              class="amvip--customToggle"
            ></label>
          </div>
        </div>
      </div>
    </hgroup>
    <div class="amvip--container manageContainer">
      <div class="subHeader">
        <button class="amvip--btnCommon primaryBtn" @click="gotoAddTier">
          <span class="far fa-plus"></span> <span>Add Tier</span>
        </button>
      </div>
      <section class="amvip--tierWrap">
        <VipTierCard
          :tierData="tierObj"
          v-for="(tierObj, index) in tierData"
          :key="index"
          :isDeleteEnabled="tierObj.default !== 'Y'"
          v-on:editClicked="gotoEditTier"
          v-on:deleteClicked="confirmDelete"
          v-on:editRewardIconClicked="gotoEditReward"
          v-on:addBenefits="gotoAddBenefits"
          v-on:changeIconClicked="showIconPopup(tierObj)"
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
      <div id="moveCurrentUsers" v-if="getCurrentUserDetails() != 0">
        <h3>
          Move current users
          <div id="popoverWrapper">
            <span class="far fa-info-circle" v-popover:foo></span>
            <popover name="foo" event="hover">
              There are
              {{ getCurrentUserDetails() }}
              User(s) in the current Tier
            </popover>
          </div>
        </h3>
        <div>
          <md-radio v-model="deleteRadio" value="tier_down">Tier down</md-radio>
          <md-radio
            v-model="deleteRadio"
            value="tier_up"
            v-if="this.currentDeleteObj.data.next_tier.length > 0"
            >Tier up</md-radio
          >
          <md-radio v-model="deleteRadio" value="same_tier">Same tier</md-radio>
        </div>
        <p>
          There are {{ getCurrentUserDetails() }} User(s) in the current Tier.
        </p>
        <p v-if="deleteRadio == 'tier_down'">
          We will directly moved all the users in current tier to
          {{ this.currentDeleteObj.data.previous_tier }}.
        </p>
        <p v-if="deleteRadio == 'tier_up'">
          We will directly moved all the users in current tier to
          {{ this.currentDeleteObj.data.next_tier }}.
        </p>
        <p v-if="deleteRadio == 'same_tier'">
          We will pause the tier and the users will be in the same tier.
        </p>
      </div>
      <div class="contentWrapper">
        <div class="infoIcon">
          <i
            v-bind:class="
              deleteRadio == 'same_tier' ? 'fal fa-pause' : 'fal fa-trash-alt'
            "
          ></i>
        </div>
        <div class="messageArea">
          <div class="dialogTitle">Confirm!</div>
          <div class="dialogContent">
            {{
              this.deleteRadio == "same_tier" && getCurrentUserDetails() != 0
                ? "Are you sure, you want to pause the tier?"
                : "Are you sure, you want to delete the tier?"
            }}
          </div>
        </div>
      </div>
      <div class="footerContainer">
        <div class="spacer" style="min-width:80px;"></div>
        <md-dialog-actions>
          <md-button
            class="md-raised secondaryBtn"
            @click="onDeleteDialogClose(0)"
            >No, Keep it</md-button
          >
          <md-button
            class="md-raised primaryBtn"
            @click="onDeleteDialogClose(1)"
            >{{
              this.deleteRadio == "same_tier" && getCurrentUserDetails() != 0
                ? "Yes, Pause it"
                : "Yes, Delete it"
            }}</md-button
          >
        </md-dialog-actions>
      </div>
    </md-dialog>
    <GrPopover
      v-if="emailSettingPopover"
      popoverId="grPopover"
      targetId="emailSettings"
      cssClass="emailPopover"
      popoverTitle="VIP Tier Goal Achieved Email"
      popoverContent="This email will be sent to user once they acheived a new tier goal."
      :showOnLoad="true"
      @afterPopoverClose="popoverClose($event)"
    ></GrPopover>
    <GrPopover
      v-if="statusPopover"
      popoverId="grPopover_statusToggle"
      targetId="statusToggleLable"
      cssClass="statusPopover"
      popoverTitle="Activate Now"
      popoverContent="If you complete Please activate"
      :showOnLoad="true"
      @afterPopoverClose="popoverClose($event)"
    ></GrPopover>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_tier");
@import url("./../../assets/vip-tier/less/_variables");
#grPopover {
  width: 250px;
}
.homeLink {
  margin: 0 20px;
  font-weight: bold;
}
.manageContainer {
  .amvip--statusToggle {
    span {
      font-size: 14px;
      color: rgb(80, 80, 80);
    }
  }
  .subHeader {
    padding: 10px 0 10px;
    display: flex;
    justify-content: flex-end;
  }
  .amvip--inlineFlex > button:nth-child(1) {
    margin-right: 10px;
  }
}
#deleteDialog {
  .md-dialog-container {
    width: 350px;
    background: #fff;
    > div {
      padding: 10px 20px;
    }
  }
  .md-radio.md-theme-default .md-radio-container {
    border-color: #fff;
    background: #fff;
  }
  .md-radio.md-theme-default.md-checked .md-radio-container {
    border-color: @primary-color;
    background: @primary-color;
    &:after {
      border-color: #fff;
      background: #fff;
    }
  }
  .dialogTitle {
    font-weight: bold;
    padding: 10px 0;
  }
  .dialogContent {
    padding: 10px 0;
  }
  .md-dialog-actions {
    width: 100%;
  }

  div#moveCurrentUsers {
    background: @gradient-color;
    color: #fff;
    h3 {
      display: flex;
    }
    p {
      font-size: 14px;
      font-weight: normal;
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
    .md-radio.md-theme-default {
      border: 1px solid;
      padding: 10px 10px;
      border-radius: 20px;
      &.md-checked {
        background: #fff;
        color: #000;
        border-color: #fff;
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
  .footerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
}
</style>
<script>
import IconPopup from "./IconPopup";
import ConfirmPopup from "./ConfirmPopup";
import VipTierCard from "./../../components/vip-tier/TierCard";
import GrPopover from "./../../components/vip-tier/Popover";
import Axios from "axios";
export default {
  name: "ManageTier",
  components: {
    IconPopup,
    ConfirmPopup,
    VipTierCard,
    GrPopover,
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
      emailSettingPopover: true,
      statusPopover: true,
    };
  },
  mounted() {
    // this.landingPopup();
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
          window.sessionStorage.setItem("couponPrefix", res.data.prefix);
          window.sessionStorage.setItem(
            "tierData",
            JSON.stringify(this.tierData)
          );
          window.sessionStorage.setItem("dataChanged", false);
          this.landingPopup();
        }
      });
    } else {
      this.tierData = JSON.parse(tierData);
      this.landingPopup();
    }
    this.showOrHidePopover();
  },
  methods: {
    showOrHidePopover() {
      var grPopover = window.sessionStorage.getItem("hideSettingPopover");
      var grPopover_statusToggle = window.sessionStorage.getItem(
        "hideStatusPopover"
      );
      this.emailSettingPopover = !(grPopover && grPopover == "true");
      this.statusPopover = !(
        grPopover_statusToggle && grPopover_statusToggle == "true"
      );
    },
    popoverClose(eve) {
      console.log("closed", eve);
      const popoverId = eve.context.eleId;
      switch (popoverId) {
        case "grPopover":
          window.sessionStorage.setItem("hideSettingPopover", true);
          break;
        case "grPopover_statusToggle":
          window.sessionStorage.setItem("hideStatusPopover", true);
          break;
        default:
          break;
      }
    },
    hasUsers() {
      let hasUser = false;
      for (let index = 0; index < this.tierData.length; index++) {
        const data = this.tierData[index];
        if (data.users > 0) {
          hasUser = true;
          break;
        }
      }
      return hasUser;
    },
    getCurrentUserDetails() {
      return this.currentDeleteObj && this.currentDeleteObj?.data?.users
        ? this.currentDeleteObj.data.users
        : "0";
    },
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
    gotoAddBenefits(obj) {
      const currentTierId = obj.data.id;
      this.currentTierId = currentTierId;
      this.$router.push(`/view/tiers/add-reward/${this.currentTierId}`);
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
    gotoHome() {
      this.$router.push("/view/tiers/editProgram");
    },
    gotoEmailSettings() {
      this.$router.push("/view/tiers/email-settings");
    },
    showIconPopup(tierObj) {
      this.$refs.iconPopupEle.iconConfig = tierObj;
      this.enableIcon = true;
    },
    hideIconPopup() {
      this.enableIcon = false;
    },
    landingPopup() {
      this.popupConfig = {
        title: "Review and Launch!",
        content:
          "We have setup 4 tiers with default settings. You can review and launch.",
        confirmText: "Okay, Review it",
        id: "landingPopup",
        iconClass: "far fa-rocket",
        width: "400px",
      };
      const landingPopupFlg = window.sessionStorage.getItem(
        "isLandingPopupShown"
      );
      this.showConfirmPopup =
        !landingPopupFlg && !this.tierStatus && !this.hasUsers();
      // this.showConfirmPopup = true;
    },
    confirmTogglePromotion() {
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you agree to change the tier status?",
        confirmText: "Agree",
        cancelText: "Disagree",
        id: "statusUpdatePopup",
        iconClass: "far fa-ban",
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
          this.deleteTier();
          this.showDeleteDialog = false;
          // this.deleteTier(eve.params);
          break;
        case "statusUpdatePopup":
          this.updateStatus();
          break;
        case "finalConfirmSetup":
          this.tierStatus = 1;
          this.updateStatus();
          break;
        case "landingPopup":
          window.sessionStorage.setItem("isLandingPopupShown", true);
          break;
        default:
          break;
      }
    },
    cancelClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteTierPopup":
          this.showDeleteDialog = false;
          this.currentDeleteObj = null;
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
