<template>
  <div>
    <h2>Display Setup</h2>
    <div class="displaySetting fullDiv visibleTo" style="margin-top: 40px">
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
    <div class="displaySetting">
      <div class="splitDiv">
        <h6 class="bLabel">Setup Page Display</h6>
        <div class="display-flex pageDisplay align-items-center">
          <label>Display FOMO in</label>
          <md-field>
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
      <div class="splitDiv">
        <h6 class="bLabel">Setup Positioning</h6>
        <md-field>
          <md-select name="position" v-model="formData.position">
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
            <md-field :class="{ 'md-invalid': errors.horizontal }">
              <label>Horizontal Position (px)</label>
              <md-input
                v-model="formData.horizontal"
                type="number"
                required
              ></md-input>
              <span class="md-suffix">pixels</span>
              <span class="md-error" v-if="errors.horizontal">{{
                errors.horizontal
              }}</span>
            </md-field>
          </div>
          <div class="form-group display-flex">
            <md-field :class="{ 'md-invalid': errors.vertical }">
              <label>Vertical Position (px)</label>
              <md-input v-model="formData.vertical" type="number"></md-input>
              <span class="md-suffix">pixels</span>
              <span class="md-error" v-if="errors.vertical">{{
                errors.vertical
              }}</span>
            </md-field>
          </div>
        </div>
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
      <div>
        <md-checkbox
          v-model="formData.show_on_exit"
          :true-value="1"
          :false-value="0"
          >Popup will appear if a visitor’s mouse movement shows intent to leave
          your website</md-checkbox
        >
      </div>
      <div>
        <md-field :class="{ 'md-invalid': errors.scroll, 'mt-20': true }">
          <label>Scroll Percentage</label>
          <md-input
            v-model="formData.scroll_percentage"
            type="number"
          ></md-input>
          <span class="md-error" v-if="errors.scroll">{{ errors.scroll }}</span>
        </md-field>
        <small class="text-info display-flex align-items-start">
          <i class="fas fa-info-circle"></i>
          <span>
            Set the percentage a visitor needs to scroll down the page for the
            pop up to appear.
          </span>
        </small>
      </div>
      <div>
        <md-field :class="{ 'md-invalid': errors.delay, 'mt-20': true }">
          <label>Delay Seconds</label>
          <md-input v-model="formData.seconds" type="number"></md-input>
          <span class="md-error" v-if="errors.delay">{{ errors.delay }}</span>
        </md-field>
        <small class="text-info display-flex align-items-start">
          <i class="fas fa-info-circle"></i>
          <span>
            Set the number of seconds a visitor needs to be on your webpage
            before the pop up appears
          </span>
        </small>
      </div>
    </div>
    <div class="topControl formSubmit">
      <md-button class="md-raised" @click.prevent="close">Close</md-button>
      <md-button
        class="md-raised md-accent"
        :disabled="Object.keys(errors).length > 0"
        @click.prevent="handleSave"
        >Save</md-button
      >
    </div>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "FomoDisplaySetup",
  props: ["data", "content", "close", "save"],
  components: { Multiselect },
  mixins: ["createFormData"],
  data: function() {
    return {
      formData: { ...this.data },
      errors: {}
    };
  },
  watch: {
    formData: {
      deep: true,
      handler: function(val) {
        `${val.horizontal}`.length && val.horizontal >= 0
          ? delete this.errors["horizontal"]
          : (this.errors.horizontal = "Invalid input");

        `${val.vertical}`.length && val.vertical >= 0
          ? delete this.errors["vertical"]
          : (this.errors.vertical = "Invalid input");

        val.seconds >= 0
          ? delete this.errors["delay"]
          : (this.errors.delay = "Invalid input");

        val.scroll_percentage >= 0
          ? delete this.errors["scroll"]
          : (this.errors.scroll = "Invalid input");
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
    handleSave: function() {
      const { allowed_countries: ac } = this.formData;
      const params = {
        ...this.formData,
        allowed_countries:
          typeof ac == "object" ? ac.map(i => i.value).join() : ac
      };
      console.log(params);
      this.save(params);
    }
  }
};
</script>
<style lang="less" scoped>
.md-field .md-error {
  left: auto;
  right: 0;
}
.bLabel {
  font-size: 1.2em;
  font-weight: 600;
  color: #fff;
  margin: 0;
  background: var(--main-blue);
  padding: 20px;
  margin: -20px -20px 0;
  border-bottom: 1px solid var(--stroke-grey);
  &.noBG {
    background: none;
    color: var(--main-blue);
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
    padding-bottom: 0.4em;
    font-size: 1.1em;
  }
}
.splitDiv {
  width: 49%;
  border: 1px solid var(--stroke-grey);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  background: #fff;
  padding: 20px;

  @media only screen and (max-width: 599px) {
    width: 100%;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.fullDiv {
  border: 1px solid var(--stroke-grey);
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
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
