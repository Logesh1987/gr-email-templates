<template>
  <div class="amvip--landing">
    <div class="amvip--landingInner">
      <aside class="amvip--setupPage">
        <img src="./../../assets/vip-tier/vip-tier-logo-setup.png" alt="Logo" />
      </aside>
      <section class="amvip--landingContent">
        <ExpansionList
          :expandSingle="true"
          :dataSource="accordionData"
          v-on:listItemClicked="accordionItemSelected"
        ></ExpansionList>
        <div class="amvip--landingBtnwrap">
          <md-button class="md-raised amvip--btn" @click="gotoSetup"
            >Start Program <span class="far fa-arrow-right"></span
          ></md-button>
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
</style>
<script>
import ExpansionList from "./../../components/vip-tier/ExpansionList";
import visible from "./../../directives/vip-tier/visible";
import Axios from "axios";
export default {
  name: "Home",
  components: { ExpansionList },
  directives: { visible: visible },
  model: {
    prop: "accordionData",
  },
  data: () => {
    return {
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
        // {
        //   listType: "expansionlist",
        //   title: "Stats",
        //   content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, sed?`,
        //   showMoreBtn: true,
        //   moreBtnLink: "intro",
        //   moreBtnText: "Show More...",
        //   key: 4,
        // },
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
    this.accordionData = this.newUserListData;
    const url = this.getApiUrl("Tiers/settings");
    Axios.get(url)
      .then((res) => {
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
      .catch((err) => {
        this.responseData = err;
        this.showSnackbar = true;
      });
  },
  methods: {
    gotoSetup() {
      this.$router.push("/view/tiers/setupProgram");
    },
    accordionItemSelected(eve) {
      console.log("from home component", eve);
    },
  },
};
</script>
