<template>
  <div class="embedStyle">
    <div class="fixedTopNav">
      <div class="level1">
        <span class="material-icons" @click.prevent="handleBack"
          >arrow_back</span
        >
        <span>Select embed style</span>
      </div>
      <div class="level2">
        <ul>
          <li v-on:click="myTab1" :class="{ active: isTab1 }">
            Individual Landing Pages
          </li>
          <!-- <li v-on:click="myTab2" :class="{ active: isTab2 }">Snippets</li> -->
        </ul>
      </div>
    </div>
    <div v-if="isTab1" class="selectTemplateBlock">
      <h1>Select Template</h1>
      <section class="md-layout-item">
        <div
          class="templateBox"
          v-for="(template, index) in templates"
          :key="template.id"
          :id="template.id"
        >
          <div class="boxView">
            <img :src="`images/template${template.id}.png`" alt="" />
          </div>
          <div class="boxFooter">
            <div>
              <!-- <h4>{{ template.tpl_name }}</h4> -->
              <small>Template {{ index + 1 }}</small>
            </div>
            <router-link :to="'/view/embed/style/' + template.id">
              <div
                v-if="selectedTemplateId == template.id"
                class="selectedTemplate"
              >
                <md-button class="md-raised btn-custom-default">Edit</md-button>
                <md-button class="md-raised btn-custom-primary" disabled
                  ><md-icon class="far fa-check-circle liveNowIcon"></md-icon>
                  LiveNow</md-button
                >
              </div>
              <md-button v-else class="md-raised btn-custom-default">
                Select & Edit
              </md-button>
            </router-link>
          </div>
        </div>
      </section>
      <p class="upcomingTemplate">
        Keep an eye for the upcoming templates… We will roll out soon!
      </p>
    </div>
    <div v-if="isTab2" class="snipBlock">
      <h1>Select Template</h1>

      <vsa-list initActive>
        <!-- Here you can use v-for to loop through items  -->
        <vsa-item>
          <vsa-heading>
            Participate Actions
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <ParticipateActions />
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            Celebrate Events
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <CelebrateEvents />
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            Newsletter
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <Newsletter />
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            Refer & Earn
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <ReferNearn />
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            Rewards
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <Carouselslide />
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import ParticipateActions from "../../components/ParticipateActions.vue";
import Newsletter from "../../components/Newsletter.vue";
import ReferNearn from "../../components/ReferNearn.vue";
import CelebrateEvents from "../../components/CelebrateEvents.vue";
import Carouselslide from "../../components/Carouselslide.vue";
import axios from "axios";

export default {
  name: "EmailListing",
  props: ["EmailEdit"],
  components: {
    Footer,
    ParticipateActions,
    Newsletter,
    ReferNearn,
    CelebrateEvents,
    Carouselslide,
  },
  data: function() {
    return {
      isTab1: true,
      isTab2: false,
      templates: [],
      selectedTemplateId: -1,
    };
  },
  mixins: ["createFormData"],
  methods: {
    myTab1: function() {
      this.isTab1 = true;
      this.isTab2 = false;
    },
    myTab2: function() {
      this.isTab2 = true;
      this.isTab1 = false;
    },
    handleBack: function() {
      if (this.EmailEdit) {
        this.close();
      } else window.history.back();
    },
  },
  mounted: function() {
    axios
      .get("https://run.mocky.io/v3/be60ca16-ee8c-45a7-b9b0-f7a908dd57a3")
      .then((res) => {
        this.templates = res.data.templates;
        this.selectedTemplateId = res.data.liveEmbedId;
      });
  },
};
</script>

<style lang="less" scoped>
.embedStyle {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .fixedTopNav {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 9;

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

    .level2 {
      display: flex;
      align-items: center;
      background: #333;
      justify-content: center;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          color: #777;
          font-size: 14px;
          font-weight: bold;
          display: inline-flex;
          padding: 10px 30px;
          cursor: pointer;
          &:hover {
            color: #d1d1d1;
          }
          &.active {
            color: #fff;
            position: relative;
            &:after {
              content: "";
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #fff;
              position: absolute;
              bottom: 0;
              left: 50%;
            }
          }
        }
      }
    }
  }

  .selectTemplateBlock,
  .snipBlock {
    padding: 120px 55px 55px 55px;

    section {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .templateBox {
        flex: 0 31%;
        margin-top: 2%;
        margin-right: 2%;
        @media only screen and (max-width: 989px) {
          flex: 0 48%;
        }
        @media only screen and (max-width: 599px) {
          flex: 0 100%;
        }
        .boxView img {
          border: 5px solid #000;
        }
        .boxFooter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0 0;
        }
      }
    }

    .upcomingTemplate {
      font-size: 12px;
      color: #c1b4b4;
      margin: 40px 0;
      text-align: center;
    }
  }
}
</style>
<style lang="less">
.selectTemplateBlock,
.snipBlock {
  .vsa-list {
    --vsa-max-width: 100%;
    --vsa-border-width: 0px;
    --vsa-highlight-color: rgba(190, 190, 190, 1);
    .vsa-item__trigger {
      flex-direction: row-reverse;
      justify-content: flex-end;
      border-top: 1px solid #d1d1d1 !important;
      &:focus,
      &:hover {
        outline: none;
        background-color: #f8f8f8;
        color: var(--vsa-text-color);
        .vsa-item__trigger__icon--is-default {
          &:before,
          &:after {
            background-color: var(--vsa-text-color);
          }
        }
      }
      .vsa-item__trigger__icon {
        margin-left: 0;
        margin-right: 20px;
      }
      .vsa-item__trigger__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    }
    .vsa-item__content {
      margin: 0;
      padding: var(--vsa-content-padding);
      background: rgb(239, 239, 239);
      background: linear-gradient(
        180deg,
        rgba(239, 239, 239, 1) 0%,
        rgba(251, 251, 251, 1) 100%
      );
    }
  }
  .selectedTemplate {
    button {
      margin: 0 10px;
      &.md-button.md-theme-default.md-raised {
        &.btn-custom-primary {
          background: #5bb74d;
          color: #fff;
          .liveNowIcon {
            color: #fff;
            font-size: 18px !important;
            line-height: 25px;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
