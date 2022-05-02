<template>
  <div v-if="widgetData" class="display-inline-flex">
    <md-dialog class="promptConfigDialog" :md-active.sync="promptConfig">
      <md-dialog-title>Prompt configuration</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50">
            <md-field :class="{ 'md-invalid': formErrors.time_duration }">
              <label>Show Time</label>
              <md-input
                type="number"
                v-model="widgetData.attributes.time_duration"
                required
              ></md-input>
              <span class="md-suffix">Seconds</span
              ><span class="md-error" v-if="formErrors.time_duration">{{
                formErrors.time_duration
              }}</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field :class="{ 'md-invalid': formErrors.time_interval }">
              <label>Interval Time</label>
              <md-input
                type="number"
                v-model="widgetData.attributes.time_interval"
                required
              ></md-input>
              <span class="md-suffix">Seconds</span
              ><span class="md-error" v-if="formErrors.time_interval">{{
                formErrors.time_interval
              }}</span>
            </md-field>
          </div>
          <div
            class="md-layout-item md-size-50 display-flex align-items-center"
          >
            <label
              class="switch mr-10"
              data-control="is_looping"
              @click.prevent="handleSwitch"
            >
              <input
                type="checkbox"
                name="mainSwitch"
                :checked="widgetData.attributes.is_looping == 1"
              />
              <i></i>
            </label>
            Enable looping
            <i class="ml-10 fas fa-info-circle" style="color: black">
              <md-tooltip class="customPopupOverTooltipClass"
                >Enable fomos to loop after a cycle completed</md-tooltip
              >
            </i>
          </div>
          <div
            class="md-layout-item md-size-50 display-flex align-items-center"
          >
            <label
              class="switch mr-10"
              data-control="status"
              @click.prevent="handleSwitch"
            >
              <input
                type="checkbox"
                name="mainSwitch"
                :checked="widgetData.attributes.status == 1"
              />
              <i></i>
            </label>
            Enable/Disable widget
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          v-if="widgetData.attributes.status == 1"
          :href="`${callbackUrl}/admin/#/view/widgets/${widgetData.id}`"
          target="_blank"
          class="md-primary"
          >Edit Widget <i class="ml-5 fas fa-external-link mr-0"></i
        ></md-button>
        <md-button class="md-raised" @click="promptConfig = false"
          >Close</md-button
        >
        <md-button
          class="md-raised md-accent"
          :disabled="Object.keys(formErrors).length > 0"
          @click="handleSave"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <i class="configSettingsCta fal fa-cog" @click="promptConfig = true"
      ><md-tooltip>Prompt configuration</md-tooltip></i
    >
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "PromptConfiguration",
  props: ["data", "saveWidgetData"],
  data: function() {
    return {
      promptConfig: false,
      formErrors: {},
      widgetData: null,
      callbackUrl: Vue.prototype.$callback_url || null,
    };
  },
  watch: {
    widgetData: {
      deep: true,
      handler: function(val) {
        var td = val.attributes.time_duration,
          ti = val.attributes.time_interval;
        td > 0
          ? td > 4 && td < 61
            ? delete this.formErrors["time_duration"]
            : (this.formErrors.time_duration = "Must be in range of 5-60")
          : (this.formErrors.time_duration = "Invalid input");

        ti > 0
          ? ti > 4 && ti < 21
            ? delete this.formErrors["time_interval"]
            : (this.formErrors.time_interval = "Must be in range of 5-20")
          : (this.formErrors.time_interval = "Invalid input");
      },
    },
    promptConfig: function(val) {
      if (val) {
        this.widgetData = JSON.parse(JSON.stringify(this.data));
      }
    },
  },
  methods: {
    handleSwitch: function(e) {
      var name = e.currentTarget.dataset.control;
      this.widgetData.attributes[name] = Number(
        !this.widgetData.attributes[name]
      );
    },
    handleSave: async function() {
      var result = await this.saveWidgetData(this.widgetData);
      if (result) this.promptConfig = false;
    },
  },
  mounted: function() {
    this.widgetData = JSON.parse(JSON.stringify(this.data));
  },
};
</script>
<style lang="less">
.customPopupOverTooltipClass {
  z-index: 999999;
}
</style>
<style lang="less" scoped>
.configSettingsCta {
  cursor: pointer;
  color: #000;
  font-size: 1.1em;
  opacity: 0.3;
  line-height: 1;
  margin-left: 1em;
  &:hover {
    opacity: 0.5;
  }
}
p.success {
  width: 100%;
  text-align: center;
  background: lightgreen;
  padding: 1em;
  margin: 0;
}
.promptConfigDialog::v-deep {
  .md-dialog-container {
    width: 100%;
    max-width: 500px;
  }
  .md-dialog-actions {
    padding: 8px 24px 24px;
  }
  .md-input {
    width: 100%;
  }
}
.md-checkbox-label {
  padding-left: 10px;
}
</style>
