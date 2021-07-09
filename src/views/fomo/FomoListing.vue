<template>
  <div class="home">
    <div class="fomoContainer">
      <Loader :status="loader" />
      <div class="fomo_block">
        <div class="active_fomo">
          <div class="fomoHeader">
            <div>
              <h2>Fomo Prompts</h2>
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
            <md-tabs class="fomo-tabs" md-alignment="fixed">
              <template slot="md-tab" slot-scope="{ tab }">
                {{ tab.label }}
                <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
              </template>
              <md-tab
                id="tab-home"
                md-label="Active Prompts"
                :md-template-data="{ badge: activeFomo.length }"
              >
                <div
                  class="table-responsive tableList"
                  v-if="activeFomo.length"
                >
                  <table class="table table-striped snap-top">
                    <thead>
                      <tr>
                        <th>FOMO Name</th>
                        <!-- <th>Category</th> -->
                        <!--<th>Clicks</th>
                        <th>Visible to</th>-->
                        <th class="align-center">Status</th>
                        <th class="align-center">Action</th>
                      </tr>
                    </thead>
                    <transition-group name="alist" tag="tbody">
                      <tr
                        class="listItem"
                        v-for="data in activeFomo"
                        :key="data.id"
                      >
                        <td class="font-size-mid">
                          {{ data.attributes.name }}
                        </td>
                        <!-- <td class="font-size-small">
                          {{ data.type }}
                        </td> -->
                        <td class="align-center">
                          <label
                            class="switch"
                            :for="data.id"
                            @click="
                              e => updateStatus(data.id, data.attributes.status)
                            "
                          >
                            <input
                              type="checkbox"
                              name="mainSwitch"
                              :checked="data.attributes.status == 1"
                            />
                            <i></i>
                          </label>
                        </td>
                        <td class="align-center">
                          <router-link :to="`/view/fomo/edit/${data.id}`">
                            <i class="fal fa-edit"></i>
                          </router-link>
                        </td>
                      </tr>
                    </transition-group>
                  </table>
                </div>
                <div v-else class="noData">
                  <i class="fas fa-info-circle"></i>
                  No active FOMOs available
                </div>
              </md-tab>
              <md-tab
                id="tab-pages"
                md-label="Paused Prompts"
                :md-template-data="{ badge: inactiveFomo.length }"
              >
                <div
                  class="table-responsive tableList"
                  v-if="inactiveFomo.length"
                >
                  <table class="table table-striped snap-top">
                    <thead>
                      <tr>
                        <th>FOMO Name</th>
                        <!-- <th>Category</th> -->
                        <!--<th>Clicks</th>
                        <th>Visible to</th>-->
                        <th class="align-center">Status</th>
                        <th class="align-center">Action</th>
                      </tr>
                    </thead>
                    <transition-group name="ilist" tag="tbody">
                      <tr v-for="data in inactiveFomo" :key="data.id">
                        <td class="font-size-mid">
                          {{ data.attributes.name }}
                        </td>
                        <!-- <td class="font-size-small">
                          {{ data.type }}
                        </td> -->
                        <td class="align-center">
                          <label
                            class="switch"
                            :for="data.id"
                            @click="
                              e => updateStatus(data.id, data.attributes.status)
                            "
                          >
                            <input
                              type="checkbox"
                              name="mainSwitch"
                              :checked="data.attributes.status === 1"
                            />
                            <i></i>
                          </label>
                        </td>
                        <td class="align-center">
                          <router-link :to="`/view/fomo/edit/${data.id}`">
                            <i class="fal fa-edit"></i>
                          </router-link>
                        </td>
                      </tr>
                    </transition-group>
                  </table>
                </div>
                <div v-else class="noData">
                  <i class="fas fa-info-circle"></i>
                  No paused FOMOs available
                </div></md-tab
              >
            </md-tabs>
          </div>
        </div>
        <div class="create_fomo desktop">
          <div class="titleBlock">
            <h2>Create New</h2>
            <a href="#" class="btn_link btn_link-small">View all templates</a>
          </div>
          <div class="newFomoList">
            <div
              class="new_list"
              v-for="template in templates"
              :key="template.id"
            >
              <md-icon class="fomo_icon">
                <span>V</span>
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
              <div
                class="new_list"
                v-for="template in templates"
                :key="template.id"
              >
                <md-icon class="fomo_icon">
                  <span>V</span>
                  <i :class="`fomoIcon icon_${template.type}`"></i>
                </md-icon>
                <div class="fomo_details">
                  <h3>{{ template.attributes.name }}</h3>
                </div>
                <md-button
                  v-if="!template.attributes.disabled"
                  :md-ripple="false"
                  class="md-dense btn"
                  >Add</md-button
                >
              </div>
            </div>
          </div>
        </md-drawer>
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
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
//import Loader from "@/components/Loader.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "FomoListing",
  mixins: ["createFormData", "getApiUrl"],
  components: { Loader },
  data: function() {
    return {
      listData: null,
      templates: [],
      loader: true,
      errored: false,
      showNavigation: false,
      showSidepanel: false,
      apiMessage: false,
      apiResponse: null
    };
  },
  computed: {
    activeFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 1);
    },
    inactiveFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 0);
    }
  },
  methods: {
    fetchSiteFomo: function() {
      const url = this.getApiUrl("fomo");
      Axios.get(url)
        .then(({ data }) => {
          this.listData = data.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loader = false));
    },

    fetchAllFomo: function() {
      const url = this.getApiUrl("fomo/all");
      Axios.get(url)
        .then(({ data }) => {
          this.templates = data.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loader = false));
    },
    createFomo: function(id) {
      const url = this.getApiUrl("fomo");
      Axios.post(url, this.createFormData({ id: id })).then(({ data }) => {
        this.$router.push({
          name: "FomoSelectTemplate",
          params: {
            fomoId: data.data.id,
            newFomo: true
          }
        });
      });
    },
    updateStatus: function(id, status) {
      const url = this.getApiUrl("fomo/updateStatus");
      const params = {
        id: id,
        status: status == 0 ? 1 : 0
      };
      this.loader = true;
      Axios.post(url, this.createFormData(params))
        .then(({ data }) => {
          if (data.data.status === "success") {
            this.listData = this.listData.map(item =>
              item.id === id
                ? {
                    ...item,
                    attributes: { ...item.attributes, status: params.status }
                  }
                : item
            );
            this.apiResponse = `<i class="fas fa-check-circle"></i> ${data.data.message}`;
          } else {
            this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${data.data.message}`;
          }
          this.apiMessage = true;
        })
        .catch(({ error }) => {
          this.apiResponse = `<i class="fas fa-exclamation-circle"></i> ${error.data.message}`;
          this.apiMessage = true;
          console.log(error);
        })
        .finally(() => (this.loader = false));

      // Change status using ID & !status
    }
  },
  mounted: function() {
    this.fetchSiteFomo();
    this.fetchAllFomo();
  }
};
</script>

<style lang="less" scoped>
@blue: #187aff;
.md-tabs-navigation i {
  background: red;
  color: #fff;
  font-style: normal;
  width: 1.5em;
  height: 1.5em;
  display: inline-flex;
  font-size: 0.8em;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -0.6em;
}
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
  }

  p {
    font-size: 13px;
    color: #202020;
    line-height: 16px;
    margin: 0;
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
  background: url("https://i.imgur.com/Dd9h0Qr.png") no-repeat scroll 0 center;
  background-size: cover;
  padding: 50px 0 72px;
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

/* tableList table */
.tableList {
  thead tr th {
    background: #eaeaea;
    font-weight: 500;
    border-bottom: 1px solid #b1b1b1;
    font-size: 12px;
    line-height: 15px;
    color: #000;
    font-weight: bold;
    padding: 10px;
    text-align: left;
  }

  tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  tbody tr td {
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    padding: 10px;

    &:first-child {
      border-left: 1px solid #eee;
    }
    &:last-child {
      border-right: 1px solid #eee;
    }
  }

  .icon_block {
    display: flex;
    align-items: center;

    .fomo_icon {
      width: 25px;
      height: 25px;
      padding: 6px;
      box-sizing: border-box;
      margin: 1px;
      border-radius: 50%;
    }
  }

  .font-size-mid {
    font-size: 12px;
    color: #202020;
  }

  .font-size-small {
    font-size: 10px;
    color: #999;
  }
  .align-center {
    text-align: center;
  }

  .table.table-striped {
    border-collapse: collapse;
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

      &.btn-setup {
        background: #f0f0f0;
        border: 1px solid #f0f0f0;
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

    span {
      background: @blue;
      border-radius: 50%;
      padding: 3px 5px;
      font-size: 9px;
      color: #fff;
      position: absolute;
      top: 0;
      right: -5px;
      font-family: sans-serif;
      line-height: 12px;
      font-weight: normal;
      width: 16px;
      height: 16px;
    }
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

.noData {
  padding: 20px;
  color: #2196f3;
  display: flex;
  align-items: center;
  .fas {
    font-size: 24px;
    margin-right: 10px;
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
@blue: #187aff;
.fomoList {
  margin: -38px auto 0;
  width: 80%;
  max-width: 1000px;
  .md-content {
    .md-tab {
      padding: 0;

      table {
        width: calc(100% - 1px);
        background-color: #fff;
        margin-bottom: 0;
        td {
          background-color: #fff;
        }
      }
    }
  }
}
.fomo-tabs.md-tabs {
  .md-tab-nav-button {
    background: #187aff;
    border-left: 1px solid #0662de;
    flex-grow: 1;
    font-size: 13px;
    color: #ffffff !important;
    height: 38px;
    max-width: 100% !important;
    &:first-child {
      border-left: none;
    }
    &.md-active {
      background: #fff;
      color: @blue !important;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &.md-theme-default .md-tabs-indicator {
    background-color: #fff;
    background-color: var(--md-theme-default-primary-on-background, @blue);
    top: 0;
  }
}
</style>
