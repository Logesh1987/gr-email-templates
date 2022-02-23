<template>
  <div class="amvip--landingGrey">
    <div class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <aside class="amvip--landingBrand">
      <div>
        <span class="icon-vip-crown"></span>
        <h2>VIP</h2>
        <h3>Tiers</h3>
        <small>Beta</small>
      </div>
    </aside>
    <section class="amvip-twoColContent" id="setupProgram">
      <section>
        <h2>Setup VIP tier program</h2>
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
              ref="name"
            />
            <span class="md-error" v-if="!$v.form.name.required">
              Name is required
            </span>
            <span class="md-error" v-else-if="!$v.form.name.minLenght">
              Minimum of 3 letters required
            </span>
          </md-field>
          <md-switch v-model="form.tier_name_display" class="tierNameDisplay"
            >Display</md-switch
          >
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
        <div class="amvip--formRow">
          <div class="amvip--dateRow">
            <div class="dateWrapper">
              <md-datepicker
                md-immediately
                :class="getValidationClass('date_start')"
                :md-disabled-dates="disabledDates"
                name="date_start"
                id="date_start"
                v-model="form.date_start"
                :disabled="sending"
                ref="date_start"
              >
                <label>Select date to begin the program</label>
              </md-datepicker>
              <span class="far fa-info-circle" v-popover:foo.top.left></span>
              <popover name="foo" width="300" event="hover">
                As per our record, you installed the Gratisfaction on
                {{ installedDate | formatDate }}
              </popover>
            </div>
            <small style="opacity:0.8;">
              As per our record, you installed the Gratisfaction on
              {{ installedDate | formatDate }}
            </small>
            <span
              class="md-custom-error padLeft-35"
              v-if="!$v.form.date_start.required && $v.form.date_start.$dirty"
            >
              Date to beign the program is required.
            </span>
            <span
              class="md-custom-error padLeft-35"
              v-else-if="
                !$v.form.date_start.installed_date_validator &&
                  $v.form.date_start.$dirty
              "
            >
              Program Date cannot be older than program installed date ({{
                installedDate | formatDate
              }})
            </span>
            <span
              class="md-custom-error padLeft-35"
              v-else-if="
                !$v.form.date_start.post_date_validator &&
                  $v.form.date_start.$dirty
              "
            >
              Program Date cannot be future Date
            </span>
          </div>
        </div>
        <div class="amvip--radioRow">
          <div class="formLabel">What should define your tiers</div>
          <div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.selection_type"
                value="points"
                id="points"
                ref="selection_type"
                name="selection_type"
              >
                Points
              </md-radio>
              <small>
                All points (Purchase and Non Purchase ) will be considered
              </small>
              <md-radio
                v-model="form.selection_type"
                value="value_of_purchase"
                id="purchase"
                name="selection_type"
                ref="selection_type"
              >
                Purchase value
              </md-radio>
              <small>
                Only purchase entries will be considered
              </small>
            </div>
            <span
              class="md-custom-error top-minus-20"
              v-if="
                !$v.form.selection_type.required &&
                  $v.form.selection_type.$dirty
              "
            >
              Tier type is required
            </span>
          </div>
        </div>
        <div class="amvip--radioRow btmBorder">
          <div class="formLabel">Time to achieve a VIP tier</div>
          <div>
            <div class="amvip--customRadio">
              <md-radio
                v-model="form.time_slot"
                value="calendar_year"
                id="calendarYear"
                name="time_slot"
                ref="time_slot"
              >
                Annual
              </md-radio>
              <small>
                A member qualifies for the enrolling period
              </small>
              <md-radio
                v-model="form.time_slot"
                value="life_time"
                id="lifetime"
                name="time_slot"
                ref="time_slot"
              >
                Lifetime
              </md-radio>
              <small>
                Once a member achieves a tier, they will keep their status
                forever.
              </small>
            </div>
            <span
              class="md-custom-error top-minus-20"
              v-if="!$v.form.time_slot.required && $v.form.time_slot.$dirty"
            >
              Time to achieve a VIP tier is required
            </span>
          </div>
        </div>
        <br />
        <br />
        <footer class="amvip-actionFooter">
          <button class="amvip--btnSec" @click="confirmCancelSetup">
            Cancel
          </button>
          <button class="amvip--btnPri" @click="gotoManageTier">Save</button>
        </footer>
      </section>
    </section>
    <ConfirmPopup
      v-if="showConfirmPopup"
      :showPopup="showConfirmPopup"
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
    ></ConfirmPopup>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_setup");

.md-switch.tierNameDisplay {
  margin-left: 20px;
}
.noBanner {
  .amvip--landingGrey {
    padding-top: 0;
  }
}
.md-datepicker-overlay {
  z-index: 10000;
}
.md-datepicker-dialog {
  z-index: 10002;
}
.md-field.md-custom-invalid {
  margin-bottom: 2px;
  label {
    color: var(--md-theme-default-fieldvariant, #ff1744);
  }
  &::after {
    background-color: var(--md-theme-default-fieldvariant, #ff1744);
  }
}
.md-custom-error {
  color: var(--md-theme-default-fieldvariant, #ff1744);
  font-size: 12px;
  text-align: left;
  &.padLeft-35 {
    padding-left: 35px;
  }
  &.top-minus-20 {
    top: -20px;
    position: relative;
  }
}
.dateWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  > div {
    margin-right: 15px;
  }
}
[data-popover="foo"] {
  background: #f9f9f9;
  color: #444;
  font-size: 12px;
  line-height: 1.5;
  margin: 5px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import "./../../filters/vip-tier/date.js";
import ConfirmPopup from "./ConfirmPopup";
import Axios from "axios";
const Mode = {
  Create: "create",
  Edit: "edit",
};
export default {
  name: "Setup",
  mixins: [validationMixin],
  components: {
    ConfirmPopup,
  },
  data: () => ({
    form: {
      name: null,
      description: null,
      date_start: null,
      selection_type: "points",
      tier_name_display: true,
      time_slot: "calendar_year",
    },
    userSaved: false,
    installedDate: new Date("06/18/2021"),
    tier_id: null,
    sending: false,
    lastUser: null,
    mode: Mode.create,
    showConfirmPopup: false,
    popupConfig: null,
    disabledDates: (date) => {
      return date > new Date();
    },
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      date_start: {
        required,
        installed_date_validator(value) {
          return new Date(value) >= this.$data.installedDate;
        },
        post_date_validator(value) {
          return new Date(value) < new Date();
        },
      },
      selection_type: {
        required,
      },
      time_slot: {
        required,
      },
    },
  },
  beforeMount() {},
  mounted() {
    const currentRoute = this.$route.path.split("/")[
      this.$route.path.split("/").length - 1
    ];
    switch (currentRoute) {
      case "setupProgram":
        this.mode = Mode.Create;
        break;
      case "editProgram":
        this.mode = Mode.Edit;
        break;
      default:
        break;
    }
    if (this.mode == Mode.Edit) {
      const url = this.getApiUrl(`Tiers/Setupvip`);
      const statusUrl = this.getApiUrl(`Tiers/settings`);
      Axios.get(statusUrl).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          this.installedDate = new Date(res.data.data.install_date);
          this.tier_id = res.data.data.tier_id;
          Axios.get(url).then((res) => {
            if (res.data.error) {
              return false;
            } else {
              this.updateFormData(res.data.data);
            }
          });
        }
      });
    }
  },
  methods: {
    gotoManageTier() {
      this.validateUser();
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    confirmCancelSetup() {
      this.popupConfig = {
        title: "Confirm!",
        content: "Are you sure, you want to cancel the setup?",
        confirmText: "OK",
        cancelText: "Cancel",
        id: "cancelSetup",
      };
      this.showConfirmPopup = true;
    },
    confirmClicked(event) {
      this.showConfirmPopup = false;
      if (event.id == "finalConfirmSetup") {
        this.updateStatus(1);
        this.saveUser();
      } else {
        this.clearForm();
        this.$router.push("/view/tiers/home");
      }
    },
    cancelClicked(event) {
      console.log(event);
      if (event.id == "finalConfirmSetup") {
        this.updateStatus(0);
        this.saveUser();
      }
      this.showConfirmPopup = false;
    },
    async updateStatus(status) {
      const statusUrl = this.getApiUrl("Tiers/Viptierstatus");
      try {
        const res = await Axios.post(statusUrl, { status: status });
        if (res.data.error) {
          return false;
        } else {
          window.sessionStorage.setItem("statusData", status);
        }
      } catch (error) {
        return false;
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.title = null;
      this.form.description = null;
      this.form.startDate = null;
      this.form.tierType = null;
      this.form.achievementType = null;
    },
    saveUser() {
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      if (this.mode === Mode.Create) {
        const url = this.getApiUrl(`Tiers/Setupvip`);
        Axios.post(url, returnData).then((res) => {
          if (res.data.error) {
            return false;
          } else {
            this.$router.push({
              name: "ManageTier",
            });
          }
        });
      } else {
        const url = this.getApiUrl(`Tiers/Setupvip`);
        Axios.put(url, returnData).then((res) => {
          if (res.data.error) {
            return false;
          } else {
            this.$router.push("/view/tiers/manage-tier");
          }
        });
      }
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
        if (response[value] || value == "tier_name_display") {
          if (value == "startDate") {
            response[value] = new Date(response[value]);
          } else if (value == "tier_name_display") {
            response[value] = response[value] == 0 ? false : true;
          }
          this.form[value] = response[value];
        }
      });
    },
    validateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.focusFirstStatus(this.$v.form, this.$refs);
      } else {
        if (this.mode == Mode.Edit) {
          this.saveUser();
        } else {
          this.popupConfig = {
            title: "Review or Launch",
            content:
              "We have setup 4 tiers with default settings. You can review or launch.",
            confirmText: "Yes, Launch",
            cancelText: "No, Review",
            id: "finalConfirmSetup",
          };
          this.showConfirmPopup = true;
        }
      }
    },
    goBack() {
      this.$router.push("/view/tiers/home");
    },
  },
};
</script>
