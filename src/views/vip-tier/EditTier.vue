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
        <div class="amvip--rewardsCol" v-if="rewardData.length > 0">
          <h3>Added Rewards</h3>
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
  data: () => ({
    loader: false,
    form: {
      title: null,
      description: null,
      tierIcon: null,
      colorValue: null,
      pointsNeeded: null,
    },
    rewardData: [],
    sending: false,
    currentRewardId: "",
  }),
  mounted() {
    this.loader = true;
    const currentTierId = this.$route.params.currentTierId;
    Axios.get(
      "https://vip-tier.free.beeceptor.com/Tiers/Managetier/" + currentTierId
    )
      .then(res => {
        console.log(res.data);
        this.updateFormData(res.data);
        this.rewardData = res.data.rewards;
      })
      .catch(err => {
        console.log("error", err);
      })
      .finally(() => {
        this.loader = false;
      });
  },
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
      this.$router.push("/view/tiers/manage-tier");
    },
    gotoManageReward() {
      this.$router.push("/view/tiers/manage-reward");
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
      this.$router.push("/view/tiers/manage-tier");
      // Axios.post(
      //   "https://run.mocky.io/v3/a5c07983-6b99-4c29-99e6-c2a2b0b90c45",
      //   returnData
      // ).then(response => {
      //   console.log("response from server", response);
      // });
    },
    updateFormData(data) {
      this.form.title = data.name;
      this.form.description = data.description;
      this.form.tierIcon = data.icon;
      this.form.colorValue = data.color;
      this.form.pointsNeeded = data.goal;
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
    editCurrentReward(obj) {
      console.log(obj);
      const currentRewardId = obj.data.id_tier_rewards;
      this.currentRewardId = currentRewardId;
      this.$router.push("/view/tiers/manage-reward/" + currentRewardId);
    },
    deleteCurrentReward(data) {
      console.log(data);
    },
  },
};
</script>
