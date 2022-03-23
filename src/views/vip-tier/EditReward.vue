<template>
  <div class="amvip--wrapper">
    <div class="amvip--editReward">
      <hgroup class="amvip--pageHeader">
        <div class="headerGroup">
          <span class="far fa-arrow-left" @click="goBack"></span>
          <h2>Edit reward</h2>
        </div>
      </hgroup>
      <div class="amvip--container amvip--manageReward">
        <div class="sideBySide">
          <div
            class="amvip--twolColumnRow vertical"
            v-bind:class="form.rewardtype === 'perk_expeience' ? '' : 'left'"
          >
            <div class="amvip--formRow" :class="getValidationClass('name')">
              <label for="name">
                Name
                <span class="amvip--mandatory">*</span>
              </label>
              <input
                name="name"
                id="name"
                ref="name"
                type="text"
                v-model="form.name"
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
              <label for="description">Description</label>
              <md-textarea
                name="description"
                id="description"
                v-model="form.description"
                :disabled="sending"
                placeholder="Description"
                :md-counter="50"
              ></md-textarea>
            </div>
          </div>
          <div class="amvip--tabs amvip--twolColumnRow vertical right">
            <div class="amvip--tabHeader">
              <div
                class="amvip--tabTitle"
                v-bind:class="form.type == 'onetime' ? 'active' : ''"
                data-value="onetime"
                @click="changeType('oneTime')"
              >
                Welcome reward
              </div>
              <div
                class="amvip--tabTitle"
                v-bind:class="form.type == 'ongoing' ? 'active' : ''"
                data-value="ongoing"
                @click="changeType('ongoing')"
              >
                In-Tier Benefits
              </div>
            </div>
            <div class="amvip--tabContent">
              <div class="amvip--rewardRadio amvip--formRow">
                <div class="amvip--customRadio">
                  <md-radio
                    v-model="form.rewardtype"
                    value="coupon"
                    id="rewardCoupons"
                    name="rewardCoupons"
                    ref="rewardtype"
                    v-if="form.type == 'onetime'"
                    @change="rewardTypeChange('coupon')"
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
                    @change="rewardTypeChange('points')"
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
                    @change="rewardTypeChange('perk_expeience')"
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
                      id="percentage"
                      name="coupon_type"
                    >
                      Percentage
                    </md-radio>
                    <md-radio
                      v-model="form.coupon_type"
                      value="fixed"
                      ref="coupon_type"
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
                    :class="getValidationClass('couponamount')"
                    class="amvip--formRow"
                    v-if="form.coupon_type !== 'freeShipping'"
                  >
                    <label for="couponamount">
                      Coupon amount
                      <span class="amvip--mandatory">*</span>
                    </label>
                    <input
                      name="couponamount"
                      ref="couponamount"
                      id="couponamount"
                      v-model="form.couponamount"
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
                  </div>
                  <div
                    class="amvip--formRow"
                    v-if="form.type != 'onetime'"
                    :class="getValidationClass('minspend')"
                  >
                    <label for="minspend">
                      Minimum Spend
                    </label>
                    <input
                      name="minspend"
                      id="minspend"
                      v-model="form.minspend"
                      :disabled="sending"
                      type="number"
                    />
                  </div>
                </div>
                <div class="amvip--twolColumnRow vertical">
                  <div class="amvip--formRow">
                    <label for="realtime_coupon_prefix">
                      Coupon Prefix
                    </label>
                    <div class="inputPrefix">
                      <span class="md-prefix">{{ readOnlyPrefix }}</span>
                      <input
                        name="realtime_coupon_prefix"
                        id="realtime_coupon_prefix"
                        v-model="form.realtime_coupon_prefix"
                        :disabled="sending"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="amvip--formRow">
                    <div class="expiryDate">
                      <md-checkbox
                        v-model="form.set_expiry_date"
                        value="1"
                        @change="setExpiryDate($event)"
                        >Set expiry date</md-checkbox
                      >
                    </div>
                  </div>
                  <div class="amvip--formRow" v-if="form.set_expiry_date == 1">
                    <div class="expiryDate">
                      <label for="coupon_expiry_in">
                        Coupon expires in
                      </label>
                      <div class="inputSuffix">
                        <input
                          name="coupon_expiry_in"
                          id="coupon_expiry_in"
                          v-model="form.expire_in"
                          :disabled="sending"
                          type="number"
                        />
                        <span class="md-suffix">day(s)</span>
                      </div>
                      <span class="md-error" v-if="!$v.form.expire_in.required">
                        Coupon expires in is required
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              <section
                id="points"
                class="tabSection vertical right"
                v-if="form.rewardtype === 'points'"
              >
                <div class="amvip--formRow vertical">
                  <label for="coupon_type" v-if="form.rewardtype != 'points'"
                    >Points Type:</label
                  >
                  <div class="couponType" v-if="form.rewardtype != 'points'">
                    <md-radio
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
                      id="fixed"
                      ref="coupon_type"
                      name="coupon_type"
                      v-if="form.type != 'ongoing'"
                    >
                      Fixed points
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
                    :class="getValidationClass('couponamount')"
                  >
                    <label for="couponamount">
                      Multiples
                      <span class="amvip--mandatory">*</span>
                      <span class="warnMessage" v-bind:class="warnClass"
                        >Not recommended</span
                      >
                    </label>
                    <div class="inputSuffix">
                      <input
                        name="couponamount"
                        id="couponamount"
                        v-model="form.couponamount"
                        ref="couponamount"
                        :disabled="sending"
                        type="number"
                        @keyup="validateCouponAmount"
                      />
                      <span class="md-suffix">X</span>
                    </div>
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
                  </div>
                  <div
                    class="amvip--formRow"
                    :class="getValidationClass('couponamount')"
                    v-if="form.coupon_type == 'percetageBonus'"
                  >
                    <label for="couponamount">
                      Percentage bonus points
                      <span class="amvip--mandatory">*</span>
                    </label>
                    <div class="inputSuffix">
                      <input
                        name="couponamount"
                        ref="couponamount"
                        id="couponamount"
                        v-model="form.couponamount"
                        :disabled="sending"
                        type="number"
                      />
                      <span class="md-suffix">%</span>
                    </div>
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
                  </div>
                  <div
                    class="amvip--formRow"
                    :class="getValidationClass('couponamount')"
                    v-if="form.coupon_type == 'fixed'"
                  >
                    <label for="couponamount">
                      Fixed points
                      <span class="amvip--mandatory">*</span>
                    </label>
                    <div class="inputSuffix">
                      <input
                        name="couponamount"
                        ref="couponamount"
                        id="couponamount"
                        v-model="form.couponamount"
                        :disabled="sending"
                        type="number"
                      />
                      <span class="md-suffix">Pts</span>
                    </div>
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
                  </div>
                  <div
                    class="amvip--formRow"
                    v-if="form.type != 'onetime'"
                    :class="getValidationClass('minspend')"
                  >
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
                  </div>
                </div>
              </section>
            </div>
            <footer class="amvip-actionFooter">
              <button class="amvip--btnSec" @click="clearForm">Cancel</button>
              <button class="amvip--btnPri" @click="saveRewardData">
                Save
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-reward");
.amvip--editTier {
  width: 100%;
  @media (max-width: 599px) {
    width: 100%;
  }
  .amvip--pageHeader {
    justify-content: space-between;
    .headerGroup {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
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
.warnMessage {
  color: var(--md-theme-default-fieldvariant, #ff1744);
  text-indent: 10px;
  display: none;
  &.show {
    display: inline-block;
  }
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, requiredIf } from "vuelidate/lib/validators";
import Axios from "axios";
export default {
  name: "EditReward",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
      type: "onetime",
      rewardtype: "coupon",
      couponamount: null,
      minspend: null,
      coupon_type: null,
      expire_in: null,
      set_expiry_date: 0,
      id_tier: null,
      id_tier_list: null,
      realtime_coupon_prefix: null,
      email: null,
    },
    warnTooltip: false,
    sending: false,
    readOnlyPrefix: "",
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
          return (
            this.form.rewardtype !== "perk_expeience" &&
            this.form.coupon_type !== "freeShipping"
          );
        }),
      },
      coupon_type: {
        required: requiredIf(function() {
          return this.form.rewardtype !== "perk_expeience";
        }),
      },
      expire_in: {
        required: requiredIf(function() {
          return this.form.set_expiry_date == 1;
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
    this.readOnlyPrefix = window.sessionStorage.getItem("couponPrefix");
    const currentRewardId = this.$route.params.currentRewardId;
    const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
    this.sending = true;
    Axios.get(url)
      .then((res) => {
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
      .catch((err) => {
        this.responseData = err;
        this.showSnackbar = true;
      })
      .finally(() => {
        this.sending = false;
      });
  },
  methods: {
    validateCouponAmount() {
      // if (this.form.couponamount == "" || this.form.couponamount <= 2) {
      //   this.warnTooltip = "";
      // } else {
      //   this.warnTooltip = "show";
      // }
      this.warnTooltip =
        this.form.couponamount != "" && this.form.couponamount > 2;
    },
    setExpiryDate(eve) {
      if (eve != 1) {
        this.form.expire_in = null;
      }
    },
    rewardTypeChange(rewardType) {
      if (rewardType == "coupon") {
        this.form.coupon_type = "percent";
      } else if (rewardType == "points") {
        if (this.form.type == "ongoing") {
          this.form.coupon_type = "multiple";
        } else {
          this.form.coupon_type = "fixed";
        }
      } else {
        this.form.coupon_type = null;
      }
    },
    changeType(mainType) {
      if (mainType == "oneTime") {
        this.form.rewardtype = "coupon";
        this.form.coupon_type = "percent";
      } else {
        this.form.rewardtype = "points";
        this.form.coupon_type = "multiple";
      }
    },
    goBack() {
      switch (this.$route.params.origin) {
        case "manageTier":
          this.$router.push("/view/tiers/manage-tier");
          break;
        case "editTier":
          this.$router.push(
            "/view/tiers/edit-tier/" + this.$route.params.id_tier
          );
          break;
        default:
          this.$router.push("/view/tiers/manage-tier");
          break;
      }
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
      this.goBack();
    },
    saveRewardData() {
      if (!this.validateData()) {
        return false;
      }
      this.sending = true;
      this.form.id_tier_list = this.$route.params.id_tier;
      this.form.realtime_coupon_prefix =
        this.readOnlyPrefix + this.form.realtime_coupon_prefix;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      const currentRewardId = this.$route.params.currentRewardId;
      const url = this.getApiUrl("Tiers/Rewards/" + currentRewardId);
      Axios.put(url, returnData)
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
            this.goBack();
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
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
      if (typeof response.settings == "string") {
        response.settings = JSON.parse(response.settings);
      }
      if (this.form.coupon_type == "freeShipping") {
        this.form.couponamount = null;
      }
      this.form.name = response.name;
      this.form.description = response.description;
      this.form.type = response.is_onetime_ongoing == 1 ? "onetime" : "ongoing";
      this.form.rewardtype = response.settings.rewardtype;
      this.form.couponamount = response.settings.realtime_coupon_value;
      this.form.minspend = response.settings.realtime_min_order;
      this.form.coupon_type = response.settings.coupon_type;
      this.form.expiry = new Date(response.settings.date_expiry);
      this.form.email = response.settings.email;
      // this.form.realtime_coupon_prefix = response.settings.realtime_coupon_prefix.replace(
      //   this.readOnlyPrefix,
      //   ""
      // );
      this.form.realtime_coupon_prefix =
        response.realtime_coupon_additional_prefix;
      this.form.set_expiry_date = response.settings.set_expiry_date;
      this.form.expire_in = response.settings.expire_in;
      // const couponPrefix = window.sessionStorage.getItem("couponPrefix");
      // if (response.settings.realtime_coupon_prefix.indexOf(couponPrefix) == 0) {
      //   this.form.realtime_coupon_prefix =
      //     response.settings.realtime_coupon_prefix;
      // } else {
      //   this.form.realtime_coupon_prefix =
      //     couponPrefix + response.settings.realtime_coupon_prefix;
      // }
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
  },
};
</script>
