<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a class="link-back" @click.prevent="handleBack">
          <i class="fa fa-long-arrow-left"
            ><md-tooltip md-direction="right">Back</md-tooltip></i
          >
        </a>
        <div class="title">
          <div class="icon far fa-bookmark margin-right-10"></div>
          <span>{{ title }}</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
          <h1>{{ title }}</h1>
        </div>
        <!-- AN ENHANCEMENT TO BE WORKD ON NEXT PHASE -->
        <!-- <div class="md-layout-item md-size-25 dispMidRight">
          <md-button class="md-raised btn-custom-default">
            <i class="fas fa-plus"></i> Create a blank email
          </md-button>
        </div> -->
        <section class="md-layout-item">
          <div
            :class="[
              'templateBox',
              { active: template.id_theme == activeThemeId },
            ]"
            v-for="(template, index) in data"
            :key="template.id_theme"
          >
            <div class="boxView">
              <img :src="getImg(template.id_theme)" alt="" />
            </div>
            <div class="boxFooter">
              <div>
                <!-- <h4>{{ template.tpl_name }}</h4> -->
                <strong v-if="template.id_theme == activeThemeId"
                  >Active:
                </strong>
                <small>Template {{ index + 1 }}</small>
              </div>
              <md-button
                class="md-raised md-accent btn-custom-active"
                v-if="template.id_theme == activeThemeId"
                @click="e => save(template.id_theme)"
              >
                <i class="far fa-check-circle"></i>
                Customize
              </md-button>
              <md-button
                class="md-raised btn-custom-primary"
                v-else
                @click="e => save(template.id_theme)"
              >
                Change
              </md-button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmailTemplates",
  props: ["data", "close", "save", "fromEditPage", "title", "activeThemeId"],
  methods: {
    getImg: function(id) {
      return `${window.Config.callback_url}/public/assets/img/email_assets/email_template_${id}.png`;
    },
    handleBack: function() {
      if (this.fromEditPage) {
        this.close();
      } else window.history.back();
    },
  },
};
</script>
<style lang="less" scoped>
.changeTemplateView {
  margin: 7em 0;
  .container {
    max-width: 1024px;
  }
  section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .dispMidRight {
    justify-content: flex-end;
    display: flex;
    align-items: center;
  }
}
.templateBox {
  width: 48%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  position: relative;
  overflow: hidden;
  &.active,
  &:hover {
    .boxFooter {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &.active {
    .boxFooter {
      background-color: rgb(11, 169, 0, 0.8);
      .md-button {
        background-color: #ffffff !important;
        color: green !important;
      }
    }
  }
  .boxView {
    flex-grow: 1;
    display: flex;
    background-color: #ddefef;
    img {
      width: 50%;
      margin: auto;
      display: block;
    }
  }
  .boxFooter {
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.5s;
    padding: 10px;
    h4 {
      margin: 0;
    }
  }
}
</style>
