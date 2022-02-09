<template>
  <div class="amvip--wrapper">
    <div class="amvip--container amvip--manageReward">
      <hgroup class="amvip--pageHeader">
        <span class="far fa-arrow-left" @click="goBack"></span>
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
                value="coupon"
                id="rewardCoupons"
                name="rewardCoupons"
                ref="rewardtype"
                @change="rewardTypeChange"
              >
                Coupons
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.rewardtype"
                value="points"
                ref="rewardtype"
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
                ref="rewardtype"
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
          <div class="sideBySide">
            <div class="amvip--twolColumnRow vertical left">
              <div class="amvip--formRow">
                <md-field :class="getValidationClass('name')">
                  <label for="name">
                    Name
                    <span class="amvip--mandatory">*</span>
                  </label>
                  <md-input
                    name="name"
                    id="name"
                    ref="name"
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
              class="tabSection vertical right"
              v-if="form.rewardtype === 'coupon'"
            >
              <div class="amvip--formRow vertical">
                <label for="coupon_type">Coupon Type:</label>
                <div class="couponTypeRadio">
                  <md-radio
                    v-model="form.coupon_type"
                    value="percent"
                    ref="coupon_type"
                    id="percent"
                    name="coupon_type"
                  >
                    Percentage
                  </md-radio>
                  <md-radio
                    v-model="form.coupon_type"
                    ref="coupon_type"
                    value="fixed"
                    id="fixed"
                    name="coupon_type"
                  >
                    Fixed Amount
                  </md-radio>
                  <md-radio
                    v-model="form.coupon_type"
                    ref="coupon_type"
                    value="freeShipping"
                    id="freeShipping"
                    name="coupon_type"
                  >
                    Free Shipping
                  </md-radio>
                </div>
              </div>
              <div
                class="md-custom-error top-minus-35 txt-center"
                v-if="
                  !$v.form.coupon_type.required && $v.form.coupon_type.$dirty
                "
              >
                Coupon type is required
              </div>
              <div class="amvip--twolColumnRow vertical">
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
                      ref="couponamount"
                      :disabled="sending"
                      type="number"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.couponamount.required"
                    >
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
              <div class="amvip--twolColumnRow vertical">
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
              class="tabSection vertical right"
              v-if="form.rewardtype === 'points'"
            >
              <div class="amvip--formRow vertical">
                <label for="coupon_type">Bonus points Type:</label>
                <div class="couponType">
                  <md-radio
                    v-if="form.type == 'ongoing'"
                    v-model="form.coupon_type"
                    value="multiple"
                    id="multiple"
                    ref="coupon_type"
                    name="coupon_type"
                  >
                    Multiple
                  </md-radio>
                  <md-radio
                    v-model="form.coupon_type"
                    value="fixed"
                    id="fixedPoints"
                    ref="coupon_type"
                    name="coupon_type"
                  >
                    Fixed bonus points
                  </md-radio>
                  <md-radio
                    v-model="form.coupon_type"
                    value="percent"
                    id="percetageBonus"
                    ref="coupon_type"
                    name="coupon_type"
                  >
                    Percentage bonus points
                  </md-radio>
                </div>
              </div>
              <div
                class="md-custom-error top-minus-35 txt-center"
                v-if="
                  !$v.form.coupon_type.required && $v.form.coupon_type.$dirty
                "
              >
                Bonus point type is required
              </div>
              <div class="amvip--twolColumnRow vertical">
                <div
                  class="amvip--formRow"
                  v-if="form.coupon_type == 'multiple'"
                >
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
                      ref="couponamount"
                      type="number"
                    />
                    <span class="md-suffix">X</span>
                    <span class="md-helper-text"
                      >E.g. 2X (If the customer would have normally earned 100
                      points as per your points setup, at 2X they earn a total
                      of 200 points.)</span
                    >
                    <span
                      class="md-error"
                      v-if="!$v.form.couponamount.required"
                    >
                      Multiple is required
                    </span>
                  </md-field>
                </div>
                <div
                  class="amvip--formRow"
                  v-if="form.coupon_type == 'percent'"
                >
                  <md-field :class="getValidationClass('couponamount')">
                    <label for="couponamount">
                      Percentage bonus points
                      <span class="amvip--mandatory">*</span>
                    </label>
                    <md-input
                      name="couponamount"
                      ref="couponamount"
                      id="couponamount"
                      v-model="form.couponamount"
                      :disabled="sending"
                      type="number"
                    />
                    <span class="md-suffix">%</span>
                    <span class="md-helper-text"
                      >E.g. 10% bonus points (If the customer would have
                      normally earned 100 points, they will now earn 100 points
                      + 10% bonus= 110 points)</span
                    >
                    <span
                      class="md-error"
                      v-if="!$v.form.couponamount.required"
                    >
                      Percentage bonus point is required
                    </span>
                  </md-field>
                </div>
                <div class="amvip--formRow" v-if="form.coupon_type == 'fixed'">
                  <md-field :class="getValidationClass('couponamount')">
                    <label for="couponamount">
                      Fixed bonus points
                      <span class="amvip--mandatory">*</span>
                    </label>
                    <md-input
                      name="couponamount"
                      ref="couponamount"
                      id="couponamount"
                      v-model="form.couponamount"
                      :disabled="sending"
                      type="number"
                    />
                    <span class="md-suffix">Pts</span>
                    <span class="md-helper-text"
                      >E.g. 10 bonus points (If the customer would have normally
                      earned 100 points, they will now earn 100 points + 10
                      bonus points= 110 points)</span
                    >
                    <span
                      class="md-error"
                      v-if="!$v.form.couponamount.required"
                    >
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
              <div class="amvip--twolColumnRow vertical">
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
                  </div>
                </div>
              </div>
            </section>
            <section
              id="points"
              class="tabSection vertical right"
              v-if="form.rewardtype === 'perk_expeience'"
            >
              <div class="amvip--twolColumnRow vertical">
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
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="saveRewardData">Save</button>
    </footer>
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
.expiryDate {
  width: 100%;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, requiredIf } from "vuelidate/lib/validators";
import Axios from "axios";
export default {
  name: "AddReward",
  mixins: [validationMixin],
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
        required: requiredIf(function() {
          return this.form.rewardtype !== "perk_expeience";
        }),
      },
      coupon_type: {
        required: requiredIf(function() {
          return this.form.rewardtype !== "perk_expeience";
        }),
      },
    },
  },
  mounted() {
    const tabButtons = document.querySelectorAll(
      ".amvip--manageReward .amvip--tabTitle"
    );
    tabButtons.forEach((element) => {
      element.addEventListener("click", (event) => {
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
      if (this.form.coupon_type == "freeShipping") {
        this.form.couponamount = null;
      }
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      Axios.post(url, returnData)
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then((res) => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.responseData = res.data.data.message;
            window.sessionStorage.setItem("dataChanged", true);
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
          }
        });
    },
    getFormData() {
      const returnObj = {};
      Object.keys(this.form).forEach((value) => {
        returnObj[value] = this.form[value];
      });
      return returnObj;
    },
    updateFormData(response) {
      Object.keys(this.form).forEach((value) => {
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
        this.focusFirstStatus(this.$v.form, this.$refs);
        this.responseData = "Validation Errors!!!";
        this.showSnackbar = true;
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
