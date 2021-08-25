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
                Minimum value of point needed would be 3
              </span>
            </md-field>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Tier icon <span class="amvip--mandatory">*</span></label>
            <div class="amvip--icon">
              <span class="amvip--iconPreview">
                <img v-if="file" :src="file | blobUrl" />
              </span>
              <md-field :class="getValidationClass('icon')">
                <label for="icon">Upload</label>
                <md-file
                  accept="image/*"
                  name="icon"
                  id="icon"
                  v-model="form.icon"
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
            @deleteClicked="deleteCurrentReward($event)"
          ></VipRewardCard>
        </div>
      </section>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="updateTier">Save</button>
    </footer>
    <Loader :status="loader"></Loader>
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
import { required, minLength, minValue } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker.vue";
import VipRewardCard from "./../../components/vip-tier/RewardCard.vue";
import Loader from "./../../components/Loader.vue";
import Axios from "axios";
export default {
  name: "EditTier",
  components: { ColorPicker, VipRewardCard, Loader },
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
    rewardData: [],
    sending: false,
    currentTierId: null,
    tierData: [],
    file: null,
  }),
  filters: {
    blobUrl(val) {
      if (!val || !val.constructor || val.constructor !== File) return "";
      return URL.createObjectURL(val);
    },
  },
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
          console.log(value);
          return this.tierData.default === "Y" ? minValue(0) : minValue(25);
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
        .then(res => {
          this.tierData = res.data.data[0];
          this.updateFormData(res.data.data[0]);
          this.rewardData =
            res.data.data[0]?.rewards?.length > 0
              ? res.data.data[0].rewards
              : [];
          this.rewardData = JSON.parse(this.rewardData);
        })
        .catch(err => {
          console.log("error", err);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    selectedFile(file) {
      console.log(file);
      this.file = file[0];
    },
    gotoManageTier() {
      this.$router.push("/view/tiers/manage-tier");
    },
    gotoAddReward() {
      this.$router.push("/view/tiers/add-reward");
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
      console.log("update");
      // const returnData = this.getFormData();
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.currentTierId);
      Axios.put(url, this.form)
        .then(res => res)
        .catch(err => err)
        .finally(() => {
          this.loader = false;
        });
      this.userSaved = true;
      this.sending = false;
      console.log(this.form);

      this.$router.push("/view/tiers/manage-tier");
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
        console.log("error");
      } else {
        isValidated = true;
      }
      return isValidated;
    },
    goBack() {
      this.$router.push("/view/tiers/manage-tier");
    },
    editCurrentReward(obj) {
      console.log(obj);
      const currentRewardId = obj.data.id_tier_rewards;
      this.currentRewardId = currentRewardId;
      this.$router.push("/view/tiers/manage-reward/" + currentRewardId);
    },
    deleteCurrentReward(obj) {
      console.log(obj);
      const currentRewardId = obj.data.id_tier_rewards;
      const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
      this.loader = true;
      Axios.delete(url)
        .then(res => {
          console.log(res);
          this.renderData();
        })
        .catch(err => err)
        .finally(() => {
          this.loader = false;
        });
    },
  },
};
</script>
