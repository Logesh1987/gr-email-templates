// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="plansContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>
    <div class="headingBlock">
      <Heading2 :hero-heading="heroHeading"></Heading2>
      <p>{{ desc }}</p>
    </div>

    <div class="plans">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-33">
          <form>
            <div class="row">
              <label for="idPackage">
                Plan <span class="fa fa-asterisk asterisk"></span>
              </label>
              <md-field>
                <md-select
                  v-model="idPackage"
                  name="idPackage"
                  id="idPackage"
                  placeholder="10 users"
                >
                  <md-option
                    v-for="plan in plans"
                    v-bind:value="plan.value"
                    :key="plan.id"
                    >{{ plan.value }}</md-option
                  >
                </md-select>
              </md-field>
              <small>$0.20 USD / Monthly</small>
            </div>

            
            <div class="row">
              <label for="isWl">
                Footer credit (Add on) <span class="fa fa-asterisk asterisk"></span>
              </label>
              <md-field>
                <md-select
                  v-model="isWl"
                  name="isWl"
                  id="isWl"
                  placeholder="No Thanks"
                >
                  <md-option
                    v-for="isWl in isWls"
                    v-bind:value="isWl.value"
                    :key="isWl.id"
                    >{{ isWl.value }}</md-option
                  >
                </md-select>
              </md-field>
              <small>$0.20 USD / Monthly</small>
            </div>

            
            <div class="row">
              <label for="planCoupon">
                Coupon <span class="fa fa-asterisk asterisk"></span>
              </label>
              <md-field md-inline>
                <md-input
                  id="planCoupon"
                  v-model="inline"
                  placeholder="Enter Coupon"
                ></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
              <ButtonPrimary btnName="Apply"></ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item rightAlign">
          <div class="totalBlock">
            <label for="total"> Total</label>
            <div class="btnBlock">
              <small>$0.20 USD / Monthly</small>
              <ButtonPrimary btnName="Upgrade"></ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
      <p class="alert small rightAlign">Note : Current subscription will be canceled and new subscription will be active</p>

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
import Heading2 from "@/components/Heading2.vue";

export default {
  name: "Announcement",
  components: {
    Loader,
    Footer,
    ButtonPrimary,
    HeroBanner,
    Heading2
  },
  data: function() {
    return {
      loader: false,
      contentVisible: false,
      boolean: true,
      hero: [
         {
          heroHeading: "Plans",
          heroDesc: "Use this section to upgrade/downgrade and renew your plan"
        }
      ],
      heroHeading: "Your plan",
      desc: "Gratisfaction 10 Users for $0.06 USD / Monthly",
      plans: [
        { value: "10 Users" },
        { value: "15 Users" },
        { value: "25 Users" },
        { value: "Unlimited Users" }
      ],
      isWls: [
        { value: "No Thanks" },
        { value: "Yes" }
      ],
    }
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.plansContainer {
  margin: 20px;
  font-size: 14px;
  .plans {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
    .totalBlock {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f8f8;
      padding: 10px 20px;
      label {
        font-weight: bold;
      }
      .btnBlock {
        display: flex;
        align-items: center;
        small {
          padding-right: 20px;
          color: green;
          font-size: 120%;
        }
      }
    }
  }
}
</style>

<style lang="less">
.plansContainer {
}
</style>
