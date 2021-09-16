// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="announcementContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>

    <div class="announcement">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <label for="siteName"
            >Announcement/Offer Text <span class="fa fa-asterisk asterisk"></span
          ></label>
          <md-field md-inline>
            <md-textarea v-model="textarea" id="site_offfer"></md-textarea>
          </md-field>

          <label for="expiryTimeOption">
            Announcement Status <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-switch v-model="boolean" class="md-primary custom">
            <span v-if="boolean">On</span>
            <span v-if="!boolean">Off</span>
          </md-switch>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item rightAlign">
          <ButtonPrimary btnName="Save"></ButtonPrimary>
        </div>
      </div>
    </div>

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
      boolean: true,
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
  .announcement {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
  }
}
</style>

<style lang="less">
.announcementContainer {
}
</style>
