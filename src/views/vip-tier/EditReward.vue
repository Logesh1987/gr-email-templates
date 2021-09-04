<template>
  <div class="amvip--wrapper amvip-manageReward">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="gotoEditTier"></span>
        <h2>Edit reward</h2>
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
                v-model="form.rewardtype"
                value="coupon"
                id="rewardCoupons"
                name="rewardCoupons"
              >
                Coupons
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardtype"
                value="points"
                id="rewardPoints"
                name="rewardPoints"
              >
                Points
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardtype"
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
            v-if="!$v.form.rewardtype.required && $v.form.rewardtype.$dirty"
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
  name: "EditReward",
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
      rewardtype: {
        required,
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
    const currentRewardId = this.$route.params.currentRewardId;
    console.log(this.$route.params);
    const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
    this.loader = true;
    this.sending = true;
    Axios.get(url)
      .then(res => {
        console.log(`Tiers/Rewards/${currentRewardId} ${JSON.stringify(res)}`);
        if (res.data.error) {
          this.responseData = res.data.error.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          return false;
        } else {
          this.responseData = res.data.data.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          this.updateFormData(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
        this.responseData = err;
        this.showSnackbar = true;
      })
      .finally(() => {
        this.loader = false;
        this.sending = false;
      });
  },
  methods: {
    toggleActive(currentElement) {
      const tabButtons = document.querySelectorAll(
        ".amvip-manageReward .amvip--tabTitle"
      );
      tabButtons.forEach(element => {
        element.classList.remove("active");
      });
      currentElement.classList.add("active");
      document.getElementById("type").value = currentElement.getAttribute(
        "data-value"
      );
      this.form.type = currentElement.getAttribute("data-value");
    },
    gotoEditTier() {
      this.$router.push("/view/tiers/edit-tier/" + this.$route.params.id_tier);
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
      this.form.type = null;
      this.form.rewardtype = null;
      this.form.couponamount = null;
      this.form.minspend = null;
      this.form.coupon_type = null;
      this.form.expiry = null;
      this.form.id_tier = null;
      this.form.id_tier_list = null;
      this.gotoEditTier();
    },
    saveRewardData() {
      if (!this.validateData()) {
        return false;
      }
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      const currentRewardId = this.$route.params.currentRewardId;
      const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
      this.loader = true;
      Axios.put(url, returnData)
        .then(res => {
          console.log(
            `Tiers/Rewards/${currentRewardId} ${JSON.stringify(res)}`
          );
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.responseData = res.data.data.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            this.gotoEditTier();
          }
        })
        .catch(err => {
          console.log(err);
          this.responseData = err;
          this.showSnackbar = true;
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
      if (typeof response.settings == "string") {
        response.settings = JSON.parse(response.settings);
      }
      this.form.name = response.name;
      this.form.description = response.description;
      this.form.type = response.is_onetime_ongoing == 1 ? "onetime" : "ongoing";
      this.form.rewardtype = response.settings.rewardtype;
      this.form.couponamount = response.settings.value;
      this.form.minspend = response.settings.minorder;
      this.form.coupon_type = response.settings.coupontype;
      this.form.expiry = response.settings.expiry;
      this.form.id_tier = null;
      this.form.id_tier_list = null;
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
  },
};
</script>
