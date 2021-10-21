<template>
  <div class="amvip--wrapper">
    <!-- <form novalidate class="md-layout"> -->
    <div class="amvip--container amvip--addTier">
      <hgroup class="amvip--pageHeader">
        <span class="far fa-arrow-left" @click="goBack"></span>
        <h2>Add tier</h2>
      </hgroup>
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
            ref="name"
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
      <div class="amvip--formRow multiCol">
        <label for="color">Background color</label>
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
            Points needed
            <span class="amvip--mandatory">*</span>
          </label>
          <md-input
            name="goal"
            id="goal"
            type="number"
            ref="goal"
            v-model="form.goal"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.goal.required">
            Points needed field is required
          </span>
          <span class="md-error" v-else-if="!$v.form.goal.minLenght">
            Minimum value of point needed would be 25
          </span>
        </md-field>
      </div>
      <div class="amvip--formRow multiCol">
        <label
          >Tier Icon
          <span class="amvip--mandatory">*</span>
        </label>
        <div class="amvip--icon">
          <span
            id="fileUpload"
            class="amvip--iconPreview"
            v-bind:class="validURL(form.icon) ? '' : form.icon"
            v-bind:style="
              validURL(form.icon)
                ? {
                    backgroundImage: 'url(' + form.icon + ')',
                  }
                : { color: form.color }
            "
            @click="showIconPopup()"
          >
            <span
              class="custom-icon"
              v-bind:class="
                form.icon && form.icon.length > 0
                  ? 'far fa-edit'
                  : 'far fa-plus'
              "
            ></span>
          </span>
          <span class="md-error" v-if="!$v.form.icon.required">
            Tier icon is required
          </span>
        </div>
      </div>
      <IconPopup
        ref="iconPopupEle"
        :showPopup="enableIcon"
        v-on:close-btn-click="hideIconPopup"
      ></IconPopup>
    </div>
    <!-- </form> -->
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="clearForm">Cancel</button>
      <button class="amvip--btnPri" @click="saveTier">Save</button>
    </footer>
    <Loader :status="loader"></Loader>
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
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_add-tier");
.amvip--container.amvip--addTier {
  width: 85%;
  .amvip--colorInfo {
    z-index: 3;
  }
  .amvip--icon {
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    .amvip--iconPreview {
      min-width: 60px;
      max-width: 60px;
    }
  }
  #fileUpload {
    position: relative;
    font-size: 40px;
    .custom-icon:not(.popup-icon) {
      font-size: 24px;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      &:not(.fa-plus) {
        &:hover {
          &::before {
            transition: all;
            transition-duration: 250ms;
            opacity: 1;
            top: 15px;
          }
        }
        &::before {
          position: absolute;
          z-index: 1;
          opacity: 0;
          top: 30px;
        }
      }
    }
  }
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";
import ColorPicker from "./../../components/ColorPicker";
import Loader from "./../../components/Loader";
import Axios from "axios";
import IconPopup from "./IconPopup";
export default {
  name: "AddTier",
  components: { ColorPicker, Loader, IconPopup },
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
    file: null,
    showSnackbar: false,
    responseData: "",
    existingFile: null,
    existingFileName: "",
    enableIcon: false,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      goal: { required, minValue: minValue(25) },
      icon: {
        required,
      },
    },
  },
  methods: {
    showIconPopup() {
      this.$refs.iconPopupEle.iconConfig = this.form;
      this.enableIcon = true;
    },
    hideIconPopup() {
      this.enableIcon = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    blobUrl(val) {
      if (!val || !val.constructor || val.constructor !== File) return val;
      return URL.createObjectURL(val);
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
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.post(url, returnData)
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
    },
    selectedFile(file) {
      if (file.length > 0) {
        this.existingFile = file[0];
      }
      this.file = file.length > 0 ? file[0] : this.existingFile;
      const formData = new FormData();
      formData.append("Filedata", file[0]);
      formData.append("suffix", "tier");
      this.existingFileName =
        file.length > 0 ? file[0] : this.existingFile.name;
      if (file.length == 0) {
        return false;
      }
      this.loader = true;
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .then(res => {
          if (res.data.error && res.data.error == 1) {
            this.file = this.existingFile ? this.existingFile : null;
            this.responseData = res.data.msg;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.message != undefined) {
              this.responseData = res.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.form.icon = imageUrl;
          }
        })
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .finally(() => {
          this.loader = false;
        });
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
        this.focusFirstStatus(this.$v.form, this.$refs);
        this.responseData = "Validation Errors!!!";
        this.showSnackbar = true;
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
