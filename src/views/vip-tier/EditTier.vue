<template>
  <div class="amvip--wrapper amvip-editTier">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goBack"></span>
        <h2>Edit Tier</h2>
      </hgroup>
      <section class="amvip--editTierRow">
        <div class="amvip--editTierContent">
          <div class="amvip--formRow">
            <md-field :class="getValidationClass('title')">
              <label for="title">
                Title
                <span class="amvip--mandatory">*</span>
              </label>
              <md-input
                name="title"
                id="title"
                v-model="form.title"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.title.required">
                Title is required
              </span>
              <span class="md-error" v-else-if="!$v.form.title.minLenght">
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
            <label for="colorValue">Background Color</label>
            <div class="amvip--colorInfo">
              <ColorPicker
                id="colorValue"
                name="colorValue"
                :color="form.colorValue"
                v-model="form.colorValue"
                v-on:input="e => (form.colorValue = e)"
              ></ColorPicker>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <md-field :class="getValidationClass('pointsNeeded')">
              <label for="pointsNeeded">
                Points Needed
                <span class="amvip--mandatory">*</span>
              </label>
              <md-input
                name="pointsNeeded"
                id="pointsNeeded"
                type="number"
                v-model="form.pointsNeeded"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.pointsNeeded.required">
                Points Needed field is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.form.pointsNeeded.minLenght"
              >
                Minimum value of point needed would be 3
              </span>
            </md-field>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Tier Icon</label>
            <div class="amvip--tierIcon">
              <span class="amvip--iconPreview"
                ><img src="images/tier-icon.png" alt=""
              /></span>
              <span class="icon-amedit"></span>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Rewards</label>
            <div class="amvip--btnCommon" @click="gotoManageReward">
              <span class="icon-plus"></span>
              <span>Add Reward</span>
            </div>
          </div>
        </div>
        <div class="amvip--rewardsCol">
          <h3>Added Rewards</h3>
          <VipRewardCard
            :rewardData="rewardItem"
            v-for="rewardItem of rewardData"
            :key="rewardItem.index"
          ></VipRewardCard>
        </div>
      </section>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="updateTier">Save</button>
    </footer>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-tier");
.amvip-editTier {
  .amvip--colorInfo {
    z-index: 2;
  }
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker.vue";
import VipRewardCard, {
  RewardType,
} from "./../../components/vip-tier/RewardCard.vue";
export default {
  name: "EditTier",
  components: { ColorPicker, VipRewardCard },
  mixins: [validationMixin],
  data: () => ({
    form: {
      title: null,
      description: null,
      tierIcon: null,
      colorValue: null,
      pointsNeeded: null,
    },
    rewardData: [
      {
        imgurl: "tier-icon.png",
        value: "10% Coupon",
        rewardType: RewardType.OnGoing,
      },
      {
        imgurl: "tier-icon.png",
        value: "20% Coupon",
        rewardType: RewardType.OnGoing,
      },
      {
        imgurl: "tier-icon.png",
        value:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, facere?",
        rewardType: RewardType.OneTime,
      },
      {
        imgurl: "tier-icon.png",
        value: "Test Value",
        rewardType: RewardType.OnGoing,
      },
    ],
    sending: false,
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
      },
      tierIcon: {
        required,
      },
      pointsNeeded: {
        required,
        minValue: minValue(3),
      },
    },
  },
  methods: {
    gotoManageTier() {
      this.$router.push("manage-tier");
    },
    gotoManageReward() {
      this.$router.push("manage-reward");
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
      this.form.title = null;
      this.form.description = null;
    },
    updateTier() {
      if (!this.validate()) {
        return false;
      }
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      console.log(returnData);
      this.$router.push("manage-tier");
      // Axios.post(
      //   "https://run.mocky.io/v3/a5c07983-6b99-4c29-99e6-c2a2b0b90c45",
      //   returnData
      // ).then(response => {
      //   console.log("response from server", response);
      // });
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
      history.back();
    },
  },
};
</script>
