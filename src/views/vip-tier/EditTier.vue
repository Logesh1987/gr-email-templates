<template>
  <div class="amvip--wrapper amvip-editTier">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goBack"></span>
        <h2>Edit tier</h2>
      </hgroup>
      <section class="amvip--editTierRow">
        <div class="amvip--editTierContent">
          <div class="amvip--formRow">
            <md-field :class="getValidationClass('name')">
              <label for="name">
                Name
                <span class="amvip--mandatory">*</span>
              </label>
              <md-input
                name="name"
                id="name"
                v-model="form.name"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.name.required">
                name is required
              </span>
              <span class="md-error" v-else-if="!$v.form.name.minLenght">
                Minimum of 3 letters required
              </span>
            </md-field>
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
                v-on:input="e => (form.color = e)"
              ></ColorPicker>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <md-field :class="getValidationClass('goal')">
              <label for="goal">
                Points needed
                <span class="amvip--mandatory">*</span>
              </label>
              <md-input
                name="goal"
                id="goal"
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
            </md-field>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Tier icon <span class="amvip--mandatory">*</span></label>
            <div class="amvip--icon">
              <span
                v-if="form.icon"
                class="amvip--iconPreview"
                v-bind:style="{
                  backgroundImage: 'url(' + form.icon + ')',
                }"
              >
              </span>
              <md-field :class="getValidationClass('icon')">
                <label for="icon">Upload</label>
                <md-file
                  ref="fileUpload"
                  accept="image/*"
                  name="icon"
                  id="icon"
                  :disabled="sending"
                  @md-change="selectedFile"
                />
                <span class="md-error" v-if="!$v.form.icon.required">
                  Tier icon is required
                </span>
              </md-field>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Rewards</label>
            <div class="amvip--btnCommon" @click="gotoAddReward">
              <span class="icon-plus"></span>
              <span>Add reward</span>
            </div>
          </div>
        </div>
        <div class="amvip--rewardsCol" v-if="rewardData.length > 0">
          <h3>Added rewards</h3>
          <VipRewardCard
            :rewardData="rewardItem"
            v-for="rewardItem of rewardData"
            :key="rewardItem.index"
            @editClicked="editCurrentReward($event)"
            @deleteClicked="confirmDeleteReward($event)"
          ></VipRewardCard>
        </div>
      </section>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="updateTier">Save</button>
    </footer>
    <Loader :status="loader"></Loader>
    <md-snackbar
      :md-position="'center'"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ responseData }}</span>
    </md-snackbar>
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
  .amvip--colorInfo {
    z-index: 2;
  }
  .amvip--icon {
    display: flex;
    .amvip--iconPreview {
      min-width: 60px;
      max-width: 60px;
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
import VipRewardCard from "./../../components/vip-tier/RewardCard";
import Loader from "./../../components/Loader";
import ConfirmPopup from "./ConfirmPopup";
import Axios from "axios";
export default {
  name: "EditTier",
  components: { ColorPicker, VipRewardCard, Loader, ConfirmPopup },
  mixins: [validationMixin],
  props: ["currentRewardId"],
  data: () => ({
    loader: false,
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
    sending: false,
    currentTierId: null,
    tierData: [],
    file: null,
    existingFile: null,
    responseData: "",
    showSnackbar: false,
  }),
  mounted() {
    this.renderData();
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
    renderData() {
      this.loader = true;
      this.currentTierId = this.$route.params.currentTierId;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.currentTierId);
      Axios.get(url)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then(async res => {
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
            this.tierData = res.data.data[0];
            this.icon = res.data.data[0].icon;
            if (this.icon.length > 0) {
              try {
                const blobData = await fetch(this.icon)
                  .then(blobRes => blobRes.blob)
                  .catch(blobErr => {
                    this.responseData = blobErr;
                    this.showSnackbar = true;
                  });
                this.existingFile = new File([blobData], res.data.data[0].name);
                this.$refs.fileUpload.value = res.data.data[0].name;
              } catch (error) {
                this.responseData = error;
                this.showSnackbar = true;
              }
            }
            this.updateFormData(res.data.data[0]);
            this.rewardData =
              res.data.data[0]?.rewards?.length > 0
                ? res.data.data[0].rewards
                : [];
            if (this.rewardData.length > 0 && this.rewardData.settings) {
              this.rewardData.settings = JSON.parse(this.rewardData.settings);
            }
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    blobUrl(val) {
      if (!val || !val.constructor || val.constructor !== File) return val;
      return URL.createObjectURL(val);
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
      this.loader = true;
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then(res => {
          if (res.data.error && res.data.error == 1) {
            this.file = this.existingFile ? this.existingFile : null;
            this.responseData = res.data.msg;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.message != undefined) {
              this.responseData = res.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.form.icon = imageUrl;
          }
        })
        .finally(() => {
          this.loader = false;
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
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.currentTierId);
      Axios.put(url, this.form)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
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
            this.$router.push("/view/tiers/manage-tier");
          }
        })
        .finally(() => {
          this.loader = false;
        });
      this.userSaved = true;
      this.sending = false;
      // this.$router.push("/view/tiers/manage-tier");
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
      Object.keys(this.form).forEach(value => {
        returnObj[value] = this.form[value];
      });
      return returnObj;
    },
    validate() {
      let isValidated = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        isValidated = false;
        this.responseData = "Validation Errors!!!";
        this.showSnackbar = true;
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
        },
      });
    },
    confirmDeleteReward(obj) {
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you sure, you want to delete the reward?",
        confirmText: "OK",
        cancelText: "Cancel",
        id: "deleteRewardPopup",
        params: obj,
      };
      this.showConfirmPopup = true;
    },
    deleteCurrentReward(obj) {
      const currentRewardId = obj.data.id_tier_rewards;
      const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
      this.loader = true;
      Axios.delete(url)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
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
            this.renderData();
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    confirmClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "deleteRewardPopup":
          this.deleteCurrentReward(eve.params);
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
  },
};
</script>
