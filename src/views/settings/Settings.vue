// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="settingContainer">
    <Notifications />
    <md-tabs>
      <md-tab id="businessSettings" md-label="Business Settings"></md-tab>
      <md-tab id="pointsExpiry" md-label="Points Expiry"></md-tab>
    </md-tabs>

    <div class="businessSettings">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <label for="siteName"
            >Business Name <span class="fa fa-asterisk asterisk"></span
          ></label>
          <md-field md-inline>
            <md-input
              id="siteName"
              v-model="inline"
              placeholder="Your business name"
            ></md-input>
          </md-field>

          <label for="site_url" class="flexBlock">
            Site URL <span class="fa fa-asterisk asterisk"></span>
            <span class="material-icons">
              help
              <md-tooltip
                >Enter the website URL on which Gratisfaction is
                installed.</md-tooltip
              >
            </span>
          </label>
          <md-field md-inline>
            <md-input
              id="site_url"
              v-model="inline"
              placeholder="http://www.example.com"
            ></md-input>
          </md-field>

          <label for="site_timezone">
            Time zone <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field>
            <md-select
              v-model="site_timezone"
              name="site_timezone"
              id="site_timezone"
              placeholder="(UTC-11:00) Pacific/Pago_Pago"
            >
              <md-input
                id="site_timezone"
                class="selectSearch"
                v-model="inline"
                placeholder=""
              ></md-input>
              <md-option value="m/d/Y">(UTC-11:00) Pacific/Pago_Pago</md-option>
              <md-option value="d/m/Y">(UTC-11:00) Pacific/Pago_Pago</md-option>
              <md-option value="Y/m/d">(UTC-11:00) Pacific/Pago_Pago</md-option>
            </md-select>
          </md-field>

          <label for="date_display">
            Date Format <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field>
            <md-select
              v-model="date_display"
              name="date_display"
              id="date_display"
              placeholder="DD/MM/YYYY"
            >
              <md-option value="m/d/Y">MM/DD/YYYY</md-option>
              <md-option value="d/m/Y">DD/MM/YYYY</md-option>
              <md-option value="Y/m/d">YYYY/MM/DD</md-option>
            </md-select>
          </md-field>

          <label for="site_reply_to" class="flexBlock">
            Support Email Address <span class="fa fa-asterisk asterisk"></span>
            <span class="material-icons">
              help
              <md-tooltip
                >Enter the email address that members can contact you on for any
                support.</md-tooltip
              >
            </span>
          </label>
          <md-field md-inline>
            <md-input
              id="site_reply_to"
              v-model="inline"
              placeholder="support@yourdomain.com"
            ></md-input>
          </md-field>

          <label for="site_email_from" class="flexBlock">
            Email From Address <span class="fa fa-asterisk asterisk"></span>
            <span class="material-icons">
              help
              <md-tooltip
                >All system generated emails to entrants will have this as the
                'Sender's email address. Ensure it starts with
                NoReply@</md-tooltip
              >
            </span>
          </label>
          <md-field md-inline>
            <span class="md-prefix">NoReply@</span>
            <md-input
              id="site_email_from"
              v-model="inline"
              placeholder="yourdomain.com"
            ></md-input>
          </md-field>
        </div>
        <div class="md-layout-item">
          <label for="exclusion_period" class="flexBlock">
            Exclusion Period for Redemption (in days)
            <span class="fa fa-asterisk asterisk"></span>
            <span class="material-icons">
              help
              <md-tooltip
                >Points earned will not be redeemable within this exclusion
                period. This is useful to avoid points being redeemed before
                your customer activates a refund.</md-tooltip
              >
            </span>
          </label>
          <md-field md-inline>
            <md-input id="exclusion_period" v-model="inline"></md-input>
          </md-field>
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
import Footer from "../../components/Footer.vue";
import Notifications from "../../components/Notifications.vue";
import ButtonPrimary from "../../components/ButtonPrimary.vue";

export default {
  name: "Settings",
  components: {
    Loader,
    Footer,
    Notifications,
    ButtonPrimary
  },
  data: function() {
    return {
      loader: false
    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.settingContainer {
  margin: 20px;
  .businessSettings {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
  }
  .rightAlign {
    text-align: right;
  }
}
</style>

<style lang="less">
.settingContainer {
  .md-tabs.md-theme-default .md-tabs-navigation .md-button.md-active {
    color: #fb5903;
  }
  .md-tabs.md-theme-default .md-tabs-indicator {
    background: #fb5903;
  }
  .md-field {
    border-radius: 4px;
    border: solid 1px #e5e5e5;
    background: #ffffff;
    padding: 0 10px;
    min-height: auto;

    &:hover {
      border-color: #ccc;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(204, 204, 204, 0.6);
    }

    &:focus {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    }

    &:after,
    &:before {
      height: 0;
    }

    label {
      left: 15px;
    }

    .material-icons {
      margin-top: 5px;
    }
  }
  .asterisk {
    color: #e85855;
    font-size: 7px;
    vertical-align: super;
    display: inline;
  }
  .material-icons {
    font-size: 21px;
  }
  label.flexBlock {
    display: flex;
  }
  .md-field .md-prefix {
    display: block;
    line-height: 20px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    background-color: #eee;
    margin-left: -10px;
    margin-right: 10px;
  }
}
.md-select-menu {
  .md-list {
    .selectSearch {
      padding: 3px;
      margin: 0 5px;
    }
    .md-list-item-content {
      min-height: 40px;
      padding: 0;
    }
  }
}
</style>
