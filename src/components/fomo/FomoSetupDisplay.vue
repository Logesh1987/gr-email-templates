<template>
  <div>
    <h2 class="mt-20" v-if="!hidePositioning">Display Setup</h2>
    <div class="fullDiv" v-if="!hidePositioning">
      <h6 class="bLabel">Setup Positioning</h6>
      <md-field class="noMinHeight mb-0 mt-20" v-if="formData.position">
        <label for="position">Position</label>
        <md-select v-model="formData.position" id="position" name="position">
          <md-option
            :value="key"
            v-for="(name, key) in content.prompt_positions"
            :key="key"
            >{{ name }}</md-option
          >
        </md-select>
      </md-field>
      <div class="display-flex hv-position justify-content-space-between">
        <div class="form-group display-flex">
          <md-field
            :class="{ 'md-invalid': formErrors.horizontal, 'mt-20': true }"
          >
            <label>Horizontal Position (px)</label>
            <md-input
              v-model="formData.horizontal"
              type="number"
              required
            ></md-input>
            <span class="md-suffix">pixels</span>
            <span class="md-error" v-if="formErrors.horizontal">{{
              formErrors.horizontal
            }}</span>
          </md-field>
        </div>
        <div class="form-group display-flex">
          <md-field
            :class="{ 'md-invalid': formErrors.vertical, 'mt-20': true }"
          >
            <label>Vertical Position (px)</label>
            <md-input v-model="formData.vertical" type="number"></md-input>
            <span class="md-suffix">pixels</span>
            <span class="md-error" v-if="formErrors.vertical">{{
              formErrors.vertical
            }}</span>
          </md-field>
        </div>
      </div>
    </div>
    <h2 data-v-20638218="" class="mt-20 pt-10">Display Rules</h2>
    <div class="displaySetting fullDiv visibleTo" v-if="formData.visible_to">
      <h6 class="bLabel noBG">Visible to:</h6>
      <div>
        <md-field class="noMinHeight m-0 p-0">
          <md-select v-model="formData.visible_to" name="visible_to">
            <md-option value="all">All Users</md-option>
            <md-option value="signed">Signed Users</md-option>
            <md-option value="unsigned">Unsigned Users</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="displaySetting fullDiv flex-direction-column">
      <h6 class="bLabel">Setup Geolocation</h6>
      <multiselect
        v-model="geolocation"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="label"
        track-by="value"
        :hideSelected="true"
        :options="allCountries"
        :multiple="true"
      ></multiselect>
      <small class="text-info display-flex align-items-start">
        <i class="fas fa-info-circle"></i>
        <span> Display in selected countries only </span>
      </small>
    </div>
    <div v-if="automatic == 1">
      <div class="displaySetting">
        <div class="fullDiv" v-if="formData.show_on_page">
          <h6 class="bLabel">Setup Page Display</h6>
          <div class="display-flex pageDisplay align-items-center">
            <label>Display FOMO in</label>
            <md-field class="mb-10">
              <md-select name="show_on_page" v-model="formData.show_on_page">
                <md-option value="all">All pages</md-option>
                <md-option value="home">Home page only</md-option>
                <md-option value="specific">Specific pages</md-option>
              </md-select>
            </md-field>
          </div>
          <div v-if="formData.show_on_page == 'specific'">
            <md-field>
              <label>Show on specific page(s)</label>
              <md-input v-model="formData.specific_pages"></md-input>
            </md-field>
            <small class="text-info display-flex align-items-start">
              <i class="fas fa-info-circle"></i>
              <span>
                Enter Slug, Part URL (E.g. products, myaccount, cart ..etc) to
                show the widget on the page(s) or page name
              </span>
            </small>
          </div>
        </div>
      </div>
      <div class="displaySetting fullDiv flex-direction-column">
        <h6 class="bLabel">Setup Behaviour</h6>
        <div>
          <md-checkbox
            v-model="formData.show_on_first_visit"
            :true-value="1"
            :false-value="0"
            >Pop should appear only on first visit</md-checkbox
          >
        </div>
        <div class="display-flex hv-position justify-content-space-between">
          <div class="display-flex">
            <md-field
              :class="{ 'md-invalid': formErrors.scroll, 'mt-20': true }"
            >
              <label>
                Scroll Percentage
                <i class="ml-10 fas fa-info-circle" style="color:black">
                  <md-tooltip
                    >Set the percentage a visitor needs to scroll down the page
                    for the pop up to appear.</md-tooltip
                  >
                </i>
              </label>
              <md-input
                v-model="formData.scroll_percentage"
                type="number"
              ></md-input>
              <span class="md-error" v-if="formErrors.scroll">{{
                formErrors.scroll
              }}</span>
            </md-field>
          </div>
          <div class="display-flex">
            <md-field
              :class="{ 'md-invalid': formErrors.delay, 'mt-20': true }"
            >
              <label>
                Delay Seconds
                <i class="ml-10 fas fa-info-circle" style="color:black">
                  <md-tooltip
                    >Set the number of seconds a visitor needs to be on your
                    webpage before the pop up appears</md-tooltip
                  >
                </i>
              </label>
              <md-input v-model="formData.seconds" type="number"></md-input>
              <span class="md-error" v-if="formErrors.delay">{{
                formErrors.delay
              }}</span>
            </md-field>
          </div>
        </div>
      </div>
    </div>
    <div
      class="displaySetting fullDiv visibleTo justify-content-space-between"
      style="margin-top: 20px"
    >
      <span class="display-flex align-items-center">
        <label
          class="switch small mr-10"
          for="is_automatic"
          @click.prevent="
            e =>
              automatic == 1
                ? (promptAutomatic = true)
                : handleUpdateAutomatic()
          "
        >
          <input
            type="checkbox"
            name="mainSwitch"
            id="is_automatic"
            :checked="automatic == 1"
          />
          <i></i>
        </label>
        <div class="relative" v-if="promptAutomatic">
          <br />
          <FloatingConfirmBox
            position="bottom-right"
            description="Prompt warning"
            :handleCancel="e => (promptAutomatic = false)"
            :handleProceed="handleUpdateAutomatic"
          />
        </div>
        Add to automatic queue
        <i class="ml-10 fas fa-info-circle">
          <md-tooltip>More info about stack </md-tooltip>
        </i>
      </span>
      <md-button
        v-if="siteId && automatic == 1"
        :href="`/gr/admin/#/${siteId}/view/widgets`"
        class="md-primary"
        >Edit Widget <i class="ml-5 fas fa-external-link mr-0"></i
      ></md-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import FloatingConfirmBox from "./FloatingConfirmBox.vue";

export default {
  name: "FomoDisplaySetup",
  props: [
    "formData",
    "automatic",
    "updateSecondaryError",
    "updateAutomatic",
    "content",
    "hidePositioning"
  ],
  components: { Multiselect, FloatingConfirmBox },
  mixins: ["createFormData"],
  data: function() {
    return {
      formErrors: {},
      siteId: Vue.prototype.$id_site || null,
      promptAutomatic: false
    };
  },
  watch: {
    formData: {
      deep: true,
      handler: function(data) {
        `${data.horizontal}`.length && data.horizontal >= 0
          ? delete this.formErrors["horizontal"]
          : (this.formErrors.horizontal = "Invalid input");

        `${data.vertical}`.length && data.vertical >= 0
          ? delete this.formErrors["vertical"]
          : (this.formErrors.vertical = "Invalid input");

        data.seconds >= 0
          ? delete this.formErrors["delay"]
          : (this.formErrors.delay = "Invalid input");

        data.scroll_percentage >= 0
          ? delete this.formErrors["scroll"]
          : (this.formErrors.scroll = "Invalid input");

        Object.keys(this.formErrors).length > 0
          ? this.updateSecondaryError(true)
          : this.updateSecondaryError(false);
      }
    }
  },
  computed: {
    allCountries: function() {
      const all = [];
      Object.keys(this.content.countries).forEach(key => {
        all.push({
          label: this.content.countries[key],
          value: key
        });
      });
      return all;
    },
    geolocation: {
      // The allowed_countries initially comes as a string., need to change it as an array
      get: function() {
        return typeof this.formData.allowed_countries == "string"
          ? this.formData.allowed_countries.length > 0
            ? this.formData.allowed_countries
                .split(",")
                .map(k => ({ value: k, label: this.content.countries[k] }))
            : []
          : this.formData.allowed_countries;
      },
      set: function(v) {
        this.formData.allowed_countries = v;
      }
    }
  },
  methods: {
    handleUpdateAutomatic: function() {
      this.promptAutomatic = false;
      this.updateAutomatic();
    }
  }
};
</script>
<style lang="less" scoped>
.md-field {
  input {
    width: 100%;
  }
  .md-error {
    left: auto;
    right: 0;
  }
}
.bLabel {
  font-size: 1.1em;
  font-weight: 600;
  color: #333;
  margin: 0;
  background: #ddd;
  padding: 10px;
  margin: -10px -10px 0;
  border-bottom: 1px solid var(--stroke-grey);
  &.noBG {
    background: none;
    padding: 0;
    margin: 0;
    border-bottom: 0;
  }
}
.hv-position {
  .display-flex {
    width: 48%;
  }
}
.pageDisplay {
  > label {
    white-space: nowrap;
    padding-right: 1em;
    padding-top: 10px;
    font-size: 1.1em;
  }
}
.fullDiv {
  border: 1px solid var(--stroke-grey);
  background: #fff;
  padding: 10px;
  margin-bottom: 15px;
}
.visibleTo {
  display: flex;
  align-items: center;
  h6 {
    width: 40%;

    @media only screen and (max-width: 599px) {
      width: auto;
      margin-bottom: 20px !important;
    }
  }
}

.text-info {
  line-height: 1.1;
  i {
    font-size: 1.4em;
    padding-right: 5px;
    transform: translateY(-0.2em);
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
</style>
