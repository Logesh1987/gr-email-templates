<template>
  <div class="amvip--landingGrey">
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
    <section class="amvip-accordContent">
      <section>
        <span class="icon-next-arrow goBack" @click="goBack"> </span>
        <h2>Benefits of <br />VIP Tiers</h2>

        <md-list :md-expand-single="true" id="introExpansionList">
          <md-list-item md-expand :md-expanded="true">
            <span class="md-list-item-text">Rewards</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                numquam sed architecto sunt. Quam, excepturi.
              </p>

              <md-tabs
                class="md-transparent"
                md-alignment="centered"
                id="vipIntro-tabContainer"
              >
                <md-tab id="tab-home" md-label="Once-off rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                      <li>
                        Get non financial reward<small
                          >e.g. personal invite to new stock viewing</small
                        >
                      </li>
                    </ul>
                  </section>
                </md-tab>
                <md-tab id="tab-pages" md-label="Ongoing rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
                <md-tab id="tab-posts" md-label="Other rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
              </md-tabs>
            </div>
          </md-list-item>

          <md-list-item md-expand>
            <span class="md-list-item-text">Admin Dashboard</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Admin Dashboard Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Mollitia, nam?
              </p>
            </div>
          </md-list-item>

          <md-list-item md-expand>
            <span class="md-list-item-text">Analytics</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Analytics Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Mollitia, nam?
              </p>
            </div>
          </md-list-item>
        </md-list>
      </section>
    </section>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home.less");
#introExpansionList {
  background: transparent;
  border: none;
  .md-list-item-container {
    border: none;
  }
}
#vipIntro-tabContainer {
  .md-tab {
    white-space: normal;
  }
  .md-tabs-navigation {
    > .md-button {
      white-space: normal;
    }
  }
}
</style>
<script>
export default {
  name: "Intro",
  components: {},
  methods: {
    goBack() {
      this.$router.push("/view/tiers/home");
    },
  },
};
</script>
