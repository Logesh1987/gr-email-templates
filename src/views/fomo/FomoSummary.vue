<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <router-link class="link-back" to="/view/fomo">
          <i class="fa fa-long-arrow-left"
            ><md-tooltip md-direction="right">Back</md-tooltip></i
          >
        </router-link>
        <div class="title" v-if="fomoData">
          <div class="icon margin-right-10">
            <i :class="`fomoIcon icon_${fomoType}`"></i>
          </div>
          {{ fomoData.name }}
        </div>
      </div>
      <div class="status" v-if="fomoData">
        <label class="switch" for="c" @click.prevent="handlePublish">
          <input
            type="checkbox"
            name="mainSwitch"
            :checked="fomoData.status === 1"
          />
          <i></i>
        </label>
        <div>
          {{ fomoData.status === 1 ? "Active" : "paused" }}
        </div>
      </div>
    </div>

    <div class="container" v-if="fomoData">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30 configSection">
          <h2>FOMO Summary</h2>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Template :</h3>
                  <router-link
                    :to="{
                      name: 'EditFomo',
                      params: { fomoId: `${fomoId}`, mainTab: 'tab-template' }
                    }"
                  >
                    <i class="fas fa-edit editIcn"
                      ><md-tooltip md-direction="right">Edit</md-tooltip></i
                    >
                  </router-link>
                </div>
                <ul>
                  <li>
                    This FOMO is named as
                    {{ fomoData.name }}
                  </li>
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
              fomoData.reward_settings &&
                Object.keys(fomoData.reward_settings).length
            "
          >
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Reward :</h3>
                  <router-link
                    :to="{
                      name: 'EditFomo',
                      params: { fomoId: `${fomoId}`, mainTab: 'tab-reward' }
                    }"
                  >
                    <i class="fas fa-edit editIcn"
                      ><md-tooltip md-direction="right">Edit</md-tooltip></i
                    >
                  </router-link>
                </div>
                <ul>
                  <li>
                    {{
                      rInfo.mode_points == 1
                        ? `Has enabled Points Mode with ${rInfo.worth_entries} reward points`
                        : "Has disabled Points Mode"
                    }}
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
                  <router-link
                    :to="{
                      name: 'EditFomo',
                      params: { fomoId: `${fomoId}`, mainTab: 'tab-display' }
                    }"
                  >
                    <i class="fas fa-edit editIcn"
                      ><md-tooltip md-direction="right">Edit</md-tooltip></i
                    >
                  </router-link>
                </div>
                <ul>
                  <li>
                    positioned at
                    {{ fomoClanData.prompt_positions[dInfo.position] }}.
                  </li>
                  <li>Visible to {{ dInfo.visible_to }}.</li>
                  <li>Displayed in {{ dInfo.show_on_page }} pages.</li>
                  <li v-if="dInfo.show_on_first_visit == 1">
                    Displayed on first visit only.
                  </li>
                  <li v-if="allowedCountries.length">
                    visible only in countries {{ allowedCountries }}.
                  </li>
                  <li v-if="dInfo.scroll_percentage !== 0">
                    visible only after {{ dInfo.scroll_percentage }}% scroll.
                  </li>
                  <li v-if="dInfo.seconds !== 0">
                    visible only after {{ dInfo.seconds }} seconds.
                  </li>
                  <li v-if="fomoData.is_automatic === 1">
                    Added to automatic queue.
                  </li>
                </ul>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div
          class="md-layout-item md-size-70 templateSection"
          v-if="fomoTemplates"
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
              <router-link :to="`/view/fomo/templates/${fomoId}`">
                <md-button class="md-raised md-accent">
                  <span>Change Template</span>
                </md-button>
              </router-link>
            </figcaption>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "FomoSummary",
  mixins: ["renderTemplate", "getAssetUrl", "getApiUrl"],
  data: function() {
    return {
      apiMessage: false,
      apiResponse: null
    };
  },
  computed: {
    ...mapState([
      "fomoId",
      "fomoType",
      "fomoData",
      "fomoTemplates",
      "fomoClanData"
    ]),
    rInfo: function() {
      return this.fomoData.reward_settings;
    },
    dInfo: function() {
      return this.fomoData.display_settings;
    },
    allowedCountries: function() {
      if (
        typeof this.fomoData.display_settings.allowed_countries !== "string"
      ) {
        return this.fomoData.display_settings.allowed_countries
          .map(i => i.label)
          .join(", ");
      } else {
        return "";
      }
    },
    activeTemplate: function() {
      return this.fomoTemplates
        ? this.fomoTemplates.find(item => item.attributes.is_activated == 1)
        : null;
    }
  },
  methods: {
    ...mapMutations([
      "updateFomoId",
      "toggleLoader",
      "updateApiResponse",
      "updateFomoData"
    ]),
    handlePublish: function() {
      const url = this.getApiUrl("fomo/updateStatus");
      const params = {
        id: this.fomoId,
        status: this.fomoData.status == 0 ? 1 : 0
      };
      this.toggleLoader(true);
      var msg = null;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          if (data.data.status === "success") {
            msg = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
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
    }
  },
  mounted: function() {
    if (this.fomoId !== this.$route.params.fomoid) {
      this.updateFomoId(this.$route.params.fomoid);
    }
  }
};
</script>
<style lang="less" scoped>
.changeTemplateView {
  margin: 0 auto;
  display: flex;
  max-width: 1400px;
  min-height: calc(100vh - 200px);
  overflow: visible;
  padding-top: 100px;
  justify-content: center;
  width: 100%;
  .status {
    display: inline-flex;
    align-items: center;
    div {
      padding: 0 15px 0 6px;
    }
  }
  .container,
  .md-gutter {
    width: 100%;
  }
  .md-card {
    box-shadow: none;
    background: transparent;

    .md-card-content {
      padding: 0;
      &:last-of-type {
        padding-bottom: 10px;
      }
    }
  }

  .configSection {
    h2,
    h3 {
      margin-top: 0;
      color: #333;
    }
    h2 {
      margin-bottom: 25px;
    }
    .innerConfigSection {
      .handBand {
        display: flex;
        align-items: baseline;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        h3 {
          color: rgba(0, 0, 0, 0.5);
          flex: 100%;
          margin: 0;
        }
        a {
          color: rgba(0, 0, 0, 0.5);
          font-size: 1.2em;
        }
        .editIcn {
          text-align: right;
          cursor: pointer;
        }
      }
      ul {
        margin: 0 10px;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 20px;
        margin-bottom: 5px;
        &:before {
          color: rgba(0, 0, 0, 0.5);
          content: "\f00c";
          font-family: "Font Awesome 5 Pro";
          font-weight: 600;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  .templateSection {
    .template {
      width: calc(100% - 40px);
      max-width: 100%;
      margin-bottom: 1em;
      margin: 0px 15px;
      position: relative;
      figure {
        &:before {
          content: "";
          display: block;
          padding-bottom: 50%;
        }
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
          background: #0ec25e;
          padding: 0.4em 1.2em 0.6em 1.6em;
          font-style: normal;
          color: #fff;
          box-shadow: -0.5em 0.5em 1.5em rgba(0, 0, 0, 0.5);
        }
      }
      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 0;
      }
    }
  }
}
.nameCTA {
  cursor: pointer;
}
</style>
