<template>
  <div class="embedCreate">
    <div class="fixedTopNav">
      <div class="level1">        
        <header class="pageHeader">
          <i class="fa fa-laptop-code"></i>
          Embed Campaign
          <div class="innerLevel">
            <span class="goBack">
              <i class="fa fa-arrow-left"></i>
              Campaign Template
            </span>
            <md-button class="md-raised md-primary primaryBtn mt-10"
              ><i class="fa-solid fa-rectangle-list"></i> Your Campaign List</md-button
            >
          </div>
        </header>
      </div>
    </div>
    <div class="selectTemplate">
      <div class="categoryList">
        <h2>Select Campaign Template Category</h2>
        <ul>
          <li><i class="fa fa-border-all"></i> All (12)</li>
          <li><i class="fa fa-user-graduate"></i> Education (2)</li>
          <li><i class="fa fa-cart-minus"></i> All (8)</li>
          <li><i class="fa fa-rocket-launch"></i> All (8)</li>
          <li><i class="fa fa-badge-percent"></i> All (8)</li>
          <li><i class="fa fa-clothes-hanger"></i> All (8)</li>
        </ul>
      </div>
      <div class="selectTemplateBlock">
        <section class="md-layout-item">
          <div
            class="templateBox"
            v-for="(template, index) in templates"
            :key="template.id"
            :id="template.id"
          >
            <div class="boxView">
              <img :src="`images/template${template.id}.png`" alt="" />
              <div class="boxViewHover">
                <md-button class="md-raised md-primary primaryBtn mt-10"
                  ><i class="fa fa-rocket-launch"></i> Smart Publish List</md-button
                >
                <md-button class="md-raised md-primary primaryBtn mt-10"
                  ><i class="fa fa-angles-right"></i> Custom & Publish</md-button
                >
                <md-button class="md-raised md-primary primaryBtn mt-10 preview"
                  ><i class="fa fa-eye"></i> Preview</md-button
                >
              </div>
            </div>
            <div class="boxFooter">
              <small>Template {{ index + 1 }}</small>
            </div>
          </div>
        </section>
        <p class="upcomingTemplate">
          Keep an eye for the upcoming templates… We will roll out soon!
        </p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
  import Footer from "../../components/Footer.vue";
  import axios from "axios";

  export default {
    name: "EmbedCreate",
    props: ["EmailEdit"],
    components: {
      Footer,
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

@import url("./../../assets/styles/variables.less");

.embedCreate {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  button.md-button.primaryBtn {
    background-color: @primaryColor !important;
  }

  .fixedTopNav {
    position: fixed;
    width: 100%;
    background: rgb(218,218,218);
    background: linear-gradient(180deg, rgba(218,218,218,1) 0%, rgba(248,248,248,1) 30%, rgba(248,248,248,1) 100%);
    z-index: 9;

    .level1 {
      .innerLevel {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: baseline;
      }
    }
  }

  .selectTemplate {
    padding: 97px 0 55px 0;
    display:flex;
    .categoryList {
      flex:1;
      max-width:250px;
      margin-right:20px;      
      border-right: 1px solid #ccc;
      background:#ffffff;
      h2 {
        font-size:12px;
        padding:10px 20px;     
        border-bottom: 1px solid #ccc;
        background:#f8f8f8;
      }
      ul {
        li {
          list-style:none;
          padding:7px 0;
          &:hover {
            color:#ccc;
            cursor:pointer;
          }
        }
      }
    }

    .selectTemplateBlock {

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
          .boxView {
            position:relative;
            border-radius:10px;
            overflow:hidden;
            border: 1px solid #d1d1d1;

            .boxViewHover {
              display:none;
            }
            
            &:hover .boxViewHover {
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: start;
              width: 100%;
              height: 100%;
              padding-top: 15px;
              background: rgba(0, 0, 0, 0.5);

              button.md-button.primaryBtn.preview {
                background:transparent !important;
                border:1px solid #ffffff;
              }
            }
          }
          .boxFooter {
            display: flex;
            justify-content: center;
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
}
</style>
<style lang="less">
.selectTemplateBlock {
  flex:2;
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
