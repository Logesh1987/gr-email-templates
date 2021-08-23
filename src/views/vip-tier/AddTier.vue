<template>
  <div class="amvip--wrapper">
    <form novalidate class="md-layout">
      <div class="amvip--container amvip--addTier">
        <hgroup class="amvip--pageHeader">
          <span class="icon-next-arrow" @click="goBack"></span>
          <h2>Add Tier</h2>
        </hgroup>
        <div class="amvip--formRow">
          <md-field :class="getValidationClass('name')">
            <label for="name">
              name
              <span class="amvip--mandatory">*</span>
            </label>
            <md-input
              name="name"
              id="name"
              v-model="form.name"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.name.required">
              name is required
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
        <div class="amvip--formRow multiCol">
          <label for="color">Background Color</label>
          <div class="amvip--colorInfo">
            <ColorPicker
              id="color"
              name="color"
              :color="form.color"
              v-model="form.color"
              v-on:input="e => (form.color = e)"
            ></ColorPicker>
          </div>
        </div>
        <div class="amvip--formRow multiCol">
          <md-field :class="getValidationClass('goal')">
            <label for="goal">
              Points Needed
              <span class="amvip--mandatory">*</span>
            </label>
            <md-input
              name="goal"
              id="goal"
              type="number"
              v-model="form.goal"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.goal.required">
              Points Needed field is required
            </span>
            <span class="md-error" v-else-if="!$v.form.goal.minLenght">
              Minimum value of point needed would be 3
            </span>
          </md-field>
        </div>
        <div class="amvip--formRow multiCol">
          <label>Tier Icon</label>
          <div class="amvip--icon">
            <span class="amvip--iconPreview"></span>
            <md-field :class="getValidationClass('icon')">
              <label for="icon">Upload</label>
              <md-file
                accept="image/*"
                name="icon"
                id="icon"
                v-model="form.icon"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.icon.required">
                Tier Icon is required
              </span>
            </md-field>
          </div>
        </div>
      </div>
    </form>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="saveTier">Save</button>
    </footer>
    <Loader :status="loader"></Loader>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_add-tier");
.amvip--container.amvip--addTier {
  width: 85%;
  .amvip--colorInfo {
    z-index: 2;
  }
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker";
import Loader from "./../../components/Loader";
import Axios from "axios";
export default {
  name: "AddTier",
  components: { ColorPicker, Loader },
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
      icon: null,
      color: null,
      goal: null,
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
      icon: {
        required,
      },
      goal: { required, minValue: minValue(3) },
    },
  },
  methods: {
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
      this.form.goal = null;
      this.$router.push("/view/tiers/manage-tier");
    },
    saveTier() {
      if (!this.validate()) {
        return false;
      }
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.post(url, returnData)
        .then(res => res)
        .catch(err => err)
        .finally(() => {
          this.loader = false;
          this.$router.push("/view/tiers/manage-tier");
        });
      console.log(returnData);
    },
    getFormData() {
      const returnObj = {};
      Object.keys(this.form).forEach(value => {
        returnObj[value] = this.form[value];
      });
      return returnObj;
    },
    validate() {
      let isValidated = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        isValidated = false;
        console.log("error");
      } else {
        isValidated = true;
      }
      return isValidated;
    },
    goBack() {
      this.$router.push("/view/tiers/manage-tier");
    },
  },
};
</script>
