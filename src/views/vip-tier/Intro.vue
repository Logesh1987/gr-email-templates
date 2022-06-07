<template>
  <div class="amvip--landingGrey">
    <aside class="amvip--setupPage">
      <img :src="getAssetUrl('vip_tiers/vip-tier-logo-setup.png')" alt="Logo" />
    </aside>
    <section class="amvip-twoColContent">
      <div class="amvip--setUpTier">
        <hgroup class="amvip--pageHeader">
          <div class="headerGroup">
            <span class="far fa-arrow-left" @click="goBack"> </span>
            <h2>Benefits of VIP tiers</h2>
          </div>
        </hgroup>
      </div>
      <section class="amvip--container amvip-accordContent">
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
                      <li>Get XX points</li>
                      <li>Get instant coupon</li>
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
                      <li>Get XX points</li>
                      <li>Get instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
                <md-tab id="tab-posts" md-label="Other rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
              </md-tabs>
            </div>
          </md-list-item>

          <md-list-item md-expand>
            <span class="md-list-item-text">Admin dashboard</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Admin dashboard lorem ipsum dolor sit amet consectetur
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
                Analytics lorem ipsum dolor sit amet consectetur adipisicing
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
