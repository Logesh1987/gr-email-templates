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
      <!-- <ul class="amvip--landingList">
        <li>
          <input type="radio" name="onBoarding" id="vipTiers" />
          <label for="vipTiers">
            <h2>What is VIP Tiers?</h2>
            <section>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, sed?
              <router-link to="intro">More Info...</router-link>
            </section>
          </label>
        </li>
        <li>
          <input type="radio" name="onBoarding" id="benefits" />
          <label for="benefits">
            <h2>Benefits of VIP Tiers</h2>
            <section>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, sed?
              <router-link to="intro">More Info...</router-link>
            </section>
          </label>
        </li>
        <li>
          <input type="radio" name="onBoarding" id="key" />
          <label for="key">
            <h2>Key Features</h2>
            <section>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, sed?
              <router-link to="intro">More Info...</router-link>
            </section>
          </label>
        </li>
        <li>
          <input type="radio" name="onBoarding" id="stats" />
          <label for="stats">
            <h2>Stats</h2>
            <section>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, sed?
              <router-link to="intro">More Info...</router-link>
            </section>
          </label>
        </li>
      </ul> -->
      <ExpansionList
        :expandSingle="true"
        :dataSource="accordionData"
        v-on:listItemClicked="accordionItemSelected"
      ></ExpansionList>
      <div class="amvip--landingBtnwrap" v-visible="isNewUser">
        <!-- <button class="amvip--btn amvip--btnHome" @click="gotoSetup">
          Start Program <span class="icon-next-arrow"></span>
        </button> -->
        <md-button
          class="md-raised amvip--btn amvip--btnHome"
          @click="gotoSetup"
          >Start Program <span class="icon-next-arrow"></span
        ></md-button>
      </div>
    </section>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
</style>
<script>
import ExpansionList from "./../../components/vip-tier/ExpansionList";
import visible from "./../../directives/vip-tier/visible";
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
          title: "Manage Reward",
          routeLink: "manage-reward",
          key: 2,
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
      isNewUser: false,
    };
  },
  mounted() {
    this.accordionData = this.isNewUser
      ? this.newUserListData
      : this.existingUserListData;
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
