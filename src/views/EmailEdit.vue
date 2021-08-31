<template>
  <div>
    <div v-if="eData">
      <div class="email" v-if="editPageView">
        <div class="fixedHeaderBlock">
          <div class="fixedHeaderBlockInner">
            <a class="link-back" @click.prevent="handleBack">
              <i class="fa fa-long-arrow-left"></i
              ><md-tooltip md-direction="right">Back</md-tooltip>
            </a>
            <div class="title">
              <div class="icon far fa-envelope margin-right-10"></div>
              <span>{{ emailTitle }}</span>
            </div>
          </div>
          <div>
            <md-button
              class="md-raised"
              :disabled="disableTest"
              @click.prevent="sendTestEmail"
              >Sent Test Email</md-button
            >
            <md-button
              @click.prevent="togglePageview"
              class="md-raised md-accent"
              >Change Template</md-button
            >
            <md-button @click.prevent="handleSave" class="md-raised md-accent"
              >Save</md-button
            >
          </div>
        </div>
        <div class="upgradeBlock" v-if="showWlMsg == 0">
          <p>
            Would you like to upgrade to our premium services? Have your own
            branding
          </p>
          <md-button href="#/plan" class="md-raised btnUpgrade"
            >Upgrade now</md-button
          >
          <md-button @click.prevent="showWlMsg = 1" class="md-raised btnNotnow"
            >Not now</md-button
          >
        </div>

        <div class="container editWrap">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-45">
              <h3 class="bodyHead">Subject for your Email</h3>
              <div class="subjectEditor">
                <div class="subTitle">
                  <CustomVariables
                    :data="dVars"
                    index="subject"
                    name="subject"
                    :click="appendVarToKey"
                  />
                </div>
                <input type="text" ref="subject" v-model="eData.subject" />
              </div>
              <h3 class="bodyHead">Body for your Email</h3>
              <div class="eAccordion">
                <draggable
                  v-model="eData.json_fields"
                  handle=".handle"
                  v-bind="dragOptions"
                  @start="isDragging = true"
                  @end="isDragging = false"
                >
                  <transition-group name="flip-list">
                    <div
                      :class="[
                        'eAccordion-items',
                        { active: activeAccordion == key }
                      ]"
                      v-for="(item, key) in eData.json_fields"
                      :key="key"
                    >
                      <div
                        v-if="item.data && item.name !== 'footer'"
                        class="eAccordion-title"
                        @click.prevent="
                          e => item.data.length !== 0 && toggleAccordion(key)
                        "
                      >
                        <i
                          v-if="item.data.length !== 0"
                          class="fas fa-arrows-alt handle"
                          ><md-tooltip md-direction="right"
                            >Shift order</md-tooltip
                          ></i
                        >
                        <span class="title"> {{ item.label }} </span>
                        <nav v-if="item.data.length !== 0">
                          <a
                            v-if="item.clone"
                            v-on:click.stop.prevent="
                              promptAction = { type: 'Clone', key: key }
                            "
                            href="#"
                            ><i class="fal fa-clone"></i
                            ><md-tooltip md-direction="left"
                              >Clone</md-tooltip
                            ></a
                          >
                          <a
                            v-if="item.clone"
                            v-on:click.stop.prevent="
                              promptAction = { type: 'Delete', key: key }
                            "
                            href="#"
                            ><i class="fal fa-trash-alt"></i>
                            <md-tooltip md-direction="left"
                              >Delete</md-tooltip
                            ></a
                          >
                          <i class="far fa-chevron-right"></i>
                        </nav>
                      </div>

                      <div class="eAccordion-content">
                        <div v-if="item.data">
                          <div
                            class="item-types"
                            v-for="(control, name, index) in item.data"
                            :key="index"
                          >
                            <div v-if="control.type == 'text'">
                              <div class="subTitle">
                                <h3>{{ control.label }}</h3>
                                <CustomVariables
                                  v-if="control.show_dynamic_variables"
                                  :data="dVars"
                                  :name="name"
                                  :index="key"
                                  :click="appendVarToKey"
                                />
                              </div>
                              <input
                                class="form-control"
                                type="text"
                                :ref="`${key}-${name}`"
                                v-model="control.value"
                              />
                            </div>
                            <div v-if="control.type == 'textarea'">
                              <div class="subTitle">
                                <h3>{{ control.label }}</h3>
                                <CustomVariables
                                  v-if="control.show_dynamic_variables"
                                  :data="dVars"
                                  :name="name"
                                  :index="key"
                                  :click="appendVarToKey"
                                />
                              </div>
                              <quillEditor
                                v-model="control.value"
                                :options="eOptions"
                                @focus="onEditorFocus($event, name)"
                                :ref="`${key}-${name}`"
                              ></quillEditor>
                            </div>
                            <div v-if="control.type == 'file'">
                              <div class="subTitle">
                                <h3>{{ control.label }}</h3>
                              </div>
                              <div class="uploadWrap">
                                <label
                                  class="md-button md-raised md-accent md-theme-default"
                                  :for="`${key}-${name}`"
                                >
                                  <i class="fal fa-upload"></i>
                                  <span v-if="control.value.length > 0"
                                    >Replace Image</span
                                  >
                                  <span v-else>Add Image</span>
                                  <input
                                    :id="`${key}-${name}`"
                                    type="file"
                                    accept="image/*"
                                    @change="
                                      e => handleFileChange(e, key, name)
                                    "
                                  />
                                </label>
                                <img
                                  v-if="control.value.length > 0"
                                  :src="control.value"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div v-if="control.type == 'color'">
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
                      </div>
                    </div>
                  </transition-group>
                </draggable>
                <div
                  v-if="footerSection"
                  :class="[
                    'eAccordion-items',
                    'eAccordion-footer',
                    { active: activeAccordion == 'footer' && isWl == 1 }
                  ]"
                >
                  <div
                    class="eAccordion-title"
                    @click.prevent="
                      e =>
                        footerSection.data.length !== 0 &&
                        isWl == 1 &&
                        toggleAccordion('footer')
                    "
                  >
                    <span class="title">
                      {{ footerSection.label }}
                    </span>
                    <nav v-if="isWl == 1">
                      <i class="far fa-chevron-right"></i>
                    </nav>
                  </div>
                  <div class="eAccordion-content" v-if="isWl == 1">
                    <div>
                      <div
                        class="item-types"
                        v-for="(control, name, index) in footerSection.data"
                        :key="index"
                      >
                        <div v-if="control.type == 'checkbox'">
                          <div class="subTitle">
                            <h3 style="display: flex; align-items: center">
                              <label
                                class="switch"
                                style="margin-right: 10px"
                                title="Update status"
                                for="footer"
                                @click.prevent="
                                  e => {
                                    if (control.value === 1) {
                                      control.value = 0;
                                      handleWlImg(true);
                                    } else {
                                      control.value = 1;
                                      handleWlImg(false);
                                    }
                                  }
                                "
                              >
                                <input
                                  type="checkbox"
                                  name="mainSwitch"
                                  :checked="control.value == 1"
                                  id="footer"
                                />
                                <i></i>
                              </label>
                              {{ control.label }}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="panelBlock">
                <h3>Would you like to change</h3>
                <md-button
                  @click.prevent="togglePageview"
                  class="md-raised md-accent"
                  >Change Template</md-button
                >
              </div> -->
              <div class="panelBlock resetPanel">
                <h3>Reset template to defaults</h3>
                <md-button
                  size="small"
                  v-on:click.stop.prevent="promptAction = { type: 'Reset' }"
                  class="md-raised md-accent"
                  >Reset</md-button
                >
              </div>
            </div>

            <div class="md-layout-item md-size-55">
              <div class="previewBlock">
                <div class="emailTemplate">
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tr>
                      <td>
                        <table
                          bgcolor="#fff"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="550"
                        >
                          <PreviewRenderer
                            v-for="(block, index) in eData.json_fields"
                            :handleClick="
                              e =>
                                (activeAccordion =
                                  block.name == 'footer' ? 'footer' : index)
                            "
                            :active="activeAccordion === index"
                            :key="index"
                            :tData="block.data"
                            :tHtml="eData.templates[block.name]"
                            :name="block.name"
                          />
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <md-snackbar
              class="msgSnack"
              md-position="center"
              :md-active.sync="showMsg"
              md-persistent
            >
              <span v-html="emailResponse"></span>
            </md-snackbar>
            <md-dialog-confirm
              :class="[{ warn: promptAction.type == 'Reset' }]"
              :md-active.sync="promptAction"
              :md-title="
                `${promptAction.type} ${
                  promptAction.type == 'Reset' ? 'Template' : 'Section'
                }`
              "
              :md-content="
                `Are you sure, Do you wish to ${promptAction.type} this ${
                  promptAction.type == 'Reset' ? 'template' : 'section'
                }`
              "
              md-confirm-text="Confirm"
              md-cancel-text="Cancel"
              @md-cancel="e => (promptAction = null)"
              @md-confirm="confirmAction"
            /><md-dialog-confirm
              :md-active.sync="footerAction"
              md-title="Change this in the Languages tab"
              md-content="This is a global change and it should be done in the languages tab"
              md-confirm-text="Take me there"
              md-cancel-text="I'll do it later"
              @md-cancel="() => (footerAction = false)"
              @md-confirm="gotoLanguageTab"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <EmailTemplates
          :data="allData"
          :activeThemeId="activeThemeId"
          :close="togglePageview"
          :save="handleChooseTemplate"
          :fromEditPage="fromEditPage"
          :title="emailTitle"
        />
      </div>
    </div>
    <Loader :status="loader" />
  </div>
</template>
<script>
import Axios from "axios";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor"; // require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ColorPicker from "../components/ColorPicker.vue";
import CustomVariables from "../components/CustomVariables.vue";
import EmailTemplates from "./EmailTemplates.vue";
import Loader from "@/components/Loader.vue";
import PreviewRenderer from "@/components/PreviewRenderer.vue";
import draggable from "vuedraggable";

var Parchment = Quill.import("parchment");
var Delta = Quill.import("delta");
let Break = Quill.import("blots/break");
let Embed = Quill.import("blots/embed");
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
        { size: ["small", false, "large", "huge"] },
        { header: [1, 2, 3, 4, 5, 6, false] }
      ],
      [
        { color: [] },
        { background: [] },
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
  name: "EmailEdit",
  components: {
    ColorPicker,
    CustomVariables,
    EmailTemplates,
    Loader,
    quillEditor,
    PreviewRenderer,
    draggable
  },
  mixins: ["createFormData", "renderTemplate"],
  data: function() {
    return {
      isWl: 1,
      showWlMsg: 1,
      editPageView: false,
      id: this.$route.params.emailId,
      eData: null,
      allData: null,
      activeThemeId: null,
      activeThemeHtml: null,
      activeAccordion: null,
      emailTitle: null,
      emailType: null,
      dVars: null,
      quillEditor: {},
      eOptions: options,
      showMsg: false,
      emailResponse: null,
      loader: false,
      fromEditPage: false,
      disableTest: false,
      promptAction: false,
      footerAction: false
    };
  },
  watch: {
    activeAccordion: function(index) {
      let active = null;
      if (index == "footer")
        active = document.querySelector(".eAccordion-footer");
      else active = document.querySelectorAll(".eAccordion-items")[index];
      if (active) {
        setTimeout(() => {
          const ele = active.querySelector(".eAccordion-content");
          ele.focus();
        }, 500);
      }
    },
    eData: {
      deep: true,
      handler: function(val, oldVal) {
        if (oldVal !== null) this.disableTest = true;
      }
    },
    showMsg: function() {
      if (this.showMsg) {
        setTimeout(() => (this.showMsg = false), 4000);
      }
    }
  },
  computed: {
    footerSection() {
      return this.eData.json_fields.find(item => item.name === "footer");
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    setEdata: function(id) {
      this.eData = this.allData.find(({ id_theme }) => id_theme == id);
      this.disableTest = false;
    },
    toggleAccordion: function(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index;
    },
    togglePageview: function() {
      if (!this.editPageView) this.fromEditPage = true;
      this.editPageView = !this.editPageView;
    },
    onEditorFocus: function(quill, name) {
      this.quillEditor[name] = quill.selection.savedRange.index;
    },
    handleWlImg: function(status) {
      const footerimg = document.querySelector(".footerWlImage");
      console.log(footerimg);
      if (status) footerimg.classList.add("hide");
      else footerimg.classList.remove("hide");
    },
    handleFileChange: function(e, index, name) {
      console.log(index);
      const file = e.target.files[0];
      this.loader = true;
      let formData = new FormData();
      formData.append("Filedata", file);
      formData.append("suffix", name);
      formData.append("id_template", 1);

      Axios.post(
        `${window.Config.callback_url}/S3Uploader/emailTemplate`,
        formData
      )
        .then(({ data }) => {
          this.loader = false;
          if (!data.error) {
            this.eData.json_fields[index].data[name].value =
              "https://cdn.devam.pro/gr/master/" + data.img_name;
          } else {
            this.emailResponse = `<i class="fas fa-exclamation-circle"></i> Uploaded successfully`;
            this.showMsg = true;
          }
        })
        .catch(({ data }) => {
          this.loader = false;
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
          this.showMsg = true;
        });
    },
    appendVarToKey: function(id, name, item) {
      if (name == "subject") {
        const value = this.eData.subject;
        const index = this.$refs["subject"].selectionStart;
        const text = value.slice(0, index) + item + value.slice(index);
        this.eData.subject = text;
        this.$refs["subject"].value = text;
      } else {
        const { type, value } = this.eData.json_fields[id].data[name];
        if (type == "textarea") {
          const position = this.quillEditor[name] || 0;
          this.$refs[`${id}-${name}`][0].quill.insertText(position, item);
        } else {
          const index = this.$refs[`${id}-${name}`][0].selectionStart;
          const text = value.slice(0, index) + item + value.slice(index);
          this.eData.json_fields[id].data[name].value = text;
          this.$refs[`${id}-${name}`][0].value = text;
        }
      }
    },
    handleChooseTemplate: function(id) {
      this.setEdata(id);
      this.togglePageview();
    },
    handleSave: function() {
      this.loader = true;

      const { id_theme, subject, json_fields } = this.eData;

      const params = {
        id_email: this.id,
        subject: subject,
        id_theme: id_theme,
        type: this.emailType,
        is_enabled: 1,
        json_fields: JSON.stringify(json_fields)
      };

      Axios.post(
        `${window.Config.callback_url}/services/email/saveEmailTemplate`,
        this.createFormData(params)
      )
        .then(({ data, status }) => {
          this.loader = false;
          if (status == 200) {
            this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
            this.fetchTemplateData();
          } else
            this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
          this.showMsg = true;
          this.disableTest = false;
        })
        .catch(() => {
          this.loader = false;
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> Something went wrong`;
          this.showMsg = true;
        });
    },
    sendTestEmail: function() {
      this.loader = true;
      Axios.post(
        `${window.Config.callback_url}/services/email/sendTestEmail`,
        this.createFormData({ id_email: this.id })
      ).then(({ data, status }) => {
        this.loader = false;
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> An email has been sent to ${data.mail_to}`;
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> There was an error sending mail to ${data.mail_to}`;
        this.showMsg = true;
      });
    },
    resetTemplate: function() {
      this.loader = true;
      Axios.post(
        `${window.Config.callback_url}/services/email/resetEmailTemplate`,
        this.createFormData({
          id_email: this.id,
          id_theme: this.eData.id_theme
        })
      ).then(res => {
        if (res.status == 200) {
          this.fetchTemplateData();
          this.emailResponse = `<i class="fas fa-check-circle"></i> Template reset successfully`;
        } else {
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> There was an error in resetting`;
          this.loader = true;
        }
        this.showMsg = true;
      });
    },
    fetchTemplateData: function() {
      this.loader = true;
      this.eData = null;
      Axios.get(
        `${window.Config.callback_url}/services/email/getEmailTemplate/${this.id}`
      ).then(({ data }) => {
        const {
          active_id_theme,
          dynamic_variables,
          themes,
          is_wl,
          title,
          type
        } = data.data;
        this.dVars = dynamic_variables.split(",");
        this.allData = themes;
        this.isWl = is_wl;
        this.showWlMsg = is_wl;
        this.activeThemeId = active_id_theme;
        this.emailTitle = title;
        this.emailType = type;
        this.setEdata(active_id_theme);
        this.loader = false;
      });
    },
    handleBack: function() {
      window.history.back();
    },
    cloneBlock: function(index) {
      let jFields = [...this.eData.json_fields];
      jFields.splice(index + 1, 0, JSON.parse(JSON.stringify(jFields[index])));
      this.eData = { ...this.eData, json_fields: jFields };
    },
    deleteBlock: function(index) {
      let jFields = [...this.eData.json_fields];
      jFields.splice(index, 1);
      this.eData = { ...this.eData, json_fields: jFields };
    },
    confirmAction: function() {
      if (this.promptAction.type == "Clone")
        this.cloneBlock(this.promptAction.key);
      else if (this.promptAction.type == "Delete")
        this.deleteBlock(this.promptAction.key);
      else this.resetTemplate();

      this.promptAction = false;
    },
    showReloadAlert: function(e) {
      if (this.disableTest) {
        e.returnValue = "Are you sure you want to exit?";
      }
    },
    triggerFooterListener: function() {
      this.footerAction = true;
    },
    gotoLanguageTab: function() {
      console.log(`${window.Config.callback_url}/admin/#/view/locales`);
      window.location.href = `${window.Config.callback_url}/admin/#/view/locales`;
    }
  },
  mounted: function() {
    this.fetchTemplateData();
    window.addEventListener("beforeunload", this.showReloadAlert);
    // const ft = document.querySelector(".emailFooterTxt");
  },
  updated: function() {
    const emailFooter = document.querySelector(".emailFooterTxt");
    if (emailFooter)
      emailFooter.addEventListener("click", this.triggerFooterListener);
  }
};
</script>
<style lang="less" scoped>
.editWrap {
  padding-top: 50px;
}
.upgradeBlock {
  background: #ed941f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  p {
    font-size: 13px;
    color: #fff;
    margin: 0;
  }

  .btnUpgrade {
    margin: 0 10px 0 20px;
    text-decoration: none;
  }

  .btnNotnow {
    border: 1px solid #fff;
    color: #fff !important;
    background: transparent !important;
  }
}

.panelBlock {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  padding: 10px;
  flex-direction: column;

  h3 {
    color: #007aff;
    margin-top: 0;
    font-size: 16px;
  }
  &.resetPanel {
    h3 {
      font-size: 14px;
    }
    button {
      height: auto;
      padding: 4px 8px;
    }
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
    color: #fff !important;
  }
}

.email {
  margin: 0 0 7em 0;
  .color-picker .color-picker-container {
    position: relative;
    right: 30px;
    top: 8px;
    padding: 0px;
    margin: 0;
    z-index: 12;
    vertical-align: baseline;
    background: none;
    border: none;
    display: inline;
    .vc-chrome {
      position: relative;
      right: -30px;
      top: -8px;
    }
  }

  .md-list {
    padding: 0;
  }
  .editorContent {
    padding: 20px;
  }

  .subTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #007aff;
      font-size: 14px;
    }
  }

  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    width: 100%;
  }

  .previewBlock {
    background: #fff;
    border: 1px solid #e8e8e8;
  }
}
.bodyHead {
  color: #007aff;
  margin-top: 2em;
}
.subjectEditor {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #e8e8e8;
  margin: 0 0 20px;
  span {
    display: block;
    color: #007aff;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    padding-bottom: 10px;
  }
  input[type="text"] {
    border: 1px solid #dcdcdc;
    color: #484848;
    font-size: 15px;
    line-height: 18px;
    width: 100%;
    padding: 10px;
  }
  .subTitle {
    justify-content: flex-end;
  }
}
.emailTemplate {
  width: 100%;
  min-height: 600px;
  background-color: #ddefef;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  line-height: initial;

  & > div {
    background: #fff;
  }
}
.subHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
  }
}
.uploadWrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    max-width: 50%;
    margin: 20px auto 0;
  }
}
</style>

<style lang="less">
:root {
  --md-theme-default-accent: #5bb74d !important;
}
.quill-editor {
  background-color: #fff;
}
.ql-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ql-formats {
    margin-right: 10px;
  }
}
.md-overlay {
  z-index: 10000;
}
.md-dialog {
  z-index: 10001;
}
.previewBlock a {
  pointer-events: none;
}
.hide {
  display: none !important;
}
.flip-list-move {
  transition: transform 5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.md-button {
  text-transform: capitalize;
  padding: 0 10px;
  border-radius: 4px;
  box-shadow: none !important;
  margin: 0;

  i {
    margin-right: 10px;
  }
}

.btn-custom-default {
  border: 1px solid #005dff;
  color: #005dff !important;
  background: transparent !important;
}
.btn-custom-active {
  color: #fff !important;
}
.md-list {
  border: 1px solid #e8e8e8;
  --vsa-highlight-color: #d2d2d2;

  &--is-active .vsa-item__heading,
  .md-list-item:not(:last-of-type) {
    border-bottom: 1px solid #e8e8e8;
  }

  .md-list-item-text {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 10px;
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
    nav {
      width: auto;
      display: flex;
      a {
        margin-left: 5px;
      }
    }
  }
  .md-list-expand-icon {
    margin-left: 0 !important;
  }
  .md-list-item-expand.md-active .md-list-expand {
    padding: 10px;
  }
}
.eAccordion {
  display: flex;
  background-color: #fff;
  flex-direction: column;
  &-title {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #e8e8e8;
    position: relative;
    transition: background-color 0.5s;
    nav {
      display: flex;
      align-items: center;
      padding-right: 5px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      a {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s;
      }
      i {
        margin: 0 5px;
        transition: transform 0.5s;
      }
    }
    i.fa-arrows-alt {
      cursor: grab;
    }
    &:hover a {
      opacity: 1;
      pointer-events: auto;
    }
  }
  &-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.8s, background-color 0.5s;
    > div {
      border: 1px solid #e8e8e8;
      padding: 10px;
    }
  }
  &-items {
    &.active {
      .eAccordion-content {
        max-height: 2000px;
        background-color: #efefef;
        > div {
          border-color: #afafaf;
        }
      }
      .eAccordion-title {
        border-color: #afafaf;
        background-color: #bfbfbf;
        .fa-chevron-right {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
