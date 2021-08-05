<template>
  <div class="amvip--wrapper amvip-manageReward">
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <span class="icon-next-arrow" @click="goBack"></span>
        <h2>Edit Rewards</h2>
      </hgroup>
      <div class="amvip--tabs">
        <div class="amvip--tabHeader">
          <div class="amvip--tabTitle active" data-index="0">
            One Time Reward
          </div>
          <div class="amvip--tabTitle" data-index="1">On Going Reward</div>
        </div>
        <div class="amvip--tabContent">
          <div class="amvip--rewardRadio">
            <div class="amvip--customRadio">
              <!-- <input type="radio" name="oneTimeReward" id="rewardCoupons" />
              <label for="rewardCoupons"><span>Coupons</span></label> -->
              <md-radio
                v-model="form.rewardType"
                value="coupons"
                id="rewardCoupons"
                name="rewardCoupons"
              >
                Coupons
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <!-- <input type="radio" name="oneTimeReward" id="rewardPoints" />
              <label for="rewardPoints"><span>Points</span></label> -->
              <md-radio
                v-model="form.rewardType"
                value="points"
                id="rewardPoints"
                name="rewardPoints"
              >
                Points
              </md-radio>
            </div>
            <div class="amvip--customRadio">
              <!-- <input type="radio" name="oneTimeReward" id="rewardExperience" />
              <label for="rewardExperience"
                ><span>Perks & Experience</span></label
              > -->
              <md-radio
                v-model="form.rewardType"
                value="perk&expeience"
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
            Reward Type is required
          </div>
          <div class="amvip--twolColumnRow">
            <div class="amvip--formRow">
              <!-- <label>Title<span class="amvip--mandatory">*</span></label>
              <input type="text" class="amvip--textbox textBoxMedium" /> -->
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
                  Label is required
                </span>
                <span class="md-error" v-else-if="!$v.form.title.minLength">
                  Minimum of 3 letters required
                </span>
              </md-field>
            </div>
            <div class="amvip--formRow">
              <!-- <label>Description</label>
              <input type="text" class="amvip--textbox textBoxLarge" /> -->
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
              <!-- <label>Award a Coupon</label>
              <select name="" id="">
                <option value="Percentage Off">Percentage Off</option>
                <option value="Percentage Off">Percentage Off</option>
              </select> -->
              <md-field>
                <label for="coupon">Award a Coupon</label>
                <md-select
                  name="coupon"
                  id="coupon"
                  v-model="form.coupon"
                  :disabled="sending"
                >
                  <md-option value="0">Percentage Off</md-option>
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
export default {
  name: "EditReward",
  mixins: [validationMixin],
  components: {},
  data: () => ({
    form: {
      rewardType: null,
      title: null,
      description: null,
      coupon: "0",
    },
    sending: false,
  }),
  validations: {
    form: {
      rewardType: {
        required,
      },
      title: {
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
        this.toggleActive(event.target);
      });
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
      this.form.rewardType = null;
      this.form.title = null;
      this.form.description = null;
      this.form.coupon = null;
    },
    saveRewardData() {
      if (!this.validateData()) {
        return false;
      }
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      console.log(returnData);
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
