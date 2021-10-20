<template>
  <div class="amvip--landing">
    <div class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <aside class="amvip--landingBrand">
      <div>
        <span class="icon-crown"></span>
        <h2>VIP</h2>
        <h3>Tiers</h3>
        <small>Beta</small>
      </div>
    </aside>
    <section class="amvip--landingContent">
      <ExpansionList
        :expandSingle="true"
        :dataSource="accordionData"
        v-on:listItemClicked="accordionItemSelected"
      ></ExpansionList>
      <div class="amvip--landingBtnwrap">
        <md-button
          class="md-raised amvip--btn amvip--btnHome"
          @click="gotoSetup"
          >Start Program <span class="far fa-arrow-left"></span
        ></md-button>
      </div>
    </section>
    <Loader :status="loader"></Loader>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
</style>
<script>
import ExpansionList from "./../../components/vip-tier/ExpansionList";
import visible from "./../../directives/vip-tier/visible";
import Loader from "./../../components/Loader";
import Axios from "axios";
export default {
  name: "Home",
  components: { ExpansionList, Loader },
  directives: { visible: visible },
  model: {
    prop: "accordionData",
  },
  data: () => {
    return {
      loader: false,
      newUserListData: [
        {
          listType: "expansionlist",
          title: "What is VIP Tiers?",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, sed?`,
          showMoreBtn: true,
          moreBtnLink: "intro",
          moreBtnText: "Show More...",
          key: 1,
        },
        {
          listType: "expansionlist",
          title: `Benefits of VIP Tiers`,
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, sed?`,
          showMoreBtn: true,
          moreBtnLink: "intro",
          moreBtnText: "Show More...",
          key: 2,
        },
        {
          listType: "expansionlist",
          title: "Key Features",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, sed?`,
          showMoreBtn: true,
          moreBtnLink: "intro",
          moreBtnText: "Show More...",
          key: 3,
        },
        {
          listType: "expansionlist",
          title: "Stats",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, sed?`,
          showMoreBtn: true,
          moreBtnLink: "intro",
          moreBtnText: "Show More...",
          key: 4,
        },
      ],
      existingUserListData: [
        {
          listType: "routeList",
          title: "Edit Program",
          routeLink: "editProgram",
          key: 1,
        },
        {
          listType: "routeList",
          title: "Add Tier",
          routeLink: "add-tier",
          key: 3,
        },
        {
          listType: "routeList",
          title: "Manage Tier",
          routeLink: "manage-tier",
          key: 4,
        },
      ],
      accordionData: [],
      isNewUser: true,
    };
  },
  mounted() {
    this.loader = true;
    this.accordionData = this.newUserListData;
    const url = this.getApiUrl("Tiers/settings");
    Axios.get(url)
      .then(res => {
        if (res.data.error) {
          this.responseData = res.data.error.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          return false;
        } else {
          this.responseData = res.data.data.message;
          this.showSnackbar = this.responseData && this.responseData.length > 0;
          this.isNewUser = res.data.data.tier_id == null ? true : false;
          if (!this.isNewUser) {
            this.$router.push("/view/tiers/manage-tier");
          }
        }
      })
      .catch(err => {
        this.responseData = err;
        this.showSnackbar = true;
      })
      .finally(() => {
        this.loader = false;
      });
  },
  methods: {
    gotoSetup() {
      this.$router.push("/view/tiers/setupProgram");
    },
    accordionItemSelected(eve) {
      console.log("from home component", eve);
      // eve.data.title = "Arun Kumar Subburaj...";
    },
  },
};
</script>
