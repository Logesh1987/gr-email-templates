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
      <form novalidate class="md-layout" @submit.prevent="gotoManageTier">
        <section>
          <h2>Setup VIP Tier Program</h2>
          <div class="amvip--formRow">
            <md-field :class="getValidationClass('name')">
              <label for="name">
                Title
                <span class="amvip--mandatory">*</span>
              </label>
              <md-input
                name="name"
                id="name"
                v-model="form.name"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.name.required">
                Label is required
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
                <label>Select Date to begin the program</label>
              </md-datepicker>
              <span
                class="md-custom-error padLeft-35"
                v-if="!$v.form.date_start.required && $v.form.date_start.$dirty"
              >
                Date to beign the program is required.
              </span>
              <span
                class="md-custom-error padLeft-35 top-minus-20"
                v-if="
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
            <div class="formLabel">What should define your Tiers</div>
            <div>
              <div class="amvip--customRadio">
                <md-radio
                  v-model="form.selection_type"
                  value="no_of_purchase"
                  id="purchase"
                  name="selection_type"
                >
                  Purchase
                </md-radio>
              </div>
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
              <span
                class="md-custom-error top-minus-20"
                v-if="
                  !$v.form.selection_type.required &&
                    $v.form.selection_type.$dirty
                "
              >
                Tier Type is required
              </span>
            </div>
          </div>
          <div class="amvip--radioRow btmBorder">
            <div class="formLabel">Time to achieve a VIP Tier</div>
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
                  One Calendar Year
                </md-radio>
                <small>
                  A member qualifies for the calendar year (1st Jan - 31st Dec)
                </small>
              </div>
              <span
                class="md-custom-error top-minus-20"
                v-if="!$v.form.time_slot.required && $v.form.time_slot.$dirty"
              >
                Time to achieve a VIP Tier is required
              </span>
            </div>
          </div>
          <br />
          <br />
          <footer class="amvip-actionFooter">
            <button class="amvip--btnPri">Save</button>
          </footer>
        </section>
      </form>
    </section>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_setup");
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
import Axios from "axios";
const Mode = {
  Create: "create",
  Edit: "edit",
};
export default {
  name: "Setup",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
      date_start: null,
      selection_type: null,
      time_slot: null,
    },
    userSaved: false,
    installedDate: new Date("06/18/2021"),
    sending: false,
    lastUser: null,
    mode: Mode.create,
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
          console.log(value);
          return new Date(value) < this.$data.installedDate;
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
  components: {},
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
      Axios.get("https://vip-tier.free.beeceptor.com/setupProgram").then(
        res => {
          this.updateFormData(res.data);
        }
      );
    }
  },
  methods: {
    gotoManageTier() {
      this.validateUser();
      if (this.userSaved) {
        console.log("from goto ", this.$v.form.title);
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
        Axios.post(
          "https://vip-tier.free.beeceptor.com/setupProgram",
          returnData
        ).then(response => {
          console.log("response from server", response.data);
          this.$router.push("/view/tiers/manage-tier");
        });
      } else {
        Axios.put(
          "https://vip-tier.free.beeceptor.com/setupProgram",
          returnData
        ).then(response => {
          console.log("response from server", response.data);
          this.$router.push("/view/tiers/manage-tier");
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
        console.log("error");
      } else {
        this.saveUser();
      }
    },
  },
};
</script>
