<template>
  <div>
    <div v-if="fomoInputs">
      <div class="fixedHeaderBlock">
        <div class="fixedHeaderBlockInner">
          <div class="linkBackBlock">
            <router-link class="link-back" to="/view/fomo">
              <i class="fa fa-long-arrow-left"
                ><md-tooltip md-direction="right">Back</md-tooltip></i
              >
            </router-link>
            <div class="title">
              <md-icon class="icon">
                <i :class="`fomoIcon icon_${fomoType}`"></i>
              </md-icon>
              <span>{{ fomoInputs.name }}</span>
            </div>
          </div>
          <div>
            <label for="c" class="can-toggle" @click.prevent="handlePublish"
              ><input
                type="checkbox"
                id="c"
                name="mainSwitch"
                :checked="fomoInputs.status === 1"
              />
              <div
                class="can-toggle__switch"
                data-checked="Active"
                data-unchecked="Paused"
              ></div>
            </label>
            <router-link :to="`/view/fomo/templates/${fomoId}`">
              <md-button class="md-raised">Change template</md-button>
            </router-link>
            <md-button
              class="md-raised md-accent"
              :disabled="Object.keys(hasError).length > 0 || secondaryError"
              @click.prevent="handleSave(false)"
              >Save</md-button
            >
          </div>
        </div>
      </div>

      <div class="editTemplate">
        <div class="settingsBlock">
          <md-tabs
            class="tabMain"
            :md-active-tab="mainActiveTab"
            @md-changed="setMainActiveTab"
          >
            <md-tab id="tab-template" md-label="Template Settings">
              <div>
                <div class="subTitle">
                  <h3>FOMO Name</h3>
                </div>
                <div class="relative">
                  <input
                    class="form-control"
                    type="text"
                    maxlength="200"
                    v-model="fomoInputs.name"
                    @keyup="
                      checkforError(
                        { required: 1, value: fomoInputs.name },
                        'fomoName'
                      )
                    "
                  />
                </div>
                <small v-if="hasError['fomoName']" class="fieldError">
                  This field cannot be empty
                </small>
              </div>
              <md-tabs
                :class="
                  `fomo-tabs ${
                    fomoInputs &&
                    fomoInputs.template_settings['settings'].length < 2
                      ? 'no-label'
                      : ''
                  }`
                "
                @md-changed="setActiveTab"
              >
                <md-tab
                  v-for="(item, key) in fomoInputs.template_settings.settings"
                  :key="key"
                  :id="item.type"
                  :md-label="item.label"
                >
                  <div v-if="item.attributes">
                    <div
                      class="item-types"
                      v-for="(control, name, index) in item.attributes"
                      :key="index"
                    >
                      <div v-if="control.type == 'text'">
                        <div class="subTitle">
                          <h3>
                            {{ control.label }}
                          </h3>
                          <CustomVariables
                            v-if="control.show_dynamic_variables"
                            :data="dVars"
                            :name="name"
                            :index="key"
                            :click="appendVarToKey"
                          />
                        </div>
                        <div class="relative">
                          <input
                            class="form-control"
                            type="text"
                            maxlength="200"
                            :ref="`${key}-${name}`"
                            v-model="control.value"
                            @keyup="checkforError(control, name)"
                          />
                          <label
                            :for="`view-${key}-${name}`"
                            :class="
                              `showHide fas fa-eye${
                                control.status == 0 ? '-slash' : ''
                              }`
                            "
                            @click="control.status == 0 ? 1 : 0"
                          >
                            <input
                              type="checkbox"
                              :true-value="1"
                              :false-value="0"
                              v-model="control.status"
                              :id="`view-${key}-${name}`"
                            />
                          </label>
                        </div>
                        <small v-if="hasError[name]" class="fieldError">
                          This field cannot be empty
                        </small>
                      </div>
                      <div v-if="control.type == 'textarea'">
                        <div class="subTitle">
                          <h3>
                            {{ control.label }}
                          </h3>
                          <CustomVariables
                            v-if="control.show_dynamic_variables"
                            :data="dVars"
                            :name="name"
                            :index="key"
                            :click="appendVarToKey"
                          />
                        </div>
                        <div class="relative">
                          <quillEditor
                            v-model="control.value"
                            :options="eOptions"
                            @focus="onEditorFocus($event, name)"
                            @change="onEditorChange($event, control, name)"
                            :ref="`${key}-${name}`"
                          ></quillEditor>
                          <label
                            :for="`view-${key}-${name}`"
                            :class="
                              `showHide fas fa-eye${
                                control.status == 0 ? '-slash' : ''
                              }`
                            "
                            @click="control.status == 0 ? 1 : 0"
                          >
                            <input
                              type="checkbox"
                              :true-value="1"
                              :false-value="0"
                              v-model="control.status"
                              :id="`view-${key}-${name}`"
                            />
                          </label>
                        </div>
                        <small v-if="hasError[name]" class="fieldError">
                          This field cannot be empty
                        </small>
                      </div>
                      <div v-if="control.type == 'file'">
                        <div class="subTitle">
                          <h3>
                            {{ control.label }}
                            <i class="fas fa-question-circle"
                              ><md-tooltip md-direction="right"
                                >Supported file formats: JPEG, PNG</md-tooltip
                              ></i
                            >
                          </h3>
                        </div>
                        <div class="relative">
                          <ImgUploadPreview
                            :id="`${key}-${name}`"
                            :handleFileChange="
                              e => handleImgChange(e, key, name)
                            "
                            :data="control"
                          />
                          <label
                            :for="`view-${key}-${name}`"
                            :class="
                              `showHide fas fa-eye${
                                control.status == 0 ? '-slash' : ''
                              }`
                            "
                            @click="control.status == 0 ? 1 : 0"
                          >
                            <input
                              type="checkbox"
                              :true-value="1"
                              :false-value="0"
                              v-model="control.status"
                              :id="`view-${key}-${name}`"
                            />
                          </label>
                        </div>
                      </div>
                      <div v-if="control.type == 'color'" class="colorPick">
                        <div class="subTitle">
                          <h3>{{ control.label }}</h3>
                        </div>
                        <ColorPicker
                          :color="control.value"
                          v-on:input="e => (control.value = e)"
                        ></ColorPicker>
                      </div>
                    </div>
                  </div>
                </md-tab>
              </md-tabs>
            </md-tab>
            <md-tab
              id="tab-reward"
              md-label="Reward Settings"
              :md-disabled="fomoInputs['reward_settings'].length == 0"
            >
              <FomoSetupReward
                :formData="fomoInputs.reward_settings"
                :updateSecondaryError="updateSecondaryError"
                :content="fomoClanData"
                v-if="Object.keys(fomoInputs.reward_settings).length"
              />
            </md-tab>
            <md-tab id="tab-display" md-label="Display Settings">
              {{ fomoInputs["display_settings"].length }}
              <FomoSetupDisplay
                :formData="fomoInputs.display_settings"
                :automatic="fomoInputs.is_automatic"
                :updateAutomatic="updateAutomatic"
                :updateSecondaryError="updateSecondaryError"
                :content="fomoClanData"
                v-if="Object.keys(fomoInputs.display_settings).length"
              />
            </md-tab>
          </md-tabs>
        </div>
        <div class="preview_block">
          <div class="preview_block-title">
            <h2>Fomo Preview</h2>
            <div class="previewBlockBtn">
              <md-button
                class="md-raised btn-default"
                v-on:click="embedCode = !embedCode"
                >Embed</md-button
              >
            </div>
          </div>
          <div class="preview_block-template">
            <am-fomo v-if="fomoReady" :preview="dataForPreview"></am-fomo>
          </div>
          <div class="embed_visible" v-if="embedCode">
            <div class="title">
              <h3>Embed FOMO</h3>
              <md-button class="md-raised btn-default" @click="doCopy"
                >Copy</md-button
              >
            </div>
            <div class="iframe-block">
              <pre>
                {{ copyCode }}
              </pre>
            </div>
            <p>
              By embedding our program on your site, you are agreeing to our API
              Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Vue from "vue";
import Axios from "axios";
import ColorPicker from "@/components/ColorPicker.vue";
import CustomVariables from "@/components/CustomVariables.vue";
import ImgUploadPreview from "@/components/ImgUploadPreview.vue";
import FomoSetupDisplay from "@/components/fomo/FomoSetupDisplay.vue";
import FomoSetupReward from "@/components/fomo/FomoSetupReward.vue";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor"; // require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { mapMutations, mapState } from "vuex";

var Parchment = Quill.import("parchment");
var Delta = Quill.import("delta");
let Break = Quill.import("blots/break");
let Embed = Quill.import("blots/embed");
var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "normal",
  "0.3em",
  "0.5em",
  "0.75em",
  "1em",
  "1.25em",
  "1.5em",
  "1.75em",
  "2em",
  "2.25em",
  "2.5em",
  "2.75em",
  "3em"
];
Quill.register(Size, true);
function lineBreakMatcher() {
  var newDelta = new Delta();
  newDelta.insert({ break: "" });
  return newDelta;
}
var options = {
  modules: {
    clipboard: {
      matchers: [["BR", lineBreakMatcher]]
    },
    keyboard: {
      bindings: {
        handleEnter: {
          key: 13,
          handler: function(range, context) {
            if (range.length > 0) {
              this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
            }
            let lineFormats = Object.keys(context.format).reduce(function(
              lineFormats,
              format
            ) {
              if (
                Parchment.query(format, Parchment.Scope.BLOCK) &&
                !Array.isArray(context.format[format])
              ) {
                lineFormats[format] = context.format[format];
              }
              return lineFormats;
            },
            {});
            var previousChar = this.quill.getText(range.index - 1, 1);
            // Earlier scroll.deleteAt might have messed up our selection,
            // so insertText's built in selection preservation is not reliable
            this.quill.insertText(
              range.index,
              "\n",
              lineFormats,
              Quill.sources.USER
            );
            if (previousChar == "" || previousChar == "\n") {
              this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
            } else {
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
            this.quill.selection.scrollIntoView();
            Object.keys(context.format).forEach(name => {
              if (lineFormats[name] != null) return;
              if (Array.isArray(context.format[name])) return;
              if (name === "link") return;
              this.quill.format(name, context.format[name], Quill.sources.USER);
            });
          }
        },
        linebreak: {
          key: 13,
          shiftKey: true,
          handler: function(range) {
            var nextChar = this.quill.getText(range.index + 1, 1);
            this.quill.insertEmbed(range.index, "break", true, "user");
            if (nextChar.length == 0) {
              // second line break inserts only at the end of parent element
              this.quill.insertEmbed(range.index, "break", true, "user");
            }
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }
      }
    },
    toolbar: [
      [
        { indent: "-1" },
        { indent: "+1" },
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { direction: "rtl" },
        {
          size: [
            "normal",
            "0.3em",
            "0.5em",
            "0.75em",
            "1em",
            "1.25em",
            "1.5em",
            "1.75em",
            "2em",
            "2.25em",
            "2.5em",
            "2.75em",
            "3em"
          ]
        },
        { header: [1, 2, 3, 4, 5, 6, false] }
      ],
      [
        { color: [] },
        { background: [] },
        { script: "sub" },
        { script: "super" },
        "bold",
        "italic",
        "underline",
        "strike",
        "link"
      ]
    ]
  }
};

Break.prototype.insertInto = function(parent, ref) {
  Embed.prototype.insertInto.call(this, parent, ref);
};
Break.prototype.length = function() {
  return 1;
};
Break.prototype.value = function() {
  return "\n";
};

export default {
  name: "EditFomo",
  components: {
    ColorPicker,
    ImgUploadPreview,
    quillEditor,
    CustomVariables,
    FomoSetupDisplay,
    FomoSetupReward
  },
  mixins: ["createFormData", "renderTemplate", "getImgUrl", "getApiUrl"],
  props: ["mainTab"],
  data: function() {
    return {
      embedCode: false,
      activeTab: null,
      mainActiveTab: "tab-template",
      quillEditor: {},
      eOptions: options,
      fomoInputs: null,
      copyCode: `<script src="https://unpkg.com/vue" /> \n<script src="./am.js" /> \n<am-fomo id="${this.$route.params.fomoId}" />`,
      hasError: {},
      secondaryError: false,
      dirty: false
    };
  },
  watch: {
    fomoData: function(val, oldVal) {
      if (val !== oldVal)
        this.fomoInputs = JSON.parse(JSON.stringify(this.fomoData));
    },
    fomoInputs: {
      deep: true,
      handler: function(val, oldVal) {
        if (oldVal !== null) {
          this.dirty = true;
        }
      }
    }
  },
  computed: {
    ...mapState([
      "fomoId",
      "fomoType",
      "fomoData",
      "fomoClanData",
      "fomoReady"
    ]),
    dataForPreview() {
      if (!this.fomoInputs) return null;
      let dd = {
        type: this.fomoType,
        id_template: this.fomoData.id_template,
        show_screen: this.activeTab,
        template: {
          position: this.fomoInputs.display_settings.position,
          settings: {}
        }
      };
      this.fomoInputs.template_settings.settings.forEach(data =>
        Object.keys(data.attributes).forEach(key => {
          if ("status" in data.attributes[key]) {
            if (data.attributes[key].status == 1)
              dd.template.settings[key] = data.attributes[key].value;
            else dd.template.settings[key] = null;
          } else {
            dd.template.settings[key] = data.attributes[key].value;
          }
        })
      );
      return JSON.stringify(dd);
    },
    dVars() {
      return this.fomoData
        ? this.fomoData.template_settings.dynamic_variables.split(",")
        : null;
    }
  },
  methods: {
    ...mapMutations([
      "updateFomoId",
      "toggleLoader",
      "updateFomoData",
      "updateApiResponse"
    ]),
    setMainActiveTab: function(e) {
      this.mainActiveTab = e;
    },
    setActiveTab: function(e) {
      this.activeTab = e;
    },
    updateSecondaryError: function(val) {
      this.secondaryError = val;
    },
    updateAutomatic: function() {
      this.fomoInputs.is_automatic = this.fomoInputs.is_automatic == 1 ? 0 : 1;
    },
    doCopy: function() {
      if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", this.copyCode);
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = this.copyCode;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
          return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }
      }
    },
    handleImgChange: function(e, key, name) {
      const file = e.target.files[0];

      if (file) {
        this.toggleLoader(true);
        const url = this.getApiUrl(`S3Uploader/fomoTemplate`);
        let formData = new FormData();
        formData.append("Filedata", file);
        formData.append("id", this.fomoId);
        formData.append("id_template", this.fomoInputs.id_template);
        var msg;
        Axios.post(url, formData)
          .then(({ data }) => {
            if (!data.error) {
              this.fomoInputs.template_settings.settings[key].attributes[
                name
              ].value = data.img_name;
              msg = `<i class="fas fa-check-circle"></i> Uploaded successfully`;
            }
          })
          .catch(err => {
            console.log(err);
            msg = `<i class="fas fa-exclamation-circle"></i> ${err}`;
          })
          .finally(() => {
            this.toggleLoader(false);
            this.updateApiResponse(msg);
          });
      }
    },
    onEditorFocus: function(quill, name) {
      this.quillEditor[name] = quill.selection.savedRange.index;
    },
    onEditorChange: function({ quill }, data, name) {
      this.checkforError(data, name);
      const limit = 3000;
      if (quill.getLength() > limit) {
        quill.deleteText(limit, quill.getLength());
      }
    },
    checkforError: function(data, name) {
      if (Boolean(data.required) && data.value.trim() == "") {
        this.hasError = { ...this.hasError, [name]: true };
      } else {
        delete this.hasError[name];
      }
    },
    appendVarToKey: function(id, name, item) {
      const comp = this.$refs[`${id}-${name}`][0];
      if (comp.classList?.contains("form-control")) {
        const index = comp.selectionStart;
        const text =
          comp.value.slice(0, index) + item + comp.value.slice(index);
        comp.value = text;
        const dataRef = this.fomoData.settings.find(
          item => item.type == this.activeTab
        );
        if (dataRef) dataRef.attributes[name].value = text;
      } else {
        const position = this.quillEditor[name] || 0;
        comp.quill.insertText(position, item);
      }
    },
    handlePublish: function() {
      const url = this.getApiUrl("fomo/updateStatus");
      const params = {
        id: this.fomoId,
        status: this.fomoInputs.status == 0 ? 1 : 0
      };
      this.toggleLoader(true);
      var msg = null;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          if (data.data.status === "success") {
            msg = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
            this.fomoInputs.status = params.status;
            this.updateFomoData({ ...this.fomoData, status: params.status });
          } else {
            msg = `<i class="fas fa-exclamation-circle"></i> ${data.data.message}`;
          }
          this.updateApiResponse(msg);
        })
        .catch(({ error }) => {
          msg = `<i class="fas fa-exclamation-circle"></i> ${error.data.message}`;
          this.updateApiResponse(msg);
          console.log(error);
        })
        .finally(() => this.toggleLoader(false));
    },
    handleSave: function(status) {
      const url = this.getApiUrl(`fomo/updateFOMODetails`);
      this.toggleLoader(true);
      const params = {
        id_fomo: this.fomoId,
        id_template: this.fomoInputs.id_template,
        is_automatic: this.fomoInputs.is_automatic,
        name: this.fomoInputs.name,
        status: status ? 1 : this.fomoInputs.status,
        display_settings: JSON.stringify(this.fomoInputs.display_settings),
        template_settings: JSON.stringify(this.fomoInputs.template_settings)
      };

      if (Object.keys(this.fomoInputs["reward_settings"]).length) {
        params.rewards_settings = JSON.stringify(
          this.fomoInputs.reward_settings
        );
      }
      var msg = null;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          msg = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          this.updateApiResponse(msg);
          this.updateFomoData(this.fomoInputs);
          setTimeout(() => {
            this.dirty = false;
          }, 500);
        })
        .catch(err => console.log(err))
        .finally(() => this.toggleLoader(false));
    }
  },
  mounted: function() {
    if (!window.Vue) {
      window.Vue = Vue;
    }
    if (this.mainTab) {
      this.mainActiveTab = this.mainTab;
    }
    this.fomoInputs = JSON.parse(JSON.stringify(this.fomoData));
    if (this.fomoId !== this.$route.params.fomoid) {
      this.updateFomoId(this.$route.params.fomoid);
    }
    if (!document.querySelector(".am-fomo-script")) {
      const plugin = document.createElement("script");
      plugin.setAttribute("class", "am-fomo-script");
      plugin.setAttribute(
        "src",
        `${Vue.prototype.$asset_url}/assets/js/fomo/am.js`
      );
      plugin.async = true;
      document.head.appendChild(plugin);
    }
  }
};
</script>
<style lang="less" scoped>
.fixedHeaderBlock .fixedHeaderBlockInner {
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .linkBackBlock {
    display: flex;
    align-items: center;
  }

  .title {
    border-right: 1px solid #eaeaea;

    .icon {
      font-size: 15px !important;
    }
  }
  .outline {
    border: 1px solid;
    &.warning {
      color: #ff5252;
    }
  }
  .md-raised {
    border: 1px solid #d5d5d5;
    color: #202020;
    border-radius: 5px;
    box-shadow: none !important;
    text-transform: capitalize;

    &.md-accent {
      border: 0;
      font-weight: bold;
      color: #fff;
    }
  }
}
.tabMain {
  ::v-deep {
    > .md-tabs-content {
      height: auto !important;
    }
    .md-content,
    .md-tabs-navigation {
      background: transparent;
    }
    .md-tabs-navigation {
      border-bottom: 1px solid var(--main-blue);
    }
    .md-button[disabled] {
      opacity: 0;
      display: none;
    }
    .md-tab {
      padding: 0 5px;
    }
  }
}
.fomo-tabs {
  ::v-deep {
    .md-tabs-indicator {
      height: 100%;
    }
    .md-tabs-navigation {
      border: 1px solid var(--main-blue);
      margin-top: 20px;
    }
    .md-active {
      color: #fff !important;
    }
  }
}
.fomo-tabs.no-label {
  ::v-deep {
    .md-tabs-navigation {
      display: none;
    }
  }
}
.relative {
  position: relative;
}
.showHide {
  cursor: pointer;
  position: absolute;
  margin: 7px;
  right: 0;
  top: 0;
  input {
    opacity: 0;
    position: absolute;
  }
}

.editTemplate {
  padding: 3em 50px 4em;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  ::v-deep {
    .vc-chrome {
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 50;
    }
  }

  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    width: 100%;
  }

  .settingsBlock::v-deep {
    flex: 1;
    margin-right: 20px;
    max-width: 33%;
    overflow: hidden;
    .ql-toolbar.ql-snow {
      .ql-picker-options {
        height: 9em;
        overflow: auto;
      }
      .ql-picker.ql-size {
        .ql-picker-item:before {
          content: attr(data-value) !important;
        }
        .ql-picker-label {
          text-indent: -999em;
          position: relative;
          &:before {
            content: attr(data-value) !important;
            position: absolute;
            left: 0;
            top: 0;
            text-indent: 0.3em;
          }
        }
      }
    }
  }

  .subTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .md-checkbox::v-deep {
      margin: 0 5px 0 0;
      .md-checkbox-container {
        width: 15px;
        min-width: 15px;
        height: 15px;
        &:after {
          width: 5px;
          height: 9px;
          left: 3px;
        }
      }
    }
    h3 {
      color: #007aff;
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
    }
    .md-menu {
      line-height: 0.9;
      margin: 10px 0;
    }
  }

  .preview_block {
    flex: 2;
    position: relative;

    .btn-default {
      border: 1px solid #ccc;
      color: #000;
      padding: 5px 15px;
    }

    .btn-preview {
      border: 1px solid #007aff;
      padding: 5px 15px;
      color: #007aff;
      margin-left: 10px;
    }

    .preview_block-title {
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      padding: 10px 20px;
      display: flex;
      background: #fff;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 18px;
        margin: 0;
      }
    }
  }
  .preview_block-template {
    background: #ababab;
    min-height: 620px;
    position: sticky;
    top: 70px;
    overflow: hidden;
    margin-top: 15px;
    border-radius: 4px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
  }
  .embed_visible {
    position: absolute;
    top: 55px;
    background: #fff;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 20px;
    right: 128px;

    p {
      font-size: 11px;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-size: 14px;
        color: #007aff;
      }
    }

    .iframe-block {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 4px;
      width: 100%;
      height: 130px;
      font-size: 12px;
      color: #66788a;
      pre {
        white-space: pre-line;
        margin: 0;
      }
    }

    .link-block {
      margin: 10px 0;

      a {
        font-size: 11px;
        color: #428bca;
        text-decoration: underline;
        margin-right: 10px;
        display: inline-block;

        &:hover {
          color: #2a6496;
          text-decoration: underline;
        }
      }
    }
  }
}
.positioning {
  background: #fff;
  border: 1px solid var(--main-blue);
  margin-top: 20px;
  h6 {
    background-color: var(--main-blue);
    color: #fff;
    font-size: 1.2em;
    padding: 10px 15px;
    margin: 0;
  }
  .md-field {
    margin: 0px 15px 20px;
    width: auto;
  }
}
.can-toggle {
  cursor: pointer;
  margin: 0 10px;
  display: inline-block;
  --can-active: #4fb743;
  --can-paused: #848484;

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    &:checked ~ .can-toggle__switch {
      background-color: var(--can-active);
      &:after {
        content: attr(data-checked);
        transform: translate3d(66px, 0, 0);
        color: var(--can-active);
      }
      &:before {
        content: attr(data-unchecked);
        left: 0;
      }
    }
  }
  .can-toggle__switch {
    font-size: 12px;
    height: 36px;
    width: 135px;
    display: inline-flex;
    position: relative;
    border-radius: 2px;
    transition: background-color 0.3s cubic-bezier(0, 1, 0.5, 1);
    background: var(--can-paused);
    &:before,
    &:after {
      position: absolute;
      text-transform: uppercase;
      text-align: center;
      width: 65px;
    }
    &:before {
      content: attr(data-checked);
      color: rgba(255, 255, 255, 0.5);
      top: 0;
      left: 69px;
      line-height: 3;
    }
    &:after {
      top: 2px;
      left: 2px;
      border-radius: 1px;
      line-height: 2.7;
      content: attr(data-unchecked);
      transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1);
      z-index: 5;
      background: white;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
