<template>
  <div class="amvip--wrapper">
    <div class="amvip--addTier">
      <hgroup class="amvip--pageHeader">
        <div class="headerGroup">
          <span class="far fa-arrow-left" @click="goBack"></span>
          <h2>Add tier</h2>
        </div>
      </hgroup>
      <div class="amvip--container">
        <div class="amvip--formRow" :class="getValidationClass('name')">
          <label for="name">
            Name
            <span class="amvip--mandatory">*</span>
          </label>
          <input
            name="name"
            type="text"
            id="name"
            v-model="form.name"
            ref="name"
            :disabled="sending"
          />
          <div class="md-error" v-if="!$v.form.name.required">
            Name is required
          </div>
          <div class="md-error" v-else-if="!$v.form.name.minLenght">
            Minimum of 3 letters required
          </div>
        </div>
        <div class="amvip--formRow">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            v-model="form.description"
            :disabled="sending"
            rows="8"
          ></textarea>
        </div>
        <div
          class="amvip--formRow multiCol"
          :class="getValidationClass('goal')"
        >
          <label for="goal">
            {{
              tierDefine == "points" ? "Points needed" : "Purchase Value needed"
            }}
            <span class="amvip--mandatory">*</span>
          </label>
          <input
            name="goal"
            id="goal"
            ref="goal"
            type="number"
            v-model="form.goal"
            :disabled="sending"
          />
          <div class="md-error" v-if="!$v.form.goal.required">
            {{
              tierDefine == "points"
                ? "Points needed "
                : "Purchase Value needed "
            }}
            field is required
          </div>
          <div class="md-error" v-else-if="!$v.form.goal.minLenght">
            Minimum value of point needed would be 25
          </div>
        </div>
        <div class="amvip--formRow multiCol">
          <label for="color">Background color</label>
          <div class="amvip--colorInfo">
            <ColorPicker
              ref="colorPicker"
              id="color"
              name="color"
              :color="form.color"
              v-model="form.color"
              v-on:input="(e) => (form.color = e)"
            ></ColorPicker>
          </div>
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
                    : 'fas fa-cloud-upload'
                "
              ></span>
            </span>
            <div class="md-error" v-if="!$v.form.icon.required">
              Tier icon is required
            </div>
          </div>
        </div>
        <IconPopup
          ref="iconPopupEle"
          :showPopup="enableIcon"
          v-on:close-btn-click="hideIconPopup"
        ></IconPopup>

        <div class="amvip--row center">
          <span class="spacer"></span>
          <div class="amvip-actionFooter">
            <button class="amvip--btnSec" @click="clearForm">Cancel</button>
            <button class="amvip--btnPri" @click="saveTier">Save</button>
          </div>
        </div>

        <div class="tierDetails">
          <h3>Tier details</h3>
          <div class="gradientBox">
            <div class="gradientBoxInner">
              <div class="tierDetailsPlan">
                <span class="tierIcon"><i class="fas fa-fire"></i></span>
                <div>
                  <h3>Gold</h3>
                  <small>1.5x Points on ongoing basis</small>
                </div>
              </div>
              <div class="borderShadow"></div>
              <div class="amvip--formRow eligibilityInput">
                <label for="earnPts">Eligibility:</label>
                <div class="input-group">
                  <span class="input-group-addon">Earn</span>
                  <input
                    type="number"
                    class="form-control"
                    value="0"
                    id="earnPts"
                    min="0"
                    max="100000"
                  />
                </div>
                <small>
                  Points per year
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="amvip--row center">
          <span class="spacer"></span>
          <div class="amvip-actionFooter">
            <button class="amvip--btnSec" @click="clearForm">Cancel</button>
            <button class="amvip--btnPri" @click="saveTier">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_add-tier");
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
  .amvip--colorInfo {
    z-index: 3;
  }
  .amvip--icon {
    display: flex;
    align-items: center;
    .amvip--iconPreview {
      width: 75px;
      height: 75px;
    }
  }
  #fileUpload {
    position: relative;
    font-size: 40px;
    .custom-icon:not(.popup-icon) {
      font-size: 40px;
      cursor: pointer;
      z-index: 2;
      color: grey;
      &:hover {
        color: #000000;
      }
      &:not(.fa-cloud-upload) {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 70px;
        height: 70px;
        padding: 0 0 0 15px;
        border-radius: 50%;
        box-sizing: border-box;
        &:hover {
          &::before {
            transition: all;
            transition-duration: 250ms;
            opacity: 1;
            top: 15px;
            color: #000000;
          }
        }
        &::before {
          position: absolute;
          z-index: 1;
          opacity: 0;
          background: #fff;
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
import Axios from "axios";
import IconPopup from "./IconPopup";
import useVuelidate from "@vuelidate/core";
export default {
  name: "AddTier",
  components: { ColorPicker, IconPopup },
  mixins: [validationMixin],
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    form: {
      name: null,
      description: null,
      icon: null,
      color: null,
      goal: null,
    },
    sending: false,
    file: null,
    existingFile: null,
    existingFileName: "",
    enableIcon: false,
    tierDefine: "points",
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
  mounted() {
    const url = this.getApiUrl(`Tiers/Setupvip`);
    Axios.get(url).then((res) => {
      if (res.data.error) {
        return false;
      } else {
        this.tierDefine = res.data.data.selection_type;
      }
    });
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
      const field =
        this.v$.form[fieldName].$errors.length > 0 &&
        this.v$.form[fieldName].$dirty;
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
      const url = this.getApiUrl("Tiers/Managetiers");
      Axios.post(url, returnData)
        .then((res) => {
          if (res.data.error) {
            return false;
          } else {
            if (res.data.data.message != undefined) {
              window.sessionStorage.setItem("dataChanged", true);
            }
            this.$router.push("/view/tiers/manage-tier");
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
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
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .then((res) => {
          if (res.data.error && res.data.error == 1) {
            this.file = this.existingFile ? this.existingFile : null;
            return false;
          } else {
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.form.icon = imageUrl;
          }
        })
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        });
    },
    getFormData() {
      const returnObj = {};
      Object.keys(this.form).forEach((value) => {
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
