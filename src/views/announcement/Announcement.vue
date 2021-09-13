// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="announcementContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>

    <ButtonPrimary></ButtonPrimary>

    <Loader :status="loader" />

    <Footer />
  </div>
</template>

<script>
//import Axios from "axios";
import Loader from "@/components/Loader.vue";
import Footer from "@/components/Footer.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import HeroBanner from "@/components/HeroBanner.vue";

export default {
  name: "Announcement",
  components: {
    Loader,
    Footer,
    ButtonPrimary,
    HeroBanner,
  },
  data: function() {
    return {
      loader: false,
      contentVisible: false,
      hero: [
         {
          heroHeading: "Announcements",
          heroDesc: "Use this feature to display special offers or announcements to your visitors."
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.announcementContainer {
  margin: 20px;
  font-size: 14px;
  .faqBanner {
    background: #010f49 url(../../assets/img/bg-heading-faq.jpg) no-repeat left
      center;
    background-size: cover;
    color: #fff;
    overflow: hidden;
    height: 115px;
    display: flex;
    align-items: center;
    padding: 15px 15%;
    margin-bottom: 20px;
    h2 {
      font-size: 18px;
      margin: 0;
      padding-right: 50px;
      margin-right: 50px;
      border-right: 1px solid #ddd;
      color: #ffffff;
    }
    p {
      color: #e6991c;
      margin: 0;
    }
  }
  .faq {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
    .boxTitle {
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    }
    .md-list {
      border: none;
      .md-list-item {
        .md-list-item-expand {
          border: none;
          &.md-button-clean {
            white-space: pre-line;
          }
          &.md-active .md-list-expand {
            padding: 16px;
          }
          .md-list-item-content {
            span.count {
              width: 20px;
            }
            span.question {
              width: 100%;
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
}
.faqFooterBanner {
  text-align: center;
  margin-top: 50px;
  h2 {
    font-size: 18px;
    color: #66788a;
  }
}
</style>

<style lang="less">
.announcementContainer {
}
</style>
