<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a class="link-back" @click.prevent="handleBack">
          <i class="fa fa-long-arrow-left"
            ><md-tooltip md-direction="right">Back</md-tooltip></i
          >
        </a>
        <div class="title" v-if="fomoData">
          <div class="icon margin-right-10">
            <i :class="`fomoIcon icon_${fomoType}`"></i>
          </div>
          {{ fomoData.name }}
        </div>
      </div>
    </div>

    <div class="container fomoContainer" v-if="fomoData">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30 configSection">
          <h2>FOMO Summary</h2>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>Template :</h3>
                  <router-link :to="`/view/fomo/edit/${fomoId}`">
                    <i class="fas fa-edit editIcn"></i>
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
                  <router-link :to="`/view/fomo/edit/${fomoId}`">
                    <i class="fas fa-edit editIcn"></i>
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
                  <router-link :to="`/view/fomo/edit/${fomoId}`">
                    <i class="fas fa-edit editIcn"></i>
                  </router-link>
                </div>
                <ul>
                  <li>Visible to {{ dInfo.visible_to }}</li>
                  <li>Displayed in {{ dInfo.show_on_page }} pages</li>
                  <li v-if="dInfo.show_on_first_visit == 1">
                    Displayed on first visit only
                  </li>
                  <li v-if="fomoData.is_automatic === 1">
                    Added to automatic queue
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
    ...mapState(["fomoId", "fomoType", "fomoData", "fomoTemplates"]),
    rInfo: function() {
      return this.fomoData.reward_settings;
    },
    dInfo: function() {
      console.log(this.fomoData);
      return this.fomoData.display_settings;
    },
    activeTemplate: function() {
      return this.fomoTemplates
        ? this.fomoTemplates.find(item => item.attributes.is_activated == 1)
        : null;
    }
  },
  methods: {
    ...mapMutations(["updateFomoId", "toggleLoader", "updateApiResponse"]),
    handleBack: function() {
      this.$router.push("../");
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
.fomoContainer {
  margin: 0 auto;
  display: flex;
  max-width: 1600px;
  min-height: 100vh;
  overflow: visible;
  padding-top: 100px;
  justify-content: center;
  width: 100%;
  .md-gutter {
    width: 100%;
  }
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

  .poppin {
    width: 100%;
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
</style>
