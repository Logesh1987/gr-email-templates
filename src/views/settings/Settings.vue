// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="settingContainer">
    <Notifications />
    <md-tabs>
      <md-tab
        id="businessSettings"
        v-on:click="activetab = 1"
        md-label="Business Settings"
      ></md-tab>
      <md-tab
        id="pointsExpiry"
        v-on:click="activetab = 2"
        md-label="Points Expiry"
      ></md-tab>
    </md-tabs>

    <div v-if="activetab === 1" class="businessSettings">
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

          <div class="flexBlock-Space-between">
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
            <a :href="visitUrl" class="small" target="_blank">
              Visit Site URL
              <span class="material-icons">
                outbound
              </span>
            </a>
          </div>
          <md-field md-inline>
            <md-input
              id="site_url"
              v-model="inline"
              placeholder="http://www.example.com"
            ></md-input>
          </md-field>

          <label for="siteTimezone">
            Time zone <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field>
            <md-select
              v-model="siteTimezone"
              name="siteTimezone"
              id="siteTimezone"
              placeholder="(UTC-11:00) Pacific/Pago_Pago"
            >
              <md-input
                id="siteTimezone"
                class="selectSearch"
                v-model="inline"
                placeholder=""
              ></md-input>
              <md-option
                v-for="siteTimezoneVal in siteTimezoneVals"
                v-bind:value="siteTimezoneVal.value"
                :key="siteTimezoneVal.id"
                >{{ siteTimezoneVal.text }}</md-option
              >
            </md-select>
          </md-field>

          <label for="date_display">
            Date Format <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field>
            <md-select
              v-model="dateDisplays"
              name="dateDisplays"
              id="dateDisplays"
              placeholder="DD/MM/YYYY"
            >
              <md-option
                v-for="dateDisplayVal in dateDisplayVals"
                v-bind:value="dateDisplayVal.value"
                :key="dateDisplayVal.id"
                >{{ dateDisplayVal.text }}</md-option
              >
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

          <div class="flexBlock-Space-between">
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
            <a
              href="#"
              onclick="CustomEmail.sendTestEmail(this, 'test');return false;"
              class="small"
              style="line-height: 1;margin-top: 4px;"
              >Send Test Email</a
            >
          </div>
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

    <div v-if="activetab === 2" class="pointsExpiry">
      <div class="flexBlock-Space-between-center boxTitle">
        <label class="flexBlock">Activate Points Expiry</label>
        <md-switch v-model="boolean" class="md-primary">
          <span v-if="boolean">On</span>
          <span v-if="!boolean">Off</span>
        </md-switch>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <label for="expiryTime">
            Frequency <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field>
            <md-select
              v-model="expiryTime"
              name="expiryTime"
              id="expiryTime"
              placeholder="DD/MM/YYYY"
            >
              <md-option
                v-for="expiryTimeOptionVal in expiryTimeOptionVals"
                v-bind:value="expiryTimeOptionVal.value"
                :key="expiryTimeOptionVal.id"
                >{{ expiryTimeOptionVal.text }}</md-option
              >
            </md-select>
          </md-field>

          <label for="expiryTimeOption">
            Email Notification <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-switch v-model="boolean" class="md-primary custom">
            <span v-if="boolean">On</span>
            <span v-if="!boolean">Off</span>
          </md-switch>

          <label for="pointsExpiryNotifyDays" class="flexBlock">
            Email Notification Days
            <span class="fa fa-asterisk asterisk"></span>
          </label>
          <md-field md-inline>
            <md-input
              id="pointsExpiryNotifyDays"
              v-model="inline"
              maxlength="5"
              placeholder=""
            ></md-input>
            <span class="md-suffix">DAYS, PRIOR TO THE EXPIRY</span>
          </md-field>
        </div>
        <div class="md-layout-item">
          <div class="alert alert-info">
            <div id="last_expiry_holder" style="display: none;">
              <label>Last Expiry Date:</label>
              <div id="last_expiry_val">&nbsp;</div>
            </div>
            <div id="next_expiry_holder" style="display: block;">
              <label>Next Expiry Date:</label>
              <div id="next_expiry_val">01/01/2022</div>
            </div>
          </div>
          <p class="alert small">
            <span class="material-icons">warning</span>
            Points will expire and reset to zero for all users on the
            above-mentioned date.
          </p>
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
      loader: false,
      activetab: 1,
      visitUrl: "http://maverickmav.org/dhanqa",
      boolean: true,
      siteTimezoneVals: [
        { text: "(UTC-11:00) Pacific/Pago_Pago", value: "m/d/Y" },
        { text: "(UTC-11:00) Pacific/Pago_Pago", value: "d/m/Y" },
        { text: "(UTC-11:00) Pacific/Pago_Pago", value: "Y/m/d" }
      ],
      dateDisplayVals: [
        { text: "MM/DD/YYYY", value: "m/d/Y" },
        { text: "DD/MM/YYYY", value: "d/m/Y" },
        { text: "YYYY/MM/DD", value: "Y/m/d" }
      ],
      expiryTimeOptionVals: [
        { text: "Every start of the Year", value: "m/d/Y" },
        { text: "Every start of the Month", value: "d/m/Y" },
        { text: "Exact Date (one Time)", value: "Y/m/d" }
      ],
      siteTimezone: null
    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script><style lang="less" scoped>
.settingContainer {
  margin: 20px;
  .businessSettings,
  .pointsExpiry {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
    .boxTitle {
      border-bottom: 1px solid #bbb;
      margin-bottom: 20px;
    }
  }
  .small {
    color: #428bca;
    text-decoration: none;
    font-size: 85%;
    display: flex;
    align-items: center;
    .material-icons {
      margin-left: 5px;
    }
  }
}
</style>

<style lang="less">
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