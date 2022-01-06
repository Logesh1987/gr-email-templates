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
          <div>
            <span>{{ fomoData.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container fomoContainer">
      <div class="templateSection" v-if="fomoTemplates">
        <div
          class="template"
          v-for="template in fomoTemplates"
          :key="template.id"
        >
          <figure class="template-inner">
            <img
              :src="getAssetUrl(`fomo/theme/${fomoType}_${template.id}.png`)"
              alt=""
            />
            <div>
              <router-link
                :to="`/view/fomo/edit/${fomoId}`"
                v-if="template.attributes.is_activated"
              >
                <md-button class="md-raised activated">
                  <span>Customize</span>
                </md-button>
              </router-link>
              <md-button
                v-else
                class="md-raised"
                @click.prevent="activateTheme(template.id)"
              >
                <span>Activate</span>
              </md-button>
            </div>
          </figure>
          <figcaption class="template-info">
            <p>{{ template.attributes.name }}</p>
          </figcaption>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Axios from "axios";

export default {
  name: "SelectTemplates",
  mixins: ["renderTemplate", "getAssetUrl", "getApiUrl"],
  computed: {
    ...mapState(["fomoId", "fomoType", "fomoData", "fomoTemplates"])
  },
  methods: {
    ...mapMutations([
      "updateFomoId",
      "toggleLoader",
      "updateFomoTemplates",
      "updateApiResponse"
    ]),
    ...mapActions(["getFomo"]),
    handleBack: function() {
      window.history.back();
    },
    activateTheme: function(id) {
      const url = this.getApiUrl("fomo/activateTemplate");
      const params = {
        id_fomo: this.fomoId,
        id_template: id
      };
      this.toggleLoader(true);
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          if (data.data.status == "success") {
            var msg = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
            this.updateApiResponse(msg);
            this.getFomo().then(res => {
              if (res) {
                this.$router.push(`../edit/${this.fomoId}`);
              }
            });
          }
        })
        .catch(({ response }) => {
          var msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
          this.updateApiResponse(msg);
          this.toggleLoader(false);
        });
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
  max-width: 1600px;
  min-height: 100vh;
  overflow: visible;
  padding-top: 100px;

  .templateSection {
    display: flex;
    flex-wrap: wrap;
    .template {
      width: calc(33.3% - 40px);
      margin: 0px 20px 30px;
      position: relative;
      &:hover figure div {
        opacity: 1;
      }

      &-inner {
        margin: 0;
        border: 1px solid #ababab;
        border-radius: 5px;
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
        button.activated {
          --md-theme-default-background: #67c13c;
          --md-theme-default-text-primary-on-background: #fff;
          border: none;
        }
        div {
          box-shadow: 0 0 0em 20em rgba(0, 0, 0, 0.5);
          position: relative;
          opacity: 0;
          transition: opacity 0.4s;
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
        text-align: center;
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
