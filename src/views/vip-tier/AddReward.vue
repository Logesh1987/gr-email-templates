<template>
  <div class="amvip--wrapper">
    <div class="amvip--addTier">
      <hgroup class="amvip--pageHeader">
        <div class="headerGroup">
          <span class="far fa-arrow-left" @click="goBack"></span>
          <h2>Add reward</h2>
        </div>
      </hgroup>
      <div class="amvip--container amvip--manageReward">
        <div class="amvip--tabs">
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
            <div class="amvip--rewardRadio">
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
            <div class="sideBySide">
              <div
                class="amvip--twolColumnRow vertical"
                v-bind:class="
                  form.rewardtype === 'perk_expeience' ? '' : 'left'
                "
              >
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
                    </md-field>
                  </div>
                  <div class="amvip--formRow" v-if="form.type != 'onetime'">
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
                    <md-field>
                      <label for="realtime_coupon_prefix">
                        Coupon Prefix
                      </label>
                      <label class="md-prefix">{{ readOnlyPrefix }}</label>
                      <md-input
                        name="realtime_coupon_prefix"
                        id="realtime_coupon_prefix"
                        v-model="form.realtime_coupon_prefix"
                        :disabled="sending"
                        type="text"
                      />
                    </md-field>
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
                      <md-field>
                        <label for="coupon_expiry_in">
                          Coupon expires in
                        </label>
                        <md-input
                          name="coupon_expiry_in"
                          id="coupon_expiry_in"
                          v-model="form.expire_in"
                          :disabled="sending"
                          type="number"
                        />
                        <span class="md-suffix">day(s)</span>
                      </md-field>
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
                  >
                    <md-field :class="getValidationClass('couponamount')">
                      <label for="couponamount">
                        Multiples
                        <span class="amvip--mandatory">*</span>
                        <span class="warnMessage" v-bind:class="warnClass"
                          >Not recommended</span
                        >
                      </label>
                      <md-input
                        name="couponamount"
                        id="couponamount"
                        v-model="form.couponamount"
                        ref="couponamount"
                        :disabled="sending"
                        type="number"
                        @keyup="validateCouponAmount"
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
                    v-if="form.coupon_type == 'percetageBonus'"
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
                        normally earned 100 points, they will now earn 100
                        points + 10% bonus= 110 points)</span
                      >
                      <span
                        class="md-error"
                        v-if="!$v.form.couponamount.required"
                      >
                        Percentage bonus point is required
                      </span>
                    </md-field>
                  </div>
                  <div
                    class="amvip--formRow"
                    v-if="form.coupon_type == 'fixed'"
                  >
                    <md-field :class="getValidationClass('couponamount')">
                      <label for="couponamount">
                        Fixed points
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
                        >E.g. 10 bonus points (If the customer would have
                        normally earned 100 points, they will now earn 100
                        points + 10 bonus points= 110 points)</span
                      >
                      <span
                        class="md-error"
                        v-if="!$v.form.couponamount.required"
                      >
                        fixed bonus point is required
                      </span>
                    </md-field>
                  </div>
                  <div class="amvip--formRow" v-if="form.type != 'onetime'">
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
@import url("./../../assets/vip-tier/less/_edit-reward");
.amvip--addTier {
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
import ConfirmPopup from "./ConfirmPopup";
export default {
  name: "AddReward",
  mixins: [validationMixin],
  components: { ConfirmPopup },
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
    warnClass: "",
    sending: false,
    readOnlyPrefix: "",
    showConfirmPopup: false,
    popupConfig: {},
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
  },
  methods: {
    addRewardPopup() {
      this.popupConfig = {
        title: "Successfully created!",
        content: "Click add more to create more benefits for this tier.",
        confirmText: "Add More",
        cancelText: "View Tier",
        id: "addRewardPopup",
        iconClass: "fal fa-check-circle",
      };
      this.showConfirmPopup = true;
    },
    confirmClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "addRewardPopup":
          this.$v.$reset();
          break;
        default:
          break;
      }
    },
    cancelClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "addRewardPopup":
          this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
          break;
        default:
          break;
      }
    },
    validateCouponAmount() {
      if (this.form.couponamount == "" || this.form.couponamount <= 2) {
        this.warnClass = "";
      } else {
        this.warnClass = "show";
      }
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
      // this.$router.push("/view/tiers/edit-tier/" + this.currentTierId);
      this.goBack();
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
      this.form.realtime_coupon_prefix =
        this.readOnlyPrefix + this.form.realtime_coupon_prefix;
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
            // this.goBack();
            this.addRewardPopup();
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
