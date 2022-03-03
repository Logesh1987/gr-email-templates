<template>
  <div class="home">
    <div class="fomoContainer">
      <div class="fomo_block">
        <div class="active_fomo">
          <div class="fomoHeader">
            <div>
              <h2>
                <i class="fal fa-fire"></i>Fomo Prompts
                <small class="beta">Beta</small>
                <PromptConfiguration
                  v-if="listData"
                  :data="widgetData"
                  :saveWidgetData="saveWidgetData"
                />
              </h2>
              <p>Some text explains about this FOMO prompts can be here.</p>
              <!--<div class="statusBlock">
                <div v-for="status in statuses" :key="status.count">
                  <h3>{{ status.count }}</h3>
                  <p>{{ status.attr }}</p>
                </div>
              </div>-->
            </div>
            <md-button class="mobile btnDrawer" @click="showSidepanel = true"
              >Create New & View all template</md-button
            >
          </div>
          <div class="fomo_block" v-if="errored">
            <div class="warning">
              We're sorry, we're not able to retrieve this information at the
              moment, please try back later
            </div>
          </div>
          <div class="fomoList" v-if="listData">
            <md-tabs class="fomo-tabs" v-if="listData.length > 0">
              <template slot="md-tab" slot-scope="{ tab }">
                {{ tab.label }}
                <small v-if="tab.data.badge">({{ tab.data.badge }})</small>
              </template>
              <md-tab
                id="tab-all"
                md-label="All Prompts"
                :md-template-data="{ badge: listData.length }"
              >
                <FomoListTable
                  :listData="listData"
                  :updateStatus="updateStatus"
                />
              </md-tab>
              <md-tab
                id="tab-home"
                md-label="Active Prompts"
                :md-template-data="{ badge: activeFomo.length }"
              >
                <FomoListTable
                  :listData="activeFomo"
                  :updateStatus="updateStatus"
                />
              </md-tab>
              <md-tab
                id="tab-pages"
                md-label="Paused Prompts"
                :md-template-data="{ badge: inactiveFomo.length }"
              >
                <FomoListTable
                  :listData="inactiveFomo"
                  :updateStatus="updateStatus"
                />
              </md-tab>
            </md-tabs>
            <NoFomoView v-else />
          </div>
        </div>
        <div class="create_fomo desktop">
          <div class="titleBlock">
            <h2>Create New</h2>
            <!-- <a href="#" class="btn_link btn_link-small">View all templates</a> -->
          </div>
          <div class="newFomoList">
            <div v-for="template in allFomoTypes" :key="template.id">
              <div class="new_list">
                <md-icon class="fomo_icon">
                  <i :class="`fomoIcon icon_${template.type}`"></i>
                </md-icon>
                <div class="fomo_details">
                  <h3>{{ template.attributes.name }}</h3>
                </div>
                <md-button
                  v-if="!template.attributes.disabled"
                  :md-ripple="false"
                  class="md-dense btn"
                  @click="createFomo(template.id)"
                  >Add</md-button
                >
                <md-button
                  v-else
                  :md-ripple="false"
                  class="md-raised md-dense btn"
                  disabled
                  >Active</md-button
                >
              </div>
            </div>
          </div>
        </div>
        <md-drawer class="md-right mobile" :md-active.sync="showSidepanel">
          <div class="create_fomo">
            <div class="titleBlock">
              <h2>Create New</h2>
              <a href="#" class="btn_link btn_link-small">View all templates</a>
            </div>
            <div class="newFomoList">
              <div v-for="template in allFomoTypes" :key="template.id">
                <div class="new_list" v-if="!template.attributes.disabled">
                  <md-icon class="fomo_icon">
                    <span>V</span>
                    <i :class="`fomoIcon icon_${template.type}`"></i>
                  </md-icon>
                  <div class="fomo_details">
                    <h3>{{ template.attributes.name }}</h3>
                  </div>
                  <md-button :md-ripple="false" class="md-dense btn"
                    >Add</md-button
                  >
                </div>
              </div>
            </div>
          </div>
        </md-drawer>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
import { mapMutations, mapState } from "vuex";
import NoFomoView from "@/components/fomo/NoFomoView.vue";
import FomoListTable from "@/components/fomo/FomoListTable.vue";
import PromptConfiguration from "@/components/fomo/PromptConfiguration.vue";

export default {
  name: "FomoListing",
  mixins: ["createFormData", "getApiUrl"],
  components: { NoFomoView, FomoListTable, PromptConfiguration },
  data: function() {
    return {
      listData: null,
      widgetData: null,
      errored: false,
      showNavigation: false,
      promptConfig: false,
      showSidepanel: false
    };
  },
  computed: {
    ...mapState(["allFomoTypes"]),
    activeFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 1);
    },
    inactiveFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 0);
    }
  },
  methods: {
    ...mapMutations([
      "updateAllFomoTypes",
      "toggleLoader",
      "updateApiResponse"
    ]),
    fetchSiteFomo: function() {
      const url = this.getApiUrl("fomo");
      Axios.get(url)
        .then(({ data }) => {
          this.listData = data.data.fomos;
          this.widgetData = data.data.includes.widget;
        })
        .catch(({ response }) => {
          var msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
          this.updateApiResponse(msg);
        })
        .finally(() => this.toggleLoader(false));
    },
    fetchAllFomo: function() {
      if (!this.allFomoTypes) {
        const url = this.getApiUrl("fomo/all");
        Axios.get(url)
          .then(({ data }) => {
            this.updateAllFomoTypes(data.data);
          })
          .catch(({ response }) => {
            var msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
            this.updateApiResponse(msg);
          })
          .finally(() => this.toggleLoader(false));
      }
    },
    createFomo: function(id) {
      const url = this.getApiUrl("fomo");
      Axios.post(url, this.createFormData({ id: id })).then(({ data }) => {
        this.updateApiResponse(
          '<i class="fas fa-check-circle"></i> FOMO created with default values'
        );
        this.$router.push({
          name: "EditFomo",
          params: {
            fomoid: data.data.id,
            created: true
          }
        });
      });
    },
    updateStatus: function(statusName, id, status) {
      const urlTag =
        statusName == "status" ? "updateStatus" : "updatePromptStatus";
      const url = this.getApiUrl(`fomo/${urlTag}`);
      const params = {
        id: id,
        [statusName]: status == 0 ? 1 : 0
      };
      this.toggleLoader(true);
      var msg = null;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          if (data.data.status === "success") {
            this.listData = this.listData.map(item =>
              item.id === id
                ? {
                    ...item,
                    attributes: {
                      ...item.attributes,
                      [statusName]: params[statusName]
                    }
                  }
                : item
            );
            msg = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          }
        })
        .catch(({ response }) => {
          msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
        })
        .finally(() => {
          this.toggleLoader(false);
          this.updateApiResponse(msg);
        });
    },
    saveWidgetData: function(value) {
      const postArray = [];
      const params = {
        id: value.id,
        is_looping: value.attributes.is_looping,
        time_duration: value.attributes.time_duration,
        time_interval: value.attributes.time_interval
      };
      postArray.push(
        Axios.post(
          this.getApiUrl(`fomo/updateWidget`),
          this.createFormData(params)
        )
      );
      if (value.attributes.status !== this.widgetData.attributes.status) {
        var params2 = {
          id: value.id,
          status: value.attributes.status
        };
        postArray.push(
          Axios.post(
            this.getApiUrl(`fomo/updateWidgetStatus`),
            this.createFormData(params2)
          )
        );
      }
      this.toggleLoader(true);
      var msg = null;
      return Axios.all(postArray)
        .then(data => {
          msg = `<i class="fas fa-check-circle"></i> ${data[0].data.data.message}`;
          this.widgetData.attributes = value.attributes;
          return true;
        })
        .catch(({ response }) => {
          msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
          return true;
        })
        .finally(() => {
          this.toggleLoader(false);
          this.updateApiResponse(msg);
        });
    }
  },
  mounted: function() {
    this.toggleLoader(true);
    this.fetchSiteFomo();
    this.fetchAllFomo();
  }
};
</script>

<style lang="less" scoped>
/* Fomo */
.fomoContainer {
  background: #f9f9f9;
  overflow: hidden;
  position: relative;

  h2 {
    font-size: 36px;
    letter-spacing: -0.94px;
    line-height: 41px;
    color: #333;
    margin: 30px 0 10px;
    small {
      background-color: var(--main-blue);
      color: #fff;
      font-size: 0.3em;
      font-weight: 500;
      padding: 0.4em 0.7em;
      letter-spacing: 0.05em;
      border-radius: 1em;
      transform: translate(-0.6em, -1.7em);
      display: inline-block;
      line-height: 1;
    }
    i {
      font-size: 0.9em;
      display: inline-block;
      margin-right: 5px;
      transform: translateY(-3px);
    }
  }

  p {
    font-size: 13px;
    color: #202020;
    line-height: 16px;
    margin: 0;
  }
}
.fomoList::v-deep {
  .configSettingsCta {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.8em 0.3em;
    z-index: 2;
  }
}

.fomo_block {
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .error,
  .warning {
    text-align: center;
    width: 100%;
    border: 1px solid;
    margin: 100px 0px;
    padding: 15px 10px 15px 50px;
  }

  .error {
    color: #9f6000;
    background-color: #feefb3;
  }

  .warning {
    color: #d8000c;
    background-color: #ffbaba;
  }
}

@media only screen and (max-width: 989px) {
  .fomo_block {
    flex-direction: column;
  }
}

/* Active FOMO */
.emailListing {
  padding-bottom: 5em;
}

/* Create FOMO */
.create_fomo {
  background: white;
  flex: 1;
  max-width: 400px;
  min-height: 100vh;
  .create-new .fomo_icon {
    color: #333;
    background: none;
    border: 1px dashed #979797;
  }
}

@media only screen and (max-width: 989px) {
  .active_fomo,
  .create_fomo {
    width: 96%;
    margin: 2%;
  }
}

.titleBlock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  border-bottom: 1px solid #e7e7e7;
}
.fomoContainer .titleBlock h2 {
  font-size: 20px;
  letter-spacing: -0.52px;
  line-height: 23px;
  color: #333;
  margin: 0;
}

.active_fomo {
  flex: 2;
}
.fomoHeader {
  // background: url("https://i.imgur.com/Dd9h0Qr.png") no-repeat scroll 0 center;
  // background-size: cover;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    max-width: 1000px;
    width: 80%;
    margin: auto;
  }
}
.statusBlock {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;

  div {
    padding: 0 30px;
    flex-grow: 1;
    border-left: 1px solid #bbb;

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }

    h3 {
      color: #333;
      margin: 0;
      font-size: 26px;
      line-height: 31px;
    }

    p {
      font-size: 12px;
      color: #333;
      line-height: 15px;
    }
  }
}
.btn_link {
  color: #333;
  text-decoration: underline;
  line-height: 15px;
}
.btn_link:hover {
  text-decoration: none;
}
.btn_link-small {
  font-size: 12px;
}
.newFomoList {
  padding: 20px 50px;
  position: relative;

  .new_list {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 0;

    .fomo_details {
      width: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
    }

    h3 {
      font-size: 12px;
      margin: 0;
      font-weight: normal;
      color: #555;
    }

    .btn {
      border: 1px solid #d5d5d5;
      padding: 0;
      color: #202020;
      font-size: 12px;
      font-weight: 600;
      &[disabled] {
        opacity: 0.5;
      }

      &.btn-setup {
        background: #f0f0f0;
        border: 1px solid #f0f0f0;
      }
    }
    &.comingSoon {
      pointer-events: none;
      .fomo_icon {
        background: transparent;
        border: 1px dashed var(--warning-orange);
        color: var(--warning-orange);
      }
      .btn {
        color: var(--warning-orange);
        background: #ffecda;
        border: none;
      }
    }
  }

  .fomo_icon {
    border-radius: 50%;
    min-width: 45px;
    background: #e2f3ff;
    color: #5988bc;
    position: relative;
    height: 45px;
    padding: 10px;
    font-size: 18px !important;
  }

  .upcomingFomoList {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 9;
    opacity: 0.7;
    left: 0;
    top: 0;
  }
}

.desktop {
  display: block;
}

.mobile {
  display: none;
}

@media only screen and (max-width: 1199px) {
  .titleBlock,
  .newFomoList {
    padding: 20px;
  }
}

@media only screen and (max-width: 989px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }

  .btnDrawer {
    background: #474747;
    color: #fff;
  }

  .md-drawer {
    width: 350px;
    max-width: calc(100vw - 125px);
    z-index: 99999;
  }
}

@media only screen and (max-width: 599px) {
  .fomoHeader {
    padding: 50px 5% 72px;
    flex-direction: column;
    text-align: center;
  }
  .fomoList {
    width: 90%;
  }

  .btnDrawer {
    margin-top: 25px;
  }
}
.ilist-enter-active,
.ilist-leave-active,
.alist-enter-active,
.alist-leave-active {
  transition: all 1s;
}
.alist-enter,
.alist-leave-to {
  opacity: 0;
}
.alist-leave-active {
  transform: translate(25%, -200px) scale(0.6);
  .loop(@i) when (@i <=10) {
    &:nth-child(@{i}) {
      transform: translate(25%, @i * -80px) scale(0.6);
    }
    .loop(@i + 1);
  }
  .loop(1);
}
.ilist-leave-active {
  transform: translate(-25%, -200px) scale(0.6);
  .loop(@i) when (@i <=10) {
    &:nth-child(@{i}) {
      transform: translate(-25%, @i * -80px) scale(0.6);
    }
    .loop(@i + 1);
  }
  .loop(1);
}
</style>

<style lang="less">
:root {
  --main-blue: #005dff;
  --warning-orange: #faa14d;
  --stroke-grey: #cccccc;
  --md-theme-default-accent: var(--main-blue) !important;
  --md-theme-default-accent-on-background: var(--main-blue) !important;
}
.fomoList {
  margin: 0 auto;
  width: 80%;
  max-width: 1000px;
  position: relative;
  .md-content {
    .md-tab {
      padding: 0;

      table {
        width: calc(100% - 1px);
        background-color: #fff;
        margin-bottom: 0;
        td {
          background-color: #fff;
          height: 50px;
        }
      }
      a {
        color: #333;
        font-size: 1.1em;
      }
    }
  }
}
.fomo-tabs.md-tabs {
  .md-tabs-navigation {
    background-color: transparent;
  }
  .md-tab-nav-button {
    font-size: 13px;
    height: 55px;
    color: var(--main-blue) !important;
    max-width: 100% !important;
  }

  &.md-theme-default .md-tabs-indicator {
    background-color: #fff;
    background-color: var(
      --md-theme-default-primary-on-background,
      var(--main-blue)
    );
  }
}
.fomoContainer {
  .multiselect {
    margin: 1em 0;
    &__tags {
      border-color: rgba(0, 0, 0, 0.42);
      border-radius: 0;
      border-width: 0 0 1px 0;
      padding: 8px 40px 0 0;
      cursor: pointer;
    }
    &__option--highlight,
    &__option--highlight:after,
    &__tag-icon:hover,
    &__tag {
      background-color: var(--main-blue);
    }
    &__tag-icon:after {
      color: #fff;
      opacity: 0.5;
    }
  }
}

.fomo_preview_block {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
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

  .fomo_preview_block-title {
    padding: 10px;
    display: flex;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #d5d5d5;
    i.tabUi {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      width: 4em;
      border-right: 1px solid #d5d5d5;
      left: 0;
      top: 0;
      em,
      &:before,
      &:after {
        content: "";
        border-radius: 50%;
        display: inline-block;
        width: 5px;
        height: 5px;
        margin: 0 2px;
      }
      &:before {
        background-color: #febc14;
      }
      &:after {
        background-color: #2dbca7;
      }
      em {
        background: #d74d4a;
      }
    }
    h2 {
      font-size: 16px;
      font-weight: 400;
      margin: 0 0 0 4em;
    }
  }
}
.fomo_preview_block-template {
  background: #f5f5f5;
  min-height: 620px;
  position: sticky;
  top: 70px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
  transform: translateZ(0);
  border: 4px solid #fff;
  border-top: 0;
}
.fomo_embed_visible {
  position: absolute;
  top: 55px;
  background: #fff;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  right: 0px;

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
    width: 100%;
    height: 130px;
    font-size: 12px;
    color: #66788a;
    pre {
      white-space: pre-line;
      word-break: break-all;
      margin: 0;
      padding: 0;
      background: transparent;
      border: none;
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
</style>
