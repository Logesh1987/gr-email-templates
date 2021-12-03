<template>
  <div class="embedEdit">
    <div class="fixedTopNav">
      <div class="level1">
        <span class="material-icons" @click.prevent="handleBack"
          >arrow_back</span
        >
        <span>Embed Campaign</span>
      </div>
      <div class="topCta">
        <md-button class="md-raised" @click.prevent="sendTestEmail"
          >Sent Test Email</md-button
        >
        <md-button @click.prevent="handleSave" class="md-raised md-accent"
          >Save</md-button
        >
      </div>
    </div>

    <div class="editWrap">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30">
          <md-toolbar md-elevation="0" class="md-dense">
            <div class="toolbarWrapper">
              <div class="leftSide">
                <md-icon class="fa fa-palette paintIcon"></md-icon>
                <h3 class="md-title">Basic Settings</h3>
              </div>
              <div class="rightSide">
                <div class="collapseAll">CollapseAll</div>
              </div>
            </div>
          </md-toolbar>
          <draggable
            tag="md-list"
            v-bind="dragOptions"
            v-model="settingSection"
            @start="drag = true"
            @end="drag = false"
            handle=".dragHandle"
          >
            <md-list-item
              md-expand
              :md-expanded="key == 0"
              v-for="(item, key) in settingSection"
              :key="key"
            >
              <div class="listHeader">
                <div class="leftSide">
                  <md-icon
                    class="fa fa-bars dragHandle"
                    v-if="item.isDragable"
                  ></md-icon>
                  <span class="md-list-item-text">{{ item.label }}</span>
                </div>
                <div class="rightSide">
                  <md-switch
                    class="md-primary"
                    v-model="item.isActive"
                  ></md-switch>
                </div>
              </div>
              <div slot="md-expand" class="listContent">
                <div
                  v-for="(control, keyName) in item.attributes"
                  :key="keyName"
                >
                  <div
                    class="imageUploadContainer"
                    v-if="control.type == 'file'"
                  >
                    <h5>{{ control.label }}</h5>
                    <ImgUploadPreview
                      :id="`${key}-${item.label}`"
                      :handleFileChange="
                        (e) => handleImgChange(e, key, control)
                      "
                      :data="control"
                    />
                  </div>
                  <div
                    class="textAreaContainer"
                    v-if="control.type == 'textarea'"
                  >
                    <h5>{{ control.label }}</h5>
                    <quill-editor
                      v-model="control.value"
                      class="TitleEditor"
                      :id="`${key}-${item.label}`"
                      :value="control.value"
                      :options="editorOption"
                      @change="onEditorChange($event, key, control)"
                    />
                  </div>
                  <div class="textBoxContainer" v-if="control.type == 'text'">
                    <h5>{{ control.label }}</h5>
                    <input
                      class="form-control"
                      type="text"
                      maxlength="200"
                      :ref="`${key}-${item.label}`"
                      v-model="control.value"
                      @blur="updatePreviewSchema"
                    />
                    <!-- <small v-if="hasError[item.label]" class="fieldError">
                      This field cannot be empty
                    </small> -->
                  </div>
                  <div class="colorContainer" v-if="control.type == 'color'">
                    <h5>{{ control.label }}</h5>
                    <ColorPicker
                      :color="control.value"
                      v-on:input="updateColorObject($event, control)"
                    ></ColorPicker>
                  </div>
                </div>
              </div>
            </md-list-item>
          </draggable>
        </div>

        <!-- <div class="md-layout-item md-size-70">
          <div class="previewBlock">
            <div class="ctaBlock">
              <div class="views">
                <span
                  class="material-icons"
                  @click="activate(menu.id)"
                  :class="{ active: active_el == menu.id }"
                  v-for="menu in menus"
                  :key="menu.id"
                  >{{ menu.texto }}</span
                >
              </div>
              <md-button class="md-raised btn-custom-default">
                Preview
              </md-button>
            </div>
            <div :class="{ mobileActive: active_el == '2' }">
              <div class="info" v-if="!infoHidden">
                Announcements: Earn Points every time you shop. One dollar =
                five points.
                <span
                  v-on:click="infoHidden = true"
                  class="material-icons"
                  v-if="active_el == '2'"
                  >close</span
                >
              </div>
              <div class="">
                <img
                  v-if="active_el == '2'"
                  src="../../assets/img/template_header_mobile.png"
                  alt=""
                  style="width:100%;"
                />
                <img
                  v-if="active_el == '0' || active_el == '1'"
                  src="../../assets/img/template_header.png"
                  alt=""
                />
              </div>
              <div class="cardBlock">
                <div class="item">
                  <div class="title">
                    <h2>Earn Rewards</h2>
                    <p>
                      Some text here to explain how to earn more rewards plus
                      second line can come here to explain all that we expect
                      from them.
                    </p>
                  </div>

                  <div class="cntrlBlock">
                    <div class="btnGr">
                      <div class="md-button-group">
                        <md-button class="md-raised active">Active</md-button>
                        <md-button class="md-raised">Completed</md-button>
                      </div>
                      <md-field>
                        <md-select
                          v-model="order"
                          name="order"
                          id="order"
                          placeholder="Order"
                        >
                          <md-option value="australia">Highest First</md-option>
                          <md-option value="brazil">Lowest First</md-option>
                        </md-select>
                      </md-field>
                    </div>
                    <div class="slider">
                      <vue-slide-bar
                        v-model="sliderCustomzie.val"
                        :min="1"
                        :max="1000"
                        :processStyle="sliderCustomzie.processStyle"
                        :lineHeight="sliderCustomzie.lineHeight"
                        :tooltipStyles="sliderCustomzie.tooltipStyles"
                      >
                      </vue-slide-bar>
                      <small>Total 740 points ($14.50 Worth)</small>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <CelebrateEvents />
                </div>
                <div class="item">
                  <ParticipateActions />
                </div>
                <div class="item">
                  <Newsletter />
                </div>
                <div class="item">
                  <ReferNearn />
                </div>
                <div class="item">
                  <div class="title">
                    <h2>Redeem Rewards</h2>
                    <p>
                      Some text here to explain how to earn more rewards plus
                      second line can come here to explain all that we expect
                      from them.
                    </p>
                  </div>
                  <Carouselslide />
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="md-layout-item md-size-70">
          <div class="previewBlock">
            <json-viewer
              :value="jsonData"
              :expand-depth="5"
              copyable
              boxed
            ></json-viewer>
          </div>
        </div>
      </div>
    </div>
    <Loader :status="loader" />

    <Footer />
  </div>
</template>
<style lang="less">
.toolbarWrapper {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  .paintIcon {
    margin: 0;
    color: #007aff !important;
  }
  .collapseAll {
    text-decoration: underline #007aff;
    color: #007aff;
    cursor: pointer;
  }
}
.listHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.leftSide {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
<script>
//import Axios from "axios";
import Loader from "@/components/Loader.vue";
import Footer from "../../components/Footer.vue";
// import ParticipateActions from "../../components/ParticipateActions.vue";
// import Newsletter from "../../components/Newsletter.vue";
// import ReferNearn from "../../components/ReferNearn.vue";
// import CelebrateEvents from "../../components/CelebrateEvents.vue";
// import Carouselslide from "../../components/Carouselslide.vue";
// import VueSlideBar from "vue-slide-bar";
import ColorPicker from "./../../components/ColorPicker";
import ImgUploadPreview from "./../../components/ImgUploadPreview";
import axios from "axios";
import JsonViewer from "vue-json-viewer";
import draggable from "vuedraggable";
import "vue-json-viewer/style.css";
// import Quill from "quill";
// let Font = Quill.import("formats/font");
// Font.whitelist = ["times-new-roman", "arial"];
// Quill.register(Font, true);

export default {
  name: "EmailEdit",
  components: {
    ColorPicker,
    //CustomVariables,
    ImgUploadPreview,
    Loader,
    Footer,
    JsonViewer,
    draggable,
    // ParticipateActions,
    // Newsletter,
    // ReferNearn,
    // CelebrateEvents,
    // Carouselslide,
    // VueSlideBar,
  },
  mixins: ["createFormData", "renderTemplate"],
  refs: ["myTextEditor"],

  data: function() {
    return {
      loader: false,
      isActive: false,
      infoHidden: false,
      hasError: false,
      order: "",
      ex3: { label: "thumb-color", val: 50, color: "red" },
      menus: [
        { id: "1", texto: "laptop", class: "active" },
        { id: "2", texto: "ad_units" },
      ],
      active_el: 0,
      drag: false,
      settingSection: [],
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ font: [] }],
            [({ indent: "-1" }, { indent: "+1" })],
            [{ align: [] }],
          ],
        },
      },
      sliderCustomzie: {
        val: 320,
        lineHeight: 10,
        processStyle: {
          backgroundColor: "#8f75be",
        },
        tooltipStyles: {
          backgroundColor: "#f94949",
          borderColor: "#f94949",
          borderRadius: "4px",
          fontSize: "12px",
          padding: "5px 10px",
          top: "-10px",
        },
      },
      jsonData: {},
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    activate: function(el) {
      this.active_el = el;
    },
    handleBack: function() {
      if (this.EmailEdit) {
        this.close();
      } else window.history.back();
    },
    onEditorChange: function(eve, key, attributeName) {
      console.log({ eve }, { key }, { attributeName });
      console.log("final Obj", this.updatePreviewSchema());
    },
    updateColorObject(color, control) {
      control.value = color;
      this.updatePreviewSchema();
    },
    updatePreviewSchema() {
      const returnArray = [];
      this.settingSection.forEach((currentSection) => {
        const returnObjKey = currentSection.label;
        const optionObj = {};
        for (const currentElement in currentSection.attributes) {
          if (
            Object.hasOwnProperty.call(
              currentSection.attributes,
              currentElement
            )
          ) {
            const element = currentSection.attributes[currentElement];
            optionObj[currentElement] = element.value;
          }
        }
        const finalObj = {};
        finalObj["type"] = returnObjKey;
        finalObj["attributes"] = optionObj;
        returnArray.push(finalObj);
      });
      this.jsonData.length = 0;
      this.jsonData = returnArray;
      return returnArray;
    },
    // checkforError: function(data, name) {
    //   if (Boolean(data.required) && data.value.trim() == "") {
    //     this.hasError = { ...this.hasError, [name]: true };
    //   } else {
    //     delete this.hasError[name];
    //   }
    // },
    handleImgChange: function(eve, key, attributeName) {
      console.log({ eve }, { key }, { attributeName });
      const file = eve.target.files[0];
      attributeName.value = eve.target.files[0].name;
      this.updatePreviewSchema();
      if (file) {
        // this.loader = true;
        // const url = this.getApiUrl(`S3Uploader/fomoTemplate`);
        // let formData = new FormData();
        // formData.append("Filedata", file);
        // formData.append("id", this.id);
        // formData.append("id_template", this.tempId);
        // axios.post(url, formData)
        //   .then(({ data }) => {
        //     this.loader = false;
        //     if (!data.error) {
        //       this.fomoData.settings[key].attributes[name].value =
        //         data.img_name;
        //       this.apiResponse = `<i class="fas fa-check-circle"></i> Uploaded successfully`;
        //     } else {
        //       this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        //     }
        //     this.apiMessage = true;
        //   })
        //   .catch(err => {
        //     this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${err}`;
        //     this.apiMessage = true;
        //   })
        //   .finally(() => {
        //     this.loader = false;
        //   });
      }
    },
  },
  mounted: function() {
    axios
      .get("https://run.mocky.io/v3/c9e47785-23fc-4fcd-82c3-4d527103009d")
      .then((res) => {
        console.log(res);
        this.settingSection = res.data;
        this.updatePreviewSchema();
      });
  },
};
</script>

<style lang="less" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.dragHandle {
  cursor: move;
}
.embedEdit {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .fixedTopNav {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 9;
    display: flex;
    justify-content: space-between;

    .level1 {
      display: flex;
      align-items: center;
      font-weight: bold;
      span:first-child {
        border-right: 1px solid #d1d1d1;
        text-align: center;
        margin-right: 20px;
        padding: 10px 15px;
        cursor: pointer;
      }
    }

    .topCta {
      margin: 4px 10px;
    }
  }

  .editWrap {
    margin-top: 60px;
    width: 100%;
    padding: 0 20px;
  }

  .subjectEditor {
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
  }

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
      top: 10px;
      z-index: 2;
      right: 96px;
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

    .ctaBlock {
      border-bottom: 1px solid #e8e8e8;
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .views {
        background: #dfdfdf;
        border-radius: 4px;
        overflow: hidden;

        .material-icons {
          padding: 10px 20px;
          font-size: 16px;
          color: #6d6d6d;
          cursor: pointer;
          &:hover {
            background: #d1d1d1;
            color: #000;
          }

          &.active,
          &.active:hover {
            background: #333333;
            color: #fff;
          }

          &:last-child {
            -ms-transform: rotate(180deg); /* IE 9 */
            transform: rotate(180deg); /* Standard syntax */
          }
        }
      }
    }

    .info {
      background: #cfeff5;
      color: #505eac;
      padding: 5px 10px;
      font-size: 12px;
      text-align: center;
    }
    .cardBlock {
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      .item {
        width: 50%;

        &:first-child {
          width: 100%;
          margin-top: 20px;
          padding-bottom: 20px;
        }

        &:last-child {
          width: 100%;
          background: #fff7ef;
          margin-top: 20px;
          padding-bottom: 20px;
        }

        .celebrateEvents,
        .newsLetter {
          width: calc(100% - 20px);
          margin: 20px 0 0 20px;
        }

        .celebrateEvents {
          min-height: 560px;
        }

        .referNearn {
          width: calc(100% - 40px);
          margin: 20px 20px 0 20px;
        }

        .partiAction {
          margin: 0 20px 0px 10px;
          padding: 0;
          p {
            margin-bottom: 0;
          }
        }
        .title {
          max-width: 50%;
          margin: 0 auto;
          text-align: center;
          padding: 30px 0 0px;
        }

        .cntrlBlock {
          margin: 20px;
          .btnGr {
            display: flex;
            flex: 1;
            .md-button-group {
              width: 100%;
            }
          }
          .slider {
            flex: 1;
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .vue-slide-bar-component {
              width: 150px;
            }
            small {
              color: #8f75be;
              margin-top: 10px;
            }
          }
          @media only screen and (max-width: 599px) {
            flex-direction: column-reverse;
            .slider {
              margin-bottom: 20px;
            }
          }
        }
      }
    }

    .mobileActive {
      width: 395px;
      margin: 40px auto;
      background: #4e4e4e;
      padding: 20px 10px;
      border-radius: 20px;

      .info {
        padding: 5px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        .material-icons {
          font-size: 16px;
        }
      }
      .cardBlock {
        .cntrlBlock {
          flex-direction: column-reverse;
          margin: 10px;
          .btnGr {
            flex-flow: row wrap;
            width: 100%;
            .md-field,
            .md-button-group {
              flex: 1;
              width: 50%;
            }
            .md-button-group .md-button.md-theme-default.md-raised {
              padding: 9px;
            }
          }
        }
        .item {
          width: 100%;
          &:first-child {
            padding-bottom: 0;
          }
          .title {
            padding: 10px;
            max-width: 100%;
          }
          .celebrateEvents,
          .newsLetter {
            margin: 10px;
          }
          .partiAction {
            margin: -10px 10px 0 10px;
          }
          .celebrateEvents {
            padding: 15px;
            min-height: auto;
          }
          .referNearn {
            width: calc(100% - 20px);
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
:root {
  --md-theme-default-accent: #5bb74d !important;
  --md-theme-default-text-primary-on-accent: #ffffff !important;
}
.md-button.md-theme-default.md-raised:not([disabled]) {
  border: 1px solid #d1d1d1;
}
.topCta {
  .md-button:first-child {
    margin: 0 15px 0 0;
  }
}
.embedEdit .previewBlock .cardBlock .item {
  .partiAction {
    .partiActions {
      p {
        margin-bottom: 0;
      }
    }
  }
  .newsLetter {
    .imgDiv {
      margin-top: 15px;
    }
  }
  .VueCarousel {
    margin: 0 20px;
    .VueCarousel-wrapper {
      margin: 0;
    }
  }

  .cntrlBlock {
    margin: 20px 30px;
    padding: 0;
    .btnGr {
      .md-field {
        margin: 0 0 0 10px;
        min-height: auto;
        background: #ddd;
        border-radius: 4px;
        padding: 0 10px;

        &::after {
          display: none;
        }
        &::before {
          background-color: #8f75be;
        }
        .md-menu.md-select {
          align-items: center;
        }
      }
    }
  }
}
</style>
