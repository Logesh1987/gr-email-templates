<template>
  <div class="fomoContainer">
    <router-view
      fomoId="fomoId"
      fomoType="fomoType"
      displayData="displayData"
      fomoData="fomoData"
      templatesData="templatesData"
      otherData="otherData"
    ></router-view>
    <md-snackbar
      class="msgSnack"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="apiMsgStatus"
    >
      <span v-html="apiResponse"></span>
    </md-snackbar>
    <FeedbackPopup :url="getApiUrl('fomo/sendReview')" />
    <Loader :status="loading" />
  </div>
</template>
<script>
import FeedbackPopup from "@/components/FeedbackPopup.vue";
import Loader from "@/components/Loader.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "FomoContainer",
  components: { Loader, FeedbackPopup },
  mixins: ["getApiUrl"],
  data: function() {
    return {
      apiMsgStatus: false
    };
  },
  computed: {
    ...mapState(["loading", "apiResponse", "fomoId", "fomoTemplateId"])
  },
  watch: {
    fomoId: function(val, oldVal) {
      if (val !== oldVal) {
        this.getFomo();
      }
    },
    apiResponse: function(val) {
      if (val !== null) {
        this.apiMsgStatus = true;
        setTimeout(() => this.updateApiResponse(null), 4500);
      }
    }
  },
  methods: {
    ...mapActions(["getFomo"]),
    ...mapMutations(["updateApiResponse"]),
    setProp: function(name, data) {
      this[name] = data;
    }
  }
};
</script>
<style lang="less" scoped>
.fomoContainer {
  ::v-deep {
    .md-tabs-indicator {
      height: 4px;
    }
  }
}
</style>
