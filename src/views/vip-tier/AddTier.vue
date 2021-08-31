<template>
  <div class="amvip--wrapper">
    <form novalidate class="md-layout">
      <div class="amvip--container amvip--addTier">
        <hgroup class="amvip--pageHeader">
          <span class="icon-next-arrow" @click="goBack"></span>
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
              v-model="form.goal"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.goal.required">
              Points needed field is required
            </span>
            <span class="md-error" v-else-if="!$v.form.goal.minLenght">
              Minimum value of point needed would be 50
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
              v-if="file"
              class="amvip--iconPreview"
              v-bind:style="{ backgroundImage: 'url(' + blobUrl(file) + ')' }"
            >
            </span>
            <md-field :class="getValidationClass('icon')">
              <label for="icon">Upload</label>
              <md-file
                accept="image/*"
                name="icon"
                id="icon"
                v-model="existingFileName"
                :disabled="sending"
                @md-change="selectedFile"
              />
              <span class="md-error" v-if="!$v.form.icon.required">
                Tier icon is required
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
    z-index: 2;
  }
  .amvip--icon {
    display: flex;
    .amvip--iconPreview {
      min-width: 60px;
      max-width: 60px;
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
    file: null,
    showSnackbar: false,
    responseData: "",
    existingFile: null,
    existingFileName: "",
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
      this.sending = true;
      const returnData = this.getFormData();
      this.userSaved = true;
      this.sending = false;
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.post(url, returnData)
        .then(res => {
          if (res.data.error && res.data.error == 1) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.responseData = res.data.data.message;
            this.$router.push("/view/tiers/manage-tier");
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
          }
        })
        .catch(err => err)
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
          console.log("S3Uploader/tier", JSON.stringify(res));
          if (res.data.error && res.data.error == 1) {
            this.file = this.existingFile ? this.existingFile : null;
            this.responseData = res.data.msg;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            this.responseData = res.data.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.form.icon = imageUrl;
          }
        })
        .catch(err => {
          this.responseData = JSON.stringify(err);
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
