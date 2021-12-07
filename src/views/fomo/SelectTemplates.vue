<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a
          class="link-back"
          @click.prevent="handleBack"
          v-if="activeEdit == false"
        >
          <i class="fa fa-long-arrow-left"
            ><md-tooltip md-direction="right">Back</md-tooltip></i
          >
        </a>
        <div class="title" v-if="fomoData">
          <div class="icon margin-right-10">
            <i :class="`fomoIcon icon_${fomoType}`"></i>
          </div>
          <div v-if="editName == null">
            <span>{{ fomoData.name }}</span>
            <i class="fas fa-pen nameCTA" @click="editName = fomoData.name"></i>
          </div>
          <div class="nameEditContainer" v-else>
            <md-field>
              <md-input v-model="editName"></md-input>
              <i class="fal fa-times nameCTA" @click="editName = null"></i>
              <i
                class="far fa-save nameCTA"
                v-if="editName && editName.length"
                @click.prevent="e => saveAttribute('name', editName)"
              ></i>
            </md-field>
          </div>
        </div>
      </div>
    </div>

    <div class="container fomoContainer" v-if="fomoData">
      <div class="md-layout md-gutter" v-if="activeEdit == false">
        <div class="md-layout-item md-size-30 configSection">
          <h2>FOMO Summary</h2>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Template :</h3>
                  <router-link
                    :to="`/view/fomo/edit/${fomoId}/${activeTemplate.id}`"
                  >
                    <i class="fas fa-edit editIcn"></i>
                  </router-link>
                </div>
                <ul>
                  <li>
                    This FOMO uses
                    {{ activeTemplate.attributes.name }}
                  </li>
                </ul>
              </div>
            </md-card-content></md-card
          >
          <md-card
            class="mb-20"
            v-if="
              fomoData.config_setting &&
                Object.keys(fomoData.config_setting).length
            "
          >
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Config :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'config'"
                  ></i>
                </div>
              </div> </md-card-content
          ></md-card>
          <md-card
            class="mb-20"
            v-if="
              fomoData.reward_settings &&
                Object.keys(fomoData.reward_settings).length
            "
          >
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Reward :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'rewards'"
                  ></i>
                </div>
                <ul>
                  <li>
                    {{
                      rInfo.mode_points == 1
                        ? `Has enabled Points Mode with ${rInfo.worth_entries} reward points`
                        : "Has disabled Points Mode"
                    }}
                  </li>
                  <li>
                    {{
                      rInfo.mode_instant == 1
                        ? `Is providing Instant reward as ${
                            rInfo.instant_reward_opt == 1
                              ? "Coupon"
                              : rInfo.instant_reward_opt == 3
                              ? "Redirection link"
                              : "Image Or Text"
                          }`
                        : "Has disabled Instant Reward"
                    }}
                  </li>
                  <li
                    v-if="
                      rInfo.mode_instant == 1 && rInfo.instant_reward_opt == 1
                    "
                  >
                    Is providing Coupons as
                    {{
                      rInfo.reward_type == "runique"
                        ? "Automagic Coupons"
                        : "Common Coupons"
                    }}
                  </li>
                  <li
                    v-if="
                      rInfo.mode_instant == 1 &&
                        rInfo.instant_reward_opt == 1 &&
                        rInfo.reward_type == 'runique'
                    "
                  >
                    Coupon type is
                    {{
                      rInfo.realtime_coupon_type == 1
                        ? "Percentage off the order total"
                        : rInfo.realtime_coupon_type == 2
                        ? "Fixed amount off the order total"
                        : "Free shipping"
                    }}
                  </li>
                  <li
                    v-if="
                      rInfo.mode_instant == 1 &&
                        rInfo.instant_reward_opt == 1 &&
                        rInfo.reward_type == 'runique'
                    "
                  >
                    Minimum spend value is {{ rInfo.currency
                    }}{{ rInfo.realtime_min_order }}
                  </li>
                  <li
                    v-if="
                      rInfo.mode_instant == 1 &&
                        rInfo.instant_reward_opt == 1 &&
                        rInfo.reward_type == 'runique' &&
                        rInfo.realtime_coupon_type !== 3
                    "
                  >
                    Coupon value is
                    {{
                      rInfo.realtime_coupon_type == 1
                        ? `${rInfo.realtime_coupon_value}%`
                        : `${rInfo.currency}${rInfo.realtime_coupon_value}`
                    }}
                  </li>
                  <li
                    v-if="
                      rInfo.mode_instant == 1 && rInfo.instant_reward_opt == 3
                    "
                  >
                    Goto
                    <a :href="rInfo.instant_reward_lnk" target="_blank"
                      >Redirection URL</a
                    >
                  </li>
                </ul>
              </div>
            </md-card-content>
          </md-card>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Display :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'display'"
                  ></i>
                </div>
                <ul>
                  <li>Visible to {{ dInfo.visible_to }}</li>
                  <li>Displayed in {{ dInfo.show_on_page }} pages</li>
                  <li v-if="dInfo.show_on_first_visit == 1">
                    Displayed on first visit only
                  </li>
                </ul>
              </div>
            </md-card-content>
          </md-card>
          <md-card class="px-20">
            <md-switch v-model="boolean" class="md-primary">
              Add to automatic queue
              <i class="ml-10 fas fa-info-circle">
                <md-tooltip>More info about stack </md-tooltip>
              </i>
            </md-switch>
          </md-card>
        </div>
        <div
          class="md-layout-item md-size-70 templateSection"
          v-if="templateData"
        >
          <div class="template activeTemplate">
            <figure class="template-inner">
              <i>Active Template</i>
              <img
                :src="
                  getAssetUrl(`fomo/theme/${fomoType}_${activeTemplate.id}.png`)
                "
                alt=""
              />
            </figure>
            <figcaption class="template-info">
              <p>{{ activeTemplate.attributes.name }}</p>
              <router-link
                :to="`/view/fomo/edit/${fomoId}/${activeTemplate.id}`"
              >
                <md-button class="md-raised md-accent">
                  <span>Edit</span>
                </md-button>
              </router-link>
            </figcaption>
          </div>
          <div class="display-flex align-items-start otherTemplates">
            <h4>Other Templates</h4>
            <div
              class="template"
              v-for="template in templateData.filter(
                v => v.attributes.is_activated == 0
              )"
              :key="template.id"
            >
              <figure class="template-inner">
                <img
                  :src="
                    getAssetUrl(`fomo/theme/${fomoType}_${template.id}.png`)
                  "
                  alt=""
                />
                <router-link :to="`/view/fomo/edit/${fomoId}/${template.id}`">
                  <md-button class="md-raised md-accent">
                    <span>Activate</span>
                  </md-button>
                </router-link>
              </figure>
              <figcaption class="template-info">
                <p>{{ template.attributes.name }}</p>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="poppin">
        <FomoRewardSetup
          v-if="activeEdit == 'rewards'"
          :data="fomoData.reward_settings"
          :id="fomoId"
          :close="closePopin"
          :save="saveRewards"
        />
        <FomoDisplaySetup
          v-if="activeEdit == 'display'"
          :data="fomoData.display_settings"
          :save="saveDisplay"
          :content="contentData"
          :close="closePopin"
        />
      </div>
    </div>
    <md-snackbar
      class="msgSnack"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="apiMessage"
    >
      <span v-html="apiResponse"></span>
    </md-snackbar>
    <FeedbackPopup :url="getApiUrl('fomo/sendReview')" />
    <Loader :status="loader" />
  </div>
</template>
<script>
import Axios from "axios";
import FomoDisplaySetup from "@/components/fomo/FomoDisplaySetup.vue";
import FomoRewardSetup from "@/components/fomo/FomoRewardSetup.vue";
import FeedbackPopup from "@/components/FeedbackPopup.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "SelectTemplates",
  components: { FomoDisplaySetup, FomoRewardSetup, Loader, FeedbackPopup },
  mixins: ["renderTemplate", "getAssetUrl", "getApiUrl"],
  data: function() {
    return {
      fomoId: this.$route.params.fomoId,
      fomoData: null,
      fomoType: null,
      templateData: null,
      contentData: null,
      activeEdit: false, // config || rewards || display
      loader: false,
      apiMessage: false,
      apiResponse: null,
      editName: null
    };
  },
  computed: {
    rInfo: function() {
      return this.fomoData.reward_settings;
    },
    dInfo: function() {
      return this.fomoData.display_settings;
    },
    activeTemplate: function() {
      return this.templateData.find(item => item.attributes.is_activated == 1);
    }
  },
  methods: {
    handleBack: function() {
      this.$router.push("../");
    },
    closePopin: function() {
      this.activeEdit = false;
    },
    saveDisplay: function(params) {
      const url = this.getApiUrl("fomo/updateDisplaySettings");
      this.loader = true;
      Axios.post(url, this.createFormData({ ...params, id: this.fomoId }))
        .then(({ data }) => {
          this.fomoData.display_settings = params;

          this.apiResponse = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          this.apiMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.apiResponse = `<i class="fas fa-exclamation-circle"></i> Internal error`;
          this.apiMessage = true;
        })
        .finally(() => (this.loader = false));
    },
    saveRewards: function(params) {
      const url = this.getApiUrl("fomo/updateRewards");
      this.loader = true;
      Axios.post(url, this.createFormData({ ...params, id: this.fomoId }))
        .then(({ data }) => {
          this.fomoData.reward_settings = params;
          this.apiResponse = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          this.apiMessage = true;
        })
        .catch(({ data }) => {
          console.log(data);
          this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${data.data.message}`;
          this.apiMessage = true;
        })
        .finally(() => (this.loader = false));
    },
    saveAttribute: function(key, value) {
      const url = this.getApiUrl("fomo/update");
      const params = {
        id: this.fomoId,
        [key]: value
      };
      this.loader = true;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          this.fomoData[key] = value;
          this.apiResponse = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          this.apiMessage = true;
          this.editName = null;
        })
        .catch(({ data }) => {
          console.log(data);
          this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${data.data.message}`;
          this.apiMessage = true;
        })
        .finally(() => (this.loader = false));
    }
  },
  mounted: function() {
    const url = this.getApiUrl(`fomo/getDetails?id=${this.fomoId}`);
    this.loader = true;
    Axios.get(url)
      .then(({ data }) => {
        const { attributes, relationship, includes, type } = data;
        this.fomoType = type;
        this.fomoData = attributes;
        this.contentData = relationship;
        this.templateData = includes.templates;
      })
      .catch(({ data }) => {
        this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${data.data.message}`;
        this.apiMessage = true;
        console.log(data);
      })
      .finally(() => (this.loader = false));
  }
};
</script>
<style lang="less" scoped>
.fomoContainer {
  margin: 0 auto;
  display: flex;
  max-width: 1600px;
  min-height: 100vh;
  overflow: visible;
  padding-top: 100px;
  justify-content: center;

  .md-card {
    box-shadow: none;
    border: 1px solid var(--stroke-grey);

    .md-card-content {
      padding: 0;
      &:last-of-type {
        padding-bottom: 24px;
      }
    }
  }

  .configSection {
    h2,
    h3 {
      margin-top: 0;
      color: #333;
    }
    .innerConfigSection {
      .handBand {
        display: flex;
        align-items: baseline;
        background: var(--main-blue);
        padding: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--stroke-grey);
        color: #fff;
        h3 {
          color: #fff;
          flex: 100%;
          margin: 0;
        }
        a {
          color: #fff;
        }
        .editIcn {
          text-align: right;
          cursor: pointer;
        }
      }
      ul {
        margin: 0 15px;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 20px;
        &:before {
          color: #52c509;
          content: "\f14a";
          font-family: "Font Awesome 5 Pro";
          font-weight: 600;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  .poppin {
    width: 100%;
  }

  .templateSection {
    .otherTemplates {
      width: 100%;
      flex-wrap: wrap;
    }
    h4 {
      width: 100%;
      margin: 20px 15px;
      font-size: 1.4em;
      border-bottom: 1px solid;
      padding-bottom: 0.3em;
    }
    .template {
      width: calc(33.3% - 30px);
      margin: 0px 15px;
      position: relative;
      &:hover figure a {
        opacity: 1;
      }

      &-inner {
        margin: 0;
        background: #ababab;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        &:before {
          content: "";
          display: block;
          padding-bottom: 80%;
        }
        a {
          box-shadow: 0 0 0em 6em rgba(0, 0, 0, 0.75);
          position: relative;
          opacity: 0;
          transition: opacity 0.4s;
        }
        &.active {
          background-color: #43ef9f;
        }
        img {
          width: 90%;
          height: 90%;
          position: absolute;
          object-fit: contain;
        }
        i {
          position: absolute;
          right: 0;
          top: 0;
          background: #52c509;
          padding: 0.4em 1.2em 0.6em 1.6em;
          font-style: normal;
          font-weight: 600;
          color: #fff;
          border-radius: 0 0 0 1em;
          box-shadow: -0.5em 0.5em 1.5em rgba(0, 0, 0, 0.5);
          text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
        }
      }
      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 0;
      }
      &.activeTemplate {
        width: calc(100% - 40px);
        max-width: 100%;
        margin-bottom: 1em;
        figure {
          &:before {
            content: "";
            display: block;
            padding-bottom: 50%;
          }
        }
      }
    }
  }
}
.nameCTA {
  cursor: pointer;
}
.nameEditContainer {
  display: flex;
  align-items: center;
  .nameCTA {
    font-size: 1.2em;
    padding: 0 0.3em;
  }
  .md-field {
    margin: 0;
    padding: 0;
    min-height: 0;
    align-items: center;
  }
}
</style>
<style lang="less">
:root {
  --main-blue: #005dff;
  --stroke-grey: #d1d1d1;
}
.nameCTA {
  font-size: 0.9em;
  padding: 0 0.8em;
}
.fomoContainer {
  .poppin {
    .topControl.formSubmit {
      position: fixed;
      top: 12px;
      z-index: 9999;
      right: 12px;
      justify-content: flex-end;
      .md-button {
        margin-left: 10px;
      }
    }
    h2 {
      margin-top: 0;
    }

    label.md-checkbox-label {
      display: flex;
      align-items: center;
      height: auto;
      .fas {
        margin-left: 10px;
        font-size: 20px;
      }
    }
    .bLabel {
      .fas {
        margin-left: 10px;
        font-size: 20px;
      }
    }

    .displaySetting {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;

      @media only screen and (max-width: 599px) {
        flex-direction: column;
      }

      .setupMode {
        border: 1px solid var(--stroke-grey);
        border-bottom: none;
        background: #fff;

        @media only screen and (max-width: 599px) {
          margin-bottom: 20px;
        }
        .head {
          padding: 0 20px;
          color: #fff;
          font-weight: bold;
          border-bottom: 1px solid var(--stroke-grey);
          background: var(--main-blue);
          &.disabled {
            .md-checkbox {
              opacity: 0.5;
              pointer-events: none;
            }
            .soon {
              float: right;
              margin: 1.1em;
            }
          }
        }
        .body {
          border-bottom: 1px solid var(--stroke-grey);
        }
        .md-field {
          padding-top: 0;
          min-height: 32px;
        }
      }
    }
    .text-info {
      line-height: 1.1;
      i {
        font-size: 1.6em;
        padding-right: 10px;
        color: var(--main-blue);
        transform: translateY(-0.2em);
      }
    }
  }
}
</style>
