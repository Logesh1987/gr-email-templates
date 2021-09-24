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
        <div class="md-layout-item md-size-33 md-xsmall-size-100 md-small-size-50">
          <form>
            <div class="row">
              <label for="idPackage">
                Billing cycle <span class="fa fa-asterisk asterisk"></span>
              </label>
              <div class="radiobox">
                <md-radio v-model="radio" value="Monthly">Monthly</md-radio>
                <md-radio v-model="radio" value="Annually">Annually</md-radio>
                <mark><a href="https://apps.shopify.com/scratch-win" target="_blank">SAVE 30% + GET FREE 'SCRATCH AND WIN' APP*</a></mark>
              </div>
            </div>


            <div class="row">
              <label for="idPackage">
                Plan <span class="fa fa-asterisk asterisk"></span>
              </label>
              <md-field>
                <md-select
                  v-model="idPackage"
                  name="idPackage"
                  id="idPackage"
                  placeholder="Please select the plan"
                >
                  <md-option
                    v-for="plan in plans"
                    v-bind:value="plan.value"
                    :key="plan.id"
                    >{{ plan.txt }}</md-option
                  >
                </md-select>
              </md-field>
              <small>{{ idPackage }}</small>
            </div>

            
            <div class="row">
              <label for="isWl">
                Footer credit (Add on) <span class="fa fa-asterisk asterisk"></span>
              </label>
              <md-field>
                <md-select
                  v-model="footerCredit"
                  name="isWl"
                  id="isWl"
                  placeholder="Please select footer credit"
                >
                  <md-option
                    v-for="isWl in isWls"
                    v-bind:value="isWl.value"
                    :key="isWl.id"
                    >{{ isWl.txt }}</md-option
                  >
                </md-select>
              </md-field>
              <small>{{ footerCredit }}</small>
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
              <small>Result</small>
              <ButtonPrimary btnName="Upgrade"></ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
      <p class="alert small rightAlign">Note : Current subscription will be canceled and new subscription will be active</p>

    </div>
    <p class="small centerAlign">*Get a free upgrade to the unlimited users’ plan of Scratch and Win app (worth $299.40 per annum), when you create a paid subscription for any annual plan of Gratisfaction.</p>


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
      radio: false,
      idPackage: null,
      footerCredit: null,
      number1: 0,
      number2: 0,
      hero: [
         {
          heroHeading: "Plans",
          heroDesc: "Use this section to upgrade/downgrade and renew your plan"
        }
      ],
      heroHeading: "Your plan",
      desc: "Gratisfaction 10 Users for $0.06 USD / Monthly",
      plans: [
        { txt: "10 Users", value: "Free" },
        { txt: "15 Users", value: "$1.68 USD / Yearly" },
        { txt: "25 Users", value: "$2.52 USD / Yearly" },
        { txt: "Unlimited Users", value: "$3.36 USD / Yearly" }
      ],
      isWls: [
        { txt: "No Thanks", value: "No Thanks" },
        { txt: "Yes", value: "$0.50 USD / Yearly" }
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
    .radiobox mark {
      background: #a80ec3;
      color: #fff;
      padding: 2px 8px;
      vertical-align: middle;
      letter-spacing: 1px;
      font-weight: normal;
      font-size: 80%;
      border-radius: 20px;
      position: relative;
      top: -2px;
      display: inline-block;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>

<style lang="less">
.plansContainer {
}
</style>
