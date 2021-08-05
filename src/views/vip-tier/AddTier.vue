<template>
  <div class="amvip--wrapper">
    <form novalidate class="md-layout">
      <div class="amvip--container amvip--addTier">
        <hgroup class="amvip--pageHeader">
          <span class="icon-next-arrow" @click="goBack"></span>
          <h2>Add Tier</h2>
        </hgroup>
        <div class="amvip--formRow">
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
              Title is required
            </span>
            <span class="md-error" v-else-if="!$v.form.title.minLenght">
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
          <label for="colorValue">Background Color</label>
          <div class="amvip--colorInfo">
            <ColorPicker
              id="colorValue"
              name="colorValue"
              :color="form.colorValue"
              v-model="form.colorValue"
              v-on:input="e => (form.colorValue = e)"
            ></ColorPicker>
          </div>
        </div>
        <div class="amvip--formRow multiCol">
          <label>Tier Icon</label>
          <div class="amvip--tierIcon">
            <span class="amvip--iconPreview"></span>
            <md-field :class="getValidationClass('tierIcon')">
              <label for="tierIcon">Upload</label>
              <md-file
                accept="image/*"
                name="tierIcon"
                id="tierIcon"
                v-model="form.tierIcon"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.tierIcon.required">
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
import { required, minLength } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker.vue";
export default {
  name: "AddTier",
  components: { ColorPicker },
  mixins: [validationMixin],
  data: () => ({
    form: {
      title: null,
      description: null,
      tierIcon: null,
      colorValue: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
      },
      tierIcon: {
        required,
      },
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
      this.form.title = null;
      this.form.description = null;
    },
    saveTier() {
      if (!this.validate()) {
        return false;
      }
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      console.log(returnData);
      this.$router.push("/view/tiers/manage-tier");
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
      history.back();
    },
  },
};
</script>
