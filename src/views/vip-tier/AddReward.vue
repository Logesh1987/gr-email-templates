<template>
  <div class="amvip--wrapper">
    <div class="amvip--container amvip--manageReward">
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
                v-model="form.rewardtype"
                value="coupons"
                id="rewardCoupons"
                name="rewardCoupons"
                @change="rewardTypeChange"
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
                @change="rewardTypeChange"
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
                @change="rewardTypeChange"
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
          <section
            id="coupons"
            class="tabSection"
            v-if="form.rewardtype === 'coupons'"
          >
            <div class="amvip--formRow">
              <label for="coupon_type">Coupon Type:</label>
              <md-radio
                v-model="form.coupon_type"
                value="percentage"
                id="percentage"
                name="coupon_type"
              >
                Percentage
              </md-radio>
              <md-radio
                v-model="form.coupon_type"
                value="fixedAmount"
                id="fixedAmount"
                name="coupon_type"
              >
                Fixed Amount
              </md-radio>
              <md-radio
                v-model="form.coupon_type"
                value="freeShipping"
                id="freeShipping"
                name="coupon_type"
              >
                Free Shipping
              </md-radio>
            </div>
            <div
              class="md-custom-error top-minus-35 txt-center"
              v-if="!$v.form.coupon_type.required && $v.form.coupon_type.$dirty"
            >
              Coupon type is required
            </div>
            <div class="amvip--twolColumnRow">
              <div
                class="amvip--formRow"
                v-if="form.coupon_type !== 'freeShipping'"
              >
                <md-field :class="getValidationClass('couponamount')">
                  <label for="couponamount">
                    Coupon amount
                    <span class="amvip--mandatory">*</span>
                  </label>
                  <md-input
                    name="couponamount"
                    id="couponamount"
                    v-model="form.couponamount"
                    :disabled="sending"
                    type="number"
                  />
                  <span class="md-error" v-if="!$v.form.couponamount.required">
                    Coupon amount is required
                  </span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.couponamount.minValue"
                  >
                    The minimum value shoube greater than or equal to 5
                  </span>
                </md-field>
              </div>
              <div class="amvip--formRow">
                <md-field :class="getValidationClass('minspend')">
                  <label for="minspend">
                    Minimum Spend
                  </label>
                  <md-input
                    name="minspend"
                    id="minspend"
                    v-model="form.minspend"
                    :disabled="sending"
                    type="number"
                  />
                </md-field>
              </div>
            </div>
            <div class="amvip--twolColumnRow">
              <div class="amvip--formRow">
                <md-field :class="getValidationClass('maxspend')">
                  <label for="maxspend">
                    Maximum Spend
                  </label>
                  <md-input
                    name="maxspend"
                    id="maxspend"
                    v-model="form.maxspend"
                    :disabled="sending"
                    type="number"
                  />
                </md-field>
              </div>
            </div>
          </section>
          <section
            id="points"
            class="tabSection"
            v-if="form.rewardtype === 'points'"
          >
            <div class="amvip--formRow">
              <label for="coupon_type">Bonus points Type:</label>
              <md-radio
                v-model="form.coupon_type"
                value="multiple"
                id="multiple"
                name="coupon_type"
              >
                Multiple
              </md-radio>
              <md-radio
                v-model="form.coupon_type"
                value="fixedPoints"
                id="fixedPoints"
                name="coupon_type"
              >
                Fixed bonus points
              </md-radio>
              <md-radio
                v-model="form.coupon_type"
                value="percetageBonus"
                id="percetageBonus"
                name="coupon_type"
              >
                Percentage bonus points
              </md-radio>
            </div>
            <div
              class="md-custom-error top-minus-35 txt-center"
              v-if="!$v.form.coupon_type.required && $v.form.coupon_type.$dirty"
            >
              Bonus point type is required
            </div>
            <div class="amvip--twolColumnRow">
              <div class="amvip--formRow" v-if="form.coupon_type == 'multiple'">
                <md-field :class="getValidationClass('couponamount')">
                  <label for="couponamount">
                    Multiples
                    <span class="amvip--mandatory">*</span>
                  </label>
                  <md-input
                    name="couponamount"
                    id="couponamount"
                    v-model="form.couponamount"
                    :disabled="sending"
                    type="number"
                  />
                  <span class="md-suffix">X</span>
                  <span class="md-helper-text"
                    >E.g. 2X (If the customer would have normally earned 100
                    points as per your points setup, at 2X they earn a total of
                    200 points.)</span
                  >
                  <span class="md-error" v-if="!$v.form.couponamount.required">
                    Multiple is required
                  </span>
                </md-field>
              </div>
              <div
                class="amvip--formRow"
                v-if="form.coupon_type == 'percetageBonus'"
              >
                <md-field :class="getValidationClass('couponamount')">
                  <label for="couponamount">
                    Percentage bonus points
                    <span class="amvip--mandatory">*</span>
                  </label>
                  <md-input
                    name="couponamount"
                    id="couponamount"
                    v-model="form.couponamount"
                    :disabled="sending"
                    type="number"
                  />
                  <span class="md-suffix">%</span>
                  <span class="md-helper-text"
                    >E.g. 10% bonus points (If the customer would have normally
                    earned 100 points, they will now earn 100 points + 10%
                    bonus= 110 points)</span
                  >
                  <span class="md-error" v-if="!$v.form.couponamount.required">
                    Percentage bonus point is required
                  </span>
                </md-field>
              </div>
              <div
                class="amvip--formRow"
                v-if="form.coupon_type == 'fixedPoints'"
              >
                <md-field :class="getValidationClass('couponamount')">
                  <label for="couponamount">
                    Fixed bonus points
                    <span class="amvip--mandatory">*</span>
                  </label>
                  <md-input
                    name="couponamount"
                    id="couponamount"
                    v-model="form.couponamount"
                    :disabled="sending"
                    type="number"
                  />
                  <span class="md-suffix">Pts</span>
                  <span class="md-helper-text"
                    >E.g. 10 bonus points (If the customer would have normally
                    earned 100 points, they will now earn 100 points + 10 bonus
                    points= 110 points)</span
                  >
                  <span class="md-error" v-if="!$v.form.couponamount.required">
                    fixed bonus point is required
                  </span>
                </md-field>
              </div>
              <div class="amvip--formRow">
                <md-field :class="getValidationClass('minspend')">
                  <label for="minspend">
                    Minimum Spend
                  </label>
                  <md-input
                    name="minspend"
                    id="minspend"
                    v-model="form.minspend"
                    :disabled="sending"
                    type="number"
                  />
                </md-field>
              </div>
            </div>
            <div class="amvip--twolColumnRow">
              <div class="amvip--formRow">
                <div class="expiryDate">
                  <md-datepicker
                    md-immediately
                    :class="getValidationClass('expiry')"
                    name="expiry"
                    id="expiry"
                    v-model="form.expiry"
                    :disabled="sending"
                  >
                    <label>Select bonus point expiry date</label>
                  </md-datepicker>
                  <div
                    class="md-custom-error padLeft-35"
                    v-if="!$v.form.expiry.required && $v.form.expiry.$dirty"
                  >
                    Bonus expiry date is required.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="points"
            class="tabSection"
            v-if="form.rewardtype === 'perk_expeience'"
          >
            <div class="amvip--twolColumnRow">
              <div class="amvip--formRow">
                <md-field :class="getValidationClass('email')">
                  <label for="email">
                    Email
                  </label>
                  <md-input
                    name="email"
                    id="email"
                    v-model="form.email"
                    :disabled="sending"
                    type="email"
                  />
                </md-field>
              </div>
            </div>
          </section>
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
// .amvip--container.amvip--manageReward .tabSection {
//   width: 75%;
// }
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
.expiryDate {
  width: 100%;
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
      maxspend: null,
      email: null,
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
      couponamount: {
        required,
      },
      coupon_type: {
        required,
      },
      expiry: {
        required,
      },
    },
  },
  mounted() {
    const tabButtons = document.querySelectorAll(
      ".amvip--manageReward .amvip--tabTitle"
    );
    tabButtons.forEach(element => {
      element.addEventListener("click", event => {
        this.form.type = event.target.getAttribute("data-value");
      });
    });
  },
  methods: {
    rewardTypeChange() {
      this.form.coupon_type = null;
    },
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
      this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
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
