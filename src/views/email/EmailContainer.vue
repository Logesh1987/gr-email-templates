<template>
  <div class="emailContainer">
    <router-view></router-view>
    <md-snackbar
      class="msgSnack"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="apiMsgStatus"
    >
      <span v-html="apiResponse"></span>
    </md-snackbar>
    <Loader :status="loading" />
  </div>
</template>
<script>
import Loader from "@/components/Loader.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "EmailContainer",
  components: { Loader },
  data: function() {
    return {
      apiMsgStatus: false,
    };
  },
  watch: {
    apiResponse: function(val) {
      if (val !== null) {
        this.apiMsgStatus = true;
        setTimeout(() => this.updateApiResponse(null), 4500);
      }
    },
  },
  computed: {
    ...mapState(["loading", "apiResponse"]),
  },
  methods: {
    ...mapMutations(["updateApiResponse"]),
  },
};
</script>
