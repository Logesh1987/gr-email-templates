<template>
  <div>
    <h2>Reward Setup</h2>
    <div class="displaySetting">
      <div class="pointsMode">
        <div class="setupMode">
          <div class="head">
            <md-checkbox
              v-model="formData.mode_points"
              :true-value="1"
              :false-value="0"
              >Points Mode
              <i class="fas fa-question-circle"
                ><md-tooltip md-direction="right"
                  >Award Points for this action</md-tooltip
                ></i
              ></md-checkbox
            >
          </div>
          <div class="body p-10" v-if="formData.mode_points == 1">
            <h6 class="bLabel">
              Enter # Reward Points *
              <i class="fas fa-question-circle"
                ><md-tooltip md-direction="right"
                  >Enter the # Points you want to reward to users for completing
                  this action</md-tooltip
                ></i
              >
            </h6>
            <md-field :class="{ 'md-invalid': formErrors.worth_entries }">
              <md-input
                v-model="formData.worth_entries"
                type="number"
              ></md-input>
              <span class="md-error" v-if="formErrors.worth_entries">{{
                formErrors.worth_entries
              }}</span>
            </md-field>
          </div>
        </div>
      </div>
      <div class="rewardsMode">
        <div class="setupMode">
          <div class="head disabled">
            <md-checkbox
              v-model="formData.mode_instant"
              :true-value="1"
              :false-value="0"
              >Give an instant reward?
              <i class="fas fa-question-circle"
                ><md-tooltip md-direction="right"
                  >Check this, if you'd like to reveal an instant offer / coupon
                  as soon as users complete this action.</md-tooltip
                ></i
              ></md-checkbox
            >
            <i class="soon">Coming Soon !!</i>
          </div>
          <div
            class="body p-20"
            v-if="formData.mode_instant == 1"
            style="display: none;"
          >
            <div class="radioTabs">
              <md-radio v-model="formData.instant_reward_opt" :value="1"
                >Coupon</md-radio
              >
              <md-radio v-model="formData.instant_reward_opt" :value="3"
                >Redirect to link</md-radio
              >
              <md-radio v-model="formData.instant_reward_opt" :value="0"
                >Image / Text</md-radio
              >
            </div>
            <div>
              <!-- If only Coupon -->
              <div class="coupon" v-if="formData.instant_reward_opt == 1">
                <div class="light radioTabs">
                  <md-radio v-model="formData.reward_type" :value="1"
                    >Automagic</md-radio
                  >
                  <md-radio v-model="formData.reward_type" :value="0"
                    >Common</md-radio
                  >
                </div>
                <div v-if="formData.reward_type == 1">
                  <small
                    class="text-info display-flex align-items-center mt-20"
                  >
                    <span class="material-icons">info</span>
                    <span>
                      We will automatically create coupon codes in your web
                      store.
                    </span>
                  </small>
                  <div>
                    <h6 class="bLabel mt-20">
                      Coupon type
                      <i class="fas fa-question-circle"
                        ><md-tooltip md-direction="right"
                          >Choose from the options provided</md-tooltip
                        ></i
                      >
                    </h6>
                    <div class="cType display-flex flex-direction-column">
                      <md-radio
                        v-model="formData.realtime_coupon_type"
                        :value="1"
                        >Percentage off the order total</md-radio
                      ><md-radio
                        v-model="formData.realtime_coupon_type"
                        :value="2"
                        >Fixed amount off the order total</md-radio
                      ><md-radio
                        v-model="formData.realtime_coupon_type"
                        :value="3"
                        >Free shipping</md-radio
                      >
                    </div>
                  </div>
                  <div v-if="formData.realtime_coupon_type !== 3">
                    <h6 class="bLabel mt-20">
                      Coupon value *
                      <i class="fas fa-question-circle"
                        ><md-tooltip md-direction="right"
                          >Fixed value or percentage amount to take off. Enter
                          value without the currency unit or a percent
                          sign</md-tooltip
                        ></i
                      >
                    </h6>
                    <md-field
                      :class="{
                        'md-invalid': formErrors.realtime_coupon_value,
                      }"
                    >
                      <md-input
                        v-model="formData.realtime_coupon_value"
                      ></md-input
                      ><span
                        class="md-error"
                        v-if="formErrors.realtime_coupon_value"
                        >{{ formErrors.realtime_coupon_value }}</span
                      >
                    </md-field>
                  </div>
                  <div>
                    <h6 class="bLabel mt-20">
                      Minimum spend (optional)
                      <i class="fas fa-question-circle"
                        ><md-tooltip md-direction="right"
                          >The minimum amount a customer must spend to be
                          eligible for this coupon.</md-tooltip
                        ></i
                      >
                    </h6>
                    <md-field>
                      <md-input
                        v-model="formData.realtime_min_order"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <div v-else>
                  <small
                    class="text-info display-flex align-items-center mt-20"
                  >
                    <span class="material-icons">info</span>
                    <span>
                      Note - This common coupon code will immediately appear
                      when users complete this action.
                    </span>
                  </small>
                  <h6 class="bLabel mt-20">
                    Enter coupon *
                    <i class="fas fa-question-circle"
                      ><md-tooltip md-direction="right"
                        >Enter a single coupon code</md-tooltip
                      ></i
                    >
                  </h6>
                  <md-field
                    :class="{ 'md-invalid': formErrors.instant_reward_cpn }"
                  >
                    <md-input v-model="formData.instant_reward_cpn"></md-input
                    ><span
                      class="md-error"
                      v-if="formErrors.instant_reward_cpn"
                      >{{ formErrors.instant_reward_cpn }}</span
                    >
                  </md-field>
                </div>
              </div>
              <!-- If only Coupon -->
              <!-- If only Redirect link -->
              <div v-if="formData.instant_reward_opt == 3">
                <small class="text-info display-flex align-items-center mt-20">
                  <span class="material-icons">info</span>
                  <span>
                    Redirect users to a desired location when they complete this
                    action.
                  </span>
                </small>
                <h6 class="bLabel mt-20">
                  Enter Redirect URL *
                  <i class="fas fa-question-circle"
                    ><md-tooltip md-direction="right"
                      >Enter the URL. Users who complete this action will be
                      redirected to this URL</md-tooltip
                    ></i
                  >
                </h6>
                <md-field
                  :class="{ 'md-invalid': formErrors.instant_reward_lnk }"
                >
                  <md-input v-model="formData.instant_reward_lnk"></md-input
                  ><span
                    class="md-error"
                    v-if="formErrors.instant_reward_lnk"
                    >{{ formErrors.instant_reward_lnk }}</span
                  >
                </md-field>
              </div>
              <!-- If only Redirect link -->
              <!-- If only image/txt -->
              <small
                v-if="formData.instant_reward_opt == 0"
                class="text-info display-flex align-items-center mt-20"
              >
                <span class="material-icons">info</span>
                <span>
                  Note: If neither a coupon or link is suitable, a
                  description/image will be shown. Provide users with a
                  description and/or image detailing your reward
                </span>
              </small>
              <!-- If only image/txt -->
              <h6 class="bLabel mt-20">Instructions of redemption</h6>
              <md-field>
                <md-textarea
                  v-model="formData.instant_reward_text"
                ></md-textarea>
              </md-field>
              <h6 class="bLabel mt-20">
                Instant Reward Image *
                <i class="fas fa-question-circle"
                  ><md-tooltip md-direction="right"
                    >The image which displays your reward will appear
                    immediately when users complete this action. Please make
                    sure your reward is clearly mentioned.</md-tooltip
                  ></i
                >
              </h6>
              <small class="display-flex">
                Recommended width is {{ formData.instant_reward.width }} x
                {{ formData.instant_reward.height }} pixels. (Images must be
                GIF, JPEG, JPG, PNG and maximum of 2MB Limit).
              </small>
              <!-- <ImgUploadPreview :data="{ value: formData.instant_reward }" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ImgUploadPreview from "@/components/ImgUploadPreview.vue";

export default {
  name: "FomoRewardSetup",
  props: ["formData", "updateSecondaryError", "content"],
  // components: { ImgUploadPreview },
  data: function() {
    return {
      formErrors: {},
    };
  },
  watch: {
    formData: {
      deep: true,
      handler: function(val) {
        console.log(val);
        val.mode_points == 1
          ? val.worth_entries && val.worth_entries > 0
            ? delete this.formErrors["worth_entries"]
            : (this.formErrors.worth_entries = "Invalid input")
          : delete this.formErrors["worth_entries"];

        val.reward_type === 0
          ? val.instant_reward_cpn && val.instant_reward_cpn.length > 0
            ? delete this.formErrors["instant_reward_cpn"]
            : (this.formErrors.instant_reward_cpn = "Invalid input")
          : delete this.formErrors["instant_reward_cpn"];

        val.reward_type === 1
          ? val.realtime_coupon_type < 3 &&
            val.realtime_coupon_value &&
            val.realtime_coupon_value > 0
            ? delete this.formErrors["realtime_coupon_value"]
            : (this.formErrors.realtime_coupon_value = "Invalid input")
          : delete this.formErrors["realtime_coupon_value"];

        if (val.instant_reward_opt == 3) {
          val.instant_reward_lnk && val.instant_reward_lnk.length > 0
            ? delete this.formErrors["instant_reward_lnk"]
            : (this.formErrors.instant_reward_lnk = "Invalid input");
        }
        console.log(this.formErrors, "dasd5665");

        Object.keys(this.formErrors).length > 0
          ? this.updateSecondaryError(true)
          : this.updateSecondaryError(false);
      },
    },
  },
};
</script>
<style lang="less" scoped>
@rewardColor: #f8f8f8;
.md-field .md-error {
  left: auto;
  right: 0;
}
.bLabel {
  font-size: 1em;
  font-weight: 600;
  color: #333;
  margin: 0;
}
.text-info {
  padding: 10px;
}
.cType {
  margin-bottom: 30px;
  --md-theme-default-accent: #000;
  .md-radio {
    margin: 10px 0 0;
  }
}
.radioTabs {
  border-left: 1px solid #777;
  font-size: 13px;
  color: #fff;
  max-width: 100%;
  width: 100%;
  clear: both;
  display: flex;
  &:first-child {
    border-left: none;
  }

  .md-radio::v-deep {
    background: #474747;
    font-size: 13px;
    padding: 8px 10px;
    margin: 0;
    flex-grow: 1;
    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      height: 2px;
      opacity: 0;
      transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      content: " ";
      background: #474747;
    }
    .md-radio-label {
      padding-left: 8px;
      font-weight: bold;
      flex-grow: 1;
    }
    &.md-checked {
      background: #fff;
      font-weight: 500;
      font-size: 14px;
      --md-theme-default-accent: #474747;
      &:before {
        opacity: 1;
      }
    }
    &.md-theme-default {
      .md-radio-container {
        border-color: #fff;
      }
      &.md-checked {
        .md-radio-container {
          border-color: #474747;
        }
        .md-radio-label {
          color: #474747;
        }
      }
    }
  }
  &.light {
    border-bottom-width: 0;
    display: flex;
    margin: 5px 0;
    .md-radio {
      flex-grow: 1;
    }
  }
}
.splitDiv {
  width: 48%;
}
.visibleTo {
  display: flex;
  align-items: center;
  h6 {
    width: 40%;
  }
}
span.status-btn {
  padding: 0.2em 1em;
  color: #000;
  border: 1px solid;
  margin: 0 0.5em;
  border-radius: 2em;
  display: inline-flex;
  align-items: center;
  opacity: 0.4;
  cursor: pointer;
  &.active {
    opacity: 1;
  }
}

.setupMode {
  border: 1px solid var(--stroke-grey);
  border-bottom: none;
  margin-bottom: 15px;
  background: #fff;

  @media only screen and (max-width: 599px) {
    margin-bottom: 20px;
  }
  .head {
    padding: 0 20px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid var(--stroke-grey);
    background: #ddd;
    ::v-deep {
      --md-theme-default-background: #333;
      .md-checkbox-container {
        border-color: transparent;
        background: #fff;
      }
    }
    &.disabled {
      .md-checkbox {
        opacity: 0.5;
        pointer-events: none;
      }
      .soon {
        float: right;
        margin: 1.2em 0;
      }
    }
  }

  .body {
    border-bottom: 1px solid var(--stroke-grey);
  }
  .md-field {
    padding-top: 0;
    min-height: 32px;
  }
}
</style>
