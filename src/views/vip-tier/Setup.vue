<template>
  <div class="amvip--landingGrey">
    <div class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <aside class="amvip--landingBrand">
      <div>
        <span class="icon-crown"></span>
        <h2>VIP</h2>
        <h3>Tiers</h3>
        <small>Beta</small>
      </div>
    </aside>
    <section class="amvip-twoColContent" id="setupProgram">
      <form novalidate class="md-layout">
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
              />
              <span class="md-error" v-if="!$v.form.name.required">
                Name is required
              </span>
              <span class="md-error" v-else-if="!$v.form.name.minLenght">
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
          <div class="amvip--formRow">
            <div class="amvip--dateRow">
              <md-datepicker
                md-immediately
                :class="getValidationClass('date_start')"
                name="date_start"
                id="date_start"
                v-model="form.date_start"
                :disabled="sending"
              >
                <label>Select date to begin the program</label>
              </md-datepicker>
              <span
                class="md-custom-error padLeft-35"
                v-if="!$v.form.date_start.required && $v.form.date_start.$dirty"
              >
                Date to beign the program is required.
              </span>
              <span
                class="md-custom-error padLeft-35 top-minus-20"
                v-else-if="
                  !$v.form.date_start.installed_data_validator &&
                    $v.form.date_start.$dirty
                "
              >
                Date cannot be older than program installed date ({{
                  installedDate | formatDate
                }})
              </span>
            </div>
          </div>
          <div class="amvip--radioRow">
            <div class="formLabel">What should define your tiers</div>
            <div>
              <div class="amvip--customRadio">
                <md-radio
                  v-model="form.selection_type"
                  value="no_of_points"
                  id="points"
                  name="selection_type"
                >
                  Points
                </md-radio>
              </div>
              <div class="amvip--customRadio">
                <md-radio
                  v-model="form.selection_type"
                  value="purchase_value"
                  id="purchase"
                  name="selection_type"
                >
                  Purchase
                </md-radio>
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
                  value="lifetime"
                  id="lifetime"
                  name="time_slot"
                >
                  Lifetime
                </md-radio>
                <small>
                  Once a member achieves a tier, they will keep their status
                  forever.
                </small>
              </div>
              <div class="amvip--customRadio">
                <md-radio
                  v-model="form.time_slot"
                  value="year"
                  id="calendarYear"
                  name="time_slot"
                >
                  Annual
                </md-radio>
                <small>
                  A member qualifies for the calendar year (1st Jan - 31st Dec)
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
      </form>
    </section>
    <Loader :status="loader"></Loader>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
    ></ConfirmPopup>
    <md-snackbar
      :md-position="'center'"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ responseData }}</span>
    </md-snackbar>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_setup");
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
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import "./../../filters/vip-tier/date.js";
import Loader from "./../../components/Loader.vue";
import ConfirmPopup from "./ConfirmPopup.vue";
import Axios from "axios";
const Mode = {
  Create: "create",
  Edit: "edit",
};
export default {
  name: "Setup",
  mixins: [validationMixin],
  components: {
    Loader,
    ConfirmPopup,
  },
  data: () => ({
    form: {
      name: null,
      description: null,
      date_start: null,
      selection_type: "no_of_points",
      time_slot: null,
    },
    userSaved: false,
    installedDate: new Date("06/18/2021"),
    tier_id: null,
    sending: false,
    lastUser: null,
    mode: Mode.create,
    loader: false,
    showConfirmPopup: false,
    showSnackbar: false,
    responseData: "",
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      date_start: {
        required,
        installed_data_validator(value) {
          return new Date(value) >= this.$data.installedDate;
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
      this.loader = true;
      Axios.get(statusUrl)
        .then(res => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.data.message != undefined) {
              this.responseData = res.data.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            this.installedDate = new Date(res.data.data.install_date);
            this.tier_id = res.data.data.tier_id;
            Axios.get(url)
              .then(res => {
                if (res.data.error) {
                  this.responseData = res.data.error.message;
                  if (this.responseData && this.responseData.length > 0) {
                    this.showSnackbar = true;
                  }
                  return false;
                } else {
                  if (res.data.data.message != undefined) {
                    this.responseData = res.data.data.message;
                    if (this.responseData && this.responseData.length > 0) {
                      this.showSnackbar = true;
                    }
                  }
                  this.updateFormData(res.data.data);
                }
              })
              .catch(err => {
                this.responseData = err;
                this.showSnackbar = true;
              })
              .finally(() => {
                this.loader = false;
              });
          }
        })
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .finally(() => {
          // this.loader = false;
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
    confirmClicked() {
      this.showConfirmPopup = false;
      this.clearForm();
      this.$router.push("/view/tiers/home");
    },
    cancelClicked() {
      this.showConfirmPopup = false;
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
        this.loader = true;
        Axios.post(url, returnData)
          .then(res => {
            if (res.data.error) {
              this.responseData = res.data.error.message;
              if (this.responseData && this.responseData.length > 0) {
                this.showSnackbar = true;
              }
              return false;
            } else {
              if (res.data.data.message != undefined) {
                this.responseData = res.data.data.message;
                if (this.responseData && this.responseData.length > 0) {
                  this.showSnackbar = true;
                }
              }
              this.$router.push("/view/tiers/manage-tier");
            }
          })
          .catch(err => {
            this.responseData = err;
            this.showSnackbar = true;
          })
          .finally(() => {
            this.loader = false;
          });
      } else {
        const url = this.getApiUrl(`Tiers/Setupvip`);
        this.loader = true;
        Axios.put(url, returnData)
          .then(res => {
            if (res.data.error) {
              this.responseData = res.data.error.message;
              if (this.responseData && this.responseData.length > 0) {
                this.showSnackbar = true;
              }
              return false;
            } else {
              if (res.data.data.message != undefined) {
                this.responseData = res.data.data.message;
                if (this.responseData && this.responseData.length > 0) {
                  this.showSnackbar = true;
                }
              }
              this.$router.push("/view/tiers/manage-tier");
            }
          })
          .catch(err => {
            this.responseData = err;
            this.showSnackbar = true;
          })
          .finally(() => {
            this.loader = false;
          });
      }
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
          if (value == "startDate") {
            response[value] = new Date(response[value]);
          }
          this.form[value] = response[value];
        }
      });
    },
    validateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.responseData = "Validation Errors!!!";
        this.showSnackbar = true;
      } else {
        this.saveUser();
      }
    },
    goBack() {
      this.$router.push("/view/tiers/home");
    },
  },
};
</script>
