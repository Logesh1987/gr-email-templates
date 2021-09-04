<template>
  <div class="amvip--wrapper amvip-manageReward">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goBack"></span>
        <h2>Add reward</h2>
      </hgroup>
      <div class="amvip--tabs">
        <div class="amvip--tabHeader">
          <div
            class="amvip--tabTitle"
            v-bind:class="form.type == 'onetime' ? 'active' : ''"
            data-value="onetime"
          >
            One time reward
          </div>
          <div
            class="amvip--tabTitle"
            v-bind:class="form.type == 'ongoing' ? 'active' : ''"
            data-value="ongoing"
          >
            On going reward
          </div>
        </div>
        <div class="amvip--tabContent">
          <div class="amvip--rewardRadio">
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardType"
                value="coupon"
                id="rewardCoupons"
                name="rewardCoupons"
              >
                Coupons
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardType"
                value="point"
                id="rewardPoints"
                name="rewardPoints"
              >
                Points
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardType"
                value="perk_expeience"
                id="rewardExperience"
                name="rewardExperience"
              >
                Perks & Experience
              </md-radio>
            </div>
          </div>
          <div
            class="md-custom-error top-minus-35 txt-center"
            v-if="!$v.form.rewardType.required && $v.form.rewardType.$dirty"
          >
            Reward type is required
          </div>
          <div class="amvip--twolColumnRow">
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
                  Name is required
                </span>
                <span class="md-error" v-else-if="!$v.form.name.minLength">
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
          </div>
          <div class="amvip--twolColumnRow">
            <div class="amvip--formRow">
              <md-field>
                <label for="coupon">Award a coupon</label>
                <md-select
                  name="coupon"
                  id="coupon"
                  v-model="form.coupon"
                  :disabled="sending"
                >
                  <md-option value="0">Percentage off</md-option>
                  <md-option value="1">points1</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="saveRewardData">Save</button>
    </footer>
    <Loader :status="loader"></Loader>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-reward");
.md-custom-error {
  color: var(--md-theme-default-fieldvariant, #ff1744);
  font-size: 12px;
  &.top-minus-35 {
    top: -35px;
    position: relative;
  }
  &.txt-center {
    text-align: center;
  }
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import Loader from "./../../components/Loader";
import Axios from "axios";
export default {
  name: "AddReward",
  mixins: [validationMixin],
  components: { Loader },
  data: () => ({
    form: {
      name: null,
      description: null,
      type: "ongoing",
      rewardtype: null,
      couponamount: null,
      minspend: null,
      coupon_type: null,
      expiry: null,
      id_tier: null,
      id_tier_list: null,
    },
    sending: false,
    loader: false,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
    },
  },
  mounted() {
    const tabButtons = document.querySelectorAll(
      ".amvip-manageReward .amvip--tabTitle"
    );
    tabButtons.forEach(element => {
      element.addEventListener("click", event => {
        this.form.type = event.target.getAttribute("data-value");
      });
    });
  },
  methods: {
    gotoManageTier() {
      this.$router.push("/view/tiers/edit-tier");
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
      this.form.rewardType = null;
      this.form.name = null;
      this.form.description = null;
      this.form.coupon = null;
      history.back();
    },
    saveRewardData() {
      if (!this.validateData()) {
        return false;
      }
      this.currentTierId = this.$route.params.currentTierId;
      this.form.id_tier_list = this.currentTierId;
      const url = this.getApiUrl("Tiers/Rewards/" + this.currentTierId);
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      this.loader = true;
      Axios.post(url, returnData)
        .catch(err => {
          console.log(err);
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then(res => {
          console.log("Tiers/Rewards/", JSON.stringify(res));
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.responseData = res.data.data.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getFormData() {
      const returnObj = {};
      Object.keys(this.form).forEach(value => {
        returnObj[value] = this.form[value];
      });
      return returnObj;
    },
    updateFormData(response) {
      Object.keys(this.form).forEach(value => {
        if (response[value]) {
          this.form[value] = response[value];
        }
      });
    },
    validateData() {
      this.$v.$touch();
      let isValidated = false;
      if (this.$v.$invalid) {
        isValidated = false;
        console.log("error");
      } else {
        // this.saveUser();
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
