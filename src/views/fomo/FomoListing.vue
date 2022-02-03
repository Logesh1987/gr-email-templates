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
            <md-tabs class="fomo-tabs">
              <template slot="md-tab" slot-scope="{ tab }">
                {{ tab.label }}
                <small v-if="tab.data.badge">({{ tab.data.badge }})</small>
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
                        <th>Category</th>
                        <th class="align-center">Clicks</th>
                        <!-- <th>Visible to</th> -->
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
                        <td class="font-size-mid">
                          {{ mapCategory(data.type) }}
                        </td>
                        <td class="align-center">
                          {{ data.attributes.clicks }}
                        </td>
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
                          <router-link
                            class="mr-10"
                            :to="`/view/fomo/summary/${data.id}`"
                          >
                            <i class="far fa-eye"></i>
                          </router-link>
                          <router-link :to="`/view/fomo/edit/${data.id}`">
                            <i class="fal fa-edit"></i>
                          </router-link>
                        </td>
                      </tr>
                    </transition-group>
                  </table>
                </div>
                <div v-else class="noData">
                  <figure>
                    <img :src="getAssetUrl(`admin/no-contest.jpg`)" />
                  </figure>
                  <figcaption>
                    <h3>No Fomos Found</h3>
                    <p>Create one from the list beside</p>
                    <br />
                    <p>
                      You can run multiple FOMOs to populate your following and
                      drive more sales on ordinary days or specific occasions.
                    </p>
                    <div>
                      <h4 class="mt-0 mb-10">What is FOMO Marketing?</h4>
                      <p>
                        FOMO is a form of marketing where you leverage the
                        consumers’ desire to grab every opportunity that they
                        get. The messaging in it is framed such that you push
                        the customers to make an impulse purchase rather than
                        regretting the lack of action later.
                      </p>
                    </div>
                  </figcaption>
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
                        <th>Category</th>
                        <th class="align-center">Clicks</th>
                        <!--<th>Visible to</th>-->
                        <th class="align-center">Status</th>
                        <th class="align-center">Action</th>
                      </tr>
                    </thead>
                    <transition-group name="ilist" tag="tbody">
                      <tr v-for="data in inactiveFomo" :key="data.id">
                        <td class="font-size-mid">
                          {{ data.attributes.name }}
                        </td>
                        <td class="font-size-mid">
                          {{ mapCategory(data.type) }}
                        </td>
                        <td class="align-center">
                          {{ data.attributes.clicks }}
                        </td>
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
                          <router-link
                            class="mr-10"
                            :to="`/view/fomo/summary/${data.id}`"
                          >
                            <i class="far fa-eye"></i>
                          </router-link>
                          <router-link :to="`/view/fomo/edit/${data.id}`">
                            <i class="fal fa-edit"></i>
                          </router-link>
                        </td>
                      </tr>
                    </transition-group>
                  </table>
                </div>
                <div v-else class="noData">
                  <figure>
                    <img :src="getAssetUrl(`admin/no-contest.jpg`)" />
                  </figure>
                  <figcaption>
                    <h3>No Fomos Found</h3>
                    <p>Create one from the list beside</p>
                    <br />
                    <p>
                      You can run multiple FOMOs to populate your following and
                      drive more sales on ordinary days or specific occasions.
                    </p>
                    <div>
                      <h4 class="mt-0 mb-10">What is FOMO Marketing?</h4>
                      <p>
                        FOMO is a form of marketing where you leverage the
                        consumers’ desire to grab every opportunity that they
                        get. The messaging in it is framed such that you push
                        the customers to make an impulse purchase rather than
                        regretting the lack of action later.
                      </p>
                    </div>
                  </figcaption>
                </div></md-tab
              >
            </md-tabs>
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
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Announcement</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Newsletter</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Timer FOMO</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Bonus Points</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Celebrate events</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Pay with points</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Referral Program</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Feedback</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Survey</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Poll</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
              >
            </div>
            <div class="new_list comingSoon">
              <md-icon class="fomo_icon">
                <i class="fal fa-hourglass-half"></i>
              </md-icon>
              <div class="fomo_details">
                <h3>Quiz</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn"
                >Coming soon</md-button
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

export default {
  name: "FomoListing",
  mixins: ["createFormData", "getApiUrl"],
  data: function() {
    return {
      listData: null,
      errored: false,
      showNavigation: false,
      showSidepanel: false,
      categories: {
        signup_bonus: "Signup Bonus",
        new_product_release: "New Product"
      }
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
    mapCategory: function(type) {
      return this.categories[type];
    },
    fetchSiteFomo: function() {
      const url = this.getApiUrl("fomo");
      Axios.get(url)
        .then(({ data }) => {
          this.listData = data.data;
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
    updateStatus: function(id, status) {
      const url = this.getApiUrl("fomo/updateStatus");
      const params = {
        id: id,
        status: status == 0 ? 1 : 0
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
                    attributes: { ...item.attributes, status: params.status }
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

      // Change status using ID & !status
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

.noData::v-deep {
  padding: 40px 20px;
  color: #2196f3;
  display: flex;
  align-items: center;
  figure {
    width: 50%;
    margin: 0;
  }
  figcaption {
    width: 50%;
    div {
      background: #eee;
      padding: 10px;
      margin-top: 30px;
      font-size: 0.9em;
      position: relative;
      &:before {
        content: "\f10e";
        font-family: "Font Awesome 5 Pro";
        font-weight: bold;
        font-size: 32px;
        position: absolute;
        right: 0.4em;
        top: -0.3em;
        opacity: 0.5;
      }
    }
  }
  h4 {
    color: rgba(0, 0, 0, 0.5);
    & + p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
    }
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
</style>
