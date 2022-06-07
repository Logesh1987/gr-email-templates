<template>
  <div class="amvip--wrapper amvip-editTier">
    <hgroup class="amvip--pageHeader">
      <div class="headerGroup">
        <span class="far fa-arrow-left" @click="goBack"></span>
        <h2>{{ form.name }}</h2>
      </div>
    </hgroup>
    <div class="amvip--container">
      <section class="amvip--editTierRow">
        <div class="amvip--editTierContent">
          <div class="amvip--formRow" :class="getValidationClass('name')">
            <label for="name">
              Name
              <span class="amvip--mandatory">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="form.name"
              ref="name"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.name.required">
              Name is required
            </span>
            <span class="md-error" v-else-if="!$v.form.name.minLength">
              Minimum of 3 letters required
            </span>
          </div>
          <div class="amvip--formRow">
            <md-field>
              <label for="description">Description</label>
              <md-textarea
                name="description"
                id="description"
                v-model="form.description"
                :disabled="sending"
              ></md-textarea>
            </md-field>
          </div>
          <div class="amvip--formRow multiCol">
            <label for="color">Background color</label>
            <div class="amvip--colorInfo">
              <ColorPicker
                ref="colorPicker"
                id="color"
                name="color"
                :color="form.color"
                v-model="form.color"
                v-on:input="(e) => (form.color = e)"
              ></ColorPicker>
            </div>
          </div>
          <div
            class="amvip--formRow multiCol"
            :class="getValidationClass('goal')"
          >
            <label for="goal">
              {{
                tierDefine == "points"
                  ? "Points needed"
                  : "Purchase Value needed"
              }}
              <span class="amvip--mandatory">*</span>
            </label>
            <input
              name="goal"
              id="goal"
              ref="goal"
              type="number"
              v-model="form.goal"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.goal.required">
              Points needed field is required
            </span>
            <span class="md-error" v-else-if="!$v.form.goal.customMinValue">
              Minimum value of point needed would be 25
            </span>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Tier Icon <span class="amvip--mandatory">*</span></label>
            <div class="amvip--icon">
              <span
                id="fileUpload"
                class="amvip--iconPreview"
                v-bind:class="validURL(form.icon) ? '' : form.icon"
                v-bind:style="
                  validURL(form.icon)
                    ? {
                        backgroundImage: 'url(' + form.icon + ')',
                      }
                    : { color: form.color }
                "
                @click="showIconPopup()"
              >
                <span class="custom-icon far fa-edit"></span>
              </span>
              <span class="md-error" v-if="!$v.form.icon.required">
                Tier icon is required
              </span>
            </div>
          </div>
        </div>
        <div class="amvip--rewardsCol" v-if="rewardData.length > 0">
          <div class="tierDetails">
            <h3>Tier details</h3>
            <div class="gradientBox">
              <div class="gradientBoxInner">
                <div class="tierDetailsPlan">
                  <span
                    class="tierIcon"
                    v-bind:style="{ background: form.color }"
                    ><span
                      v-bind:class="validURL(form.icon) ? '' : form.icon"
                      v-bind:style="
                        validURL(form.icon)
                          ? {
                              backgroundImage: 'url(' + form.icon + ')',
                            }
                          : ''
                      "
                    ></span
                  ></span>
                  <div>
                    <h3>{{ form.name }}</h3>
                    <small>{{ form.description }}</small>
                  </div>
                </div>
                <div class="borderShadow"></div>
                <div class="amvip--formRow eligibilityInput">
                  <label for="earnPts">Eligibility:</label>
                  <div class="input-group">
                    <span class="input-group-addon">Earn</span>
                    <input
                      readonly
                      type="number"
                      class="form-control"
                      :value="form.goal"
                      id="earnPts"
                      min="0"
                      max="100000"
                    />
                  </div>
                  <small>
                    Points per year
                  </small>
                </div>
              </div>
            </div>
          </div>
          <h3>Tier Benefits</h3>
          <div class="rewardSection">
            <VipRewardCard
              v-bind:rewardData="oneTimeData"
              type="oneTime"
              @addClicked="gotoAddReward"
              @editClicked="editCurrentReward"
              @deleteClicked="confirmDeleteReward"
            ></VipRewardCard>
            <VipRewardCard
              v-bind:rewardData="annualData"
              type="annual"
              @addClicked="gotoAddReward"
              @editClicked="editCurrentReward"
              @deleteClicked="confirmDeleteReward"
            ></VipRewardCard>
          </div>
          <footer class="amvip-actionFooter">
            <button class="amvip--btnSec" @click="clearForm">Cancel</button>
            <button class="amvip--btnPri" @click="updateTier">Save</button>
          </footer>
        </div>
        <IconPopup
          ref="iconPopupEle"
          :showPopup="enableIcon"
          v-on:close-btn-click="hideIconPopup"
        ></IconPopup>
      </section>
    </div>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
    ></ConfirmPopup>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-tier");

.amvip-editTier {
  .amvip-actionFooter {
    padding: 20px;
    max-width: 100%;
  }
  .amvip--colorInfo {
    z-index: 3;
  }
  .amvip--icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .amvip--iconPreview {
      width: 75px;
      min-width: 75px;
      height: 75px;
    }
  }
  #fileUpload {
    position: relative;
    font-size: 50px;
    .custom-icon:not(.popup-icon) {
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      width: 75px;
      height: 75px;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &:hover {
        &::before {
          transition: all;
          transition-duration: 250ms;
          opacity: 1;
        }
      }
      &::before {
        position: absolute;
        z-index: 1;
        opacity: 0;
      }
    }
  }
}
.vc-chrome {
  position: absolute;
  top: 40px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker";
import ConfirmPopup from "./ConfirmPopup";
import Axios from "axios";
import IconPopup from "./IconPopup";
import VipRewardCard from "./../../components/vip-tier/RewardCard";
export default {
  name: "EditTier",
  components: { ColorPicker, ConfirmPopup, IconPopup, VipRewardCard },
  mixins: [validationMixin],
  props: ["currentRewardId"],
  data: () => ({
    form: {
      name: null,
      description: null,
      icon: null,
      color: null,
      goal: null,
    },
    showConfirmPopup: false,
    popupConfig: {},
    rewardData: [],
    oneTimeData: [],
    annualData: [],
    sending: false,
    currentTierId: null,
    tierData: [],
    file: null,
    existingFile: null,
    enableIcon: false,
    tierDefine: "points",
    currentDeleteReward: null,
  }),
  mounted() {
    const url = this.getApiUrl(`Tiers/Setupvip`);
    Axios.get(url).then((res) => {
      if (res.data.error) {
        return false;
      } else {
        this.tierDefine = res.data.data.selection_type;
      }
      this.renderData();
    });
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      icon: {
        required,
      },
      goal: {
        required,
        customMinValue(value) {
          return this.tierData.default === "Y" ? value >= 0 : value >= 25;
        },
      },
    },
  },
  methods: {
    showIconPopup() {
      this.$refs.iconPopupEle.iconConfig = this.form;
      this.enableIcon = true;
    },
    renderData() {
      this.currentTierId = this.$route.params.currentTierId;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.currentTierId);
      Axios.get(url).then(async (res) => {
        if (res.data.error) {
          return false;
        } else {
          this.tierData = res.data.data[0];
          this.icon = res.data.data[0].icon;
          this.updateFormData(res.data.data[0]);
          this.rewardData =
            res.data.data[0]?.rewards?.length > 0
              ? res.data.data[0].rewards
              : [];
          if (this.rewardData.length > 0) {
            this.oneTimeData = this.rewardData.filter((currentData) => {
              return currentData.is_onetime_ongoing == 1;
            });
            this.annualData = this.rewardData.filter((currentData) => {
              return currentData.is_onetime_ongoing == 2;
            });
            if (this.rewardData.settings) {
              this.rewardData.settings = JSON.parse(this.rewardData.settings);
            }
          }
        }
      });
    },
    blobUrl(val) {
      if (!val || !val.constructor || val.constructor !== File) return val;
      return URL.createObjectURL(val);
    },
    hideIconPopup() {
      // this.form.icon = event.iconData.icon;
      this.enableIcon = false;
    },
    selectedFile(file) {
      if (file.length > 0) {
        this.existingFile = file[0];
      }
      this.file = file.length > 0 ? file[0] : this.existingFile;
      const formData = new FormData();
      formData.append("Filedata", file[0]);
      formData.append("suffix", "tier");
      this.existingFileName =
        file.length > 0 ? file[0] : this.existingFile.name;
      if (file.length == 0) {
        return false;
      }
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res.data.error && res.data.error == 1) {
            this.file = this.existingFile ? this.existingFile : null;
            return false;
          } else {
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.form.icon = imageUrl;
          }
        });
    },
    gotoManageTier() {
      this.$router.push("/view/tiers/manage-tier");
    },
    gotoAddReward() {
      this.$router.push(`/view/tiers/add-reward/${this.currentTierId}`);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.description = null;
      this.$router.push("/view/tiers/manage-tier");
    },
    updateTier() {
      if (!this.validate()) {
        return false;
      }
      this.sending = true;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.currentTierId);
      Axios.put(url, this.form).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          if (res.data.data.message != undefined) {
            window.sessionStorage.setItem("dataChanged", true);
          }
          this.$router.push("/view/tiers/manage-tier");
        }
      });
      this.userSaved = true;
      this.sending = false;
    },
    updateFormData(data) {
      this.form.name = data.name;
      this.form.description = data.description;
      this.form.icon = data.icon;
      this.form.color = data.color;
      this.form.goal = data.goal;
      this.$refs.colorPicker.setColor(data.color);
    },
    getFormData() {
      const returnObj = {};
      Object.keys(this.form).forEach((value) => {
        returnObj[value] = this.form[value];
      });
      return returnObj;
    },
    validate() {
      let isValidated = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        isValidated = false;
        this.focusFirstStatus(this.$v.form, this.$refs);
      } else {
        isValidated = true;
      }
      return isValidated;
    },
    goBack() {
      this.$router.push("/view/tiers/manage-tier");
    },
    editCurrentReward(obj) {
      const currentRewardId = obj.data.id_tier_rewards;
      this.currentRewardId = currentRewardId;
      this.$router.replace({
        name: "EditReward",
        params: {
          id_tier: this.currentTierId,
          currentRewardId: currentRewardId,
          origin: "editTier",
        },
      });
    },
    confirmDeleteReward(obj) {
      console.log(obj);
      this.currentDeleteReward = obj.data;
      this.popupConfig = {
        title: "Confirm!",
        content:
          "User received this benefit already still can able to use it. Are you sure you want to delete the Benefits?",
        confirmText: "Yes, Delete it",
        cancelText: "No, Keep it",
        id: "deleteRewardPopup",
        iconClass: "far fa-trash-alt",
      };
      this.showConfirmPopup = true;
    },
    deleteCurrentReward() {
      const currentRewardId = this.currentDeleteReward.id_tier_rewards;
      const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
      Axios.delete(url).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          if (res.data.data.message != undefined) {
            window.sessionStorage.setItem("dataChanged", true);
          }
          this.renderData();
          this.currentDeleteReward = null;
        }
      });
    },
    confirmClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteRewardPopup":
          this.deleteCurrentReward();
          break;
        default:
          break;
      }
    },
    cancelClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteRewardPopup":
          this.currentDeleteReward = null;
          break;
        default:
          break;
      }
    },
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
  },
};
</script>
