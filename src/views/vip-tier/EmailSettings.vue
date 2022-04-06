<template>
  <div class="amvip--wrapper">
    <div class="amvip--EmailSettings">
      <hgroup class="amvip--pageHeader">
        <div class="headerGroup">
          <span class="far fa-arrow-left" @click="goBack"></span>
          <h2>Tier Email Settings</h2>
        </div>
        <div class="btnGroup">
          <button
            class="amvip--btnCommon rightAlign"
            @click="confirmSendMailPopup"
          >
            <span class="btnIcon far fa-envelope"></span>
            <span>Send Test Email</span>
          </button>
        </div>
      </hgroup>
      <div class="amvip--container emailSettingsWrapper">
        <input type="hidden" name="id_email" id="id_email" v-model="id_email" />
        <div class="amvip--row">
          <span>Email Notification</span>
          <md-switch
            v-model="is_enabled"
            @change="confirmStatusPopup($event)"
          ></md-switch>
        </div>
        <div class="amvip--row">
          <span>From</span>
          <span class="labelContent">{{ from }}</span>
        </div>
        <div class="amvip--row">
          <span>To</span>
          <span class="labelContent">[[Customer Email Address]]</span>
        </div>
        <div class="amvip--row">
          <label for="subject">Subject</label>
          <input
            v-model="subject"
            type="text"
            id="subject"
            name="subject"
            placeholder="subject"
          />
        </div>
        <div class="amvip--row">
          <span class="span_Dynamic"
            >Dynamic Variables
            <span class="far fa-info-circle" v-popover:dynamicVariables></span>
            <popover name="dynamicVariables" event="hover">
              You can insert these dynamic variables exactly as shown, anywhere
              in the email body.
            </popover></span
          >
          <span class="labelContent">{{ dynamic_variables }}</span>
        </div>
        <div class="amvip--row">
          <label for="emailBody">Email Body</label>
          <textarea
            v-model="template"
            id="emailBody"
            rows="15"
            cols="50"
          ></textarea>
        </div>
        <div class="amvip--row center">
          <span class="spacer"></span>
          <div>
            {{ email_footer }}
            <p class="am-credits-footer">
              <a
                href="https://appsmav.com/gratisfaction.php"
                target="blank"
                class="footer-link-gr"
                >Gratisfaction</a
              >
              <span class="divider">|</span> Made with
              <i class="icon-heart">♥</i>
              by
              <a
                href="https://appsmav.com"
                target="_blank"
                class="footer-link-am"
                >Apps Mav</a
              >
            </p>
          </div>
        </div>
        <div class="amvip--row center">
          <span class="spacer"></span>
          <div class="amvip-actionFooter">
            <button class="amvip--btnSec" @click="clearForm">Cancel</button>
            <button class="amvip--btnPri" @click="saveEmailSettings">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      :popupConfig="popupConfig"
      v-on:confirmed="confirmClicked($event)"
      v-on:canceled="cancelClicked($event)"
    ></ConfirmPopup>
  </div>
</template>

<script>
import Axios from "axios";
import ConfirmPopup from "./ConfirmPopup";
export default {
  name: "EmailSettings",
  components: { ConfirmPopup },
  data: function() {
    return {
      label: "Email Settings",
      dynamic_variables: "",
      email_footer: "",
      from: "",
      id_email: null,
      is_enabled: false,
      message: "",
      subject: "",
      template: "",
      to: "",
      testEmail: "",
      popupConfig: {
        title: "Confirm!",
        content: `An email will be sent to ${this.testEmail}`,
        confirmText: "Yes, Proceed it",
        cancelText: "No, Cancel it",
        id: "sendMailPopup",
        iconClass: "fal fa-paper-plane",
        width: "350px",
      },
      showConfirmPopup: false,
    };
  },
  mounted() {
    this.fetchTemplate();
  },
  methods: {
    fetchTemplate() {
      const url = this.getApiUrl("Tiers/emailTemplate");
      Axios.get(url).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          console.log(res);
          this.setDefaults(res.data.data);
        }
      });
    },
    confirmStatusPopup(eve) {
      if (eve == false) {
        this.popupConfig = {
          title: "Confirm!",
          content: "Email will be stopped from sending to users. Are you sure?",
          confirmText: "Yes, Stop it",
          cancelText: "No, Cancel it",
          id: "statusUpdatePopup",
          iconClass: "far fa-ban",
          width: "350px",
        };
        this.showConfirmPopup = true;
      } else {
        this.changeStatus(eve);
      }
    },
    confirmSendMailPopup() {
      this.popupConfig = {
        title: "Confirm!",
        content: `An email will be sent to <a href="mailto:${this.testEmail}">${this.testEmail}</a>`,
        confirmText: "Yes, Proceed it",
        cancelText: "No, Cancel it",
        id: "sendMailPopup",
        iconClass: "fal fa-paper-plane",
        width: "350px",
      };
      this.showConfirmPopup = true;
    },
    confirmClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "statusUpdatePopup":
          this.changeStatus(eve.params);
          break;
        case "sendMailPopup":
          this.sendTestEmail();
          break;
        default:
          break;
      }
    },
    cancelClicked(eve) {
      this.showConfirmPopup = false;
      switch (eve.id) {
        case "statusUpdatePopup":
          this.is_enabled = !this.is_enabled;
          break;
        case "sendMailPopup":
          break;
        default:
          break;
      }
    },
    sendTestEmail() {
      const url = this.getApiUrl("Tiers/sendEmailTemplate");
      Axios.post(url, { id_email: this.id_email }).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          console.log(res);
        }
      });
    },
    goBack() {
      history.back();
    },
    setDefaults(data) {
      this.dynamic_variables = data.dynamic_variables;
      this.email_footer = data.email_footer;
      this.from = data.from;
      this.id_email = data.id_email;
      this.is_enabled = data.is_enabled == 1;
      this.message = data.message;
      this.subject = data.subject;
      this.template = this.convertHTMLStrings(data.template);
      this.to = data.to;
      this.testEmail = data.testemail;
    },
    convertHTMLStrings(HTMLString) {
      var x = document.createElement("div");
      x.innerHTML = HTMLString;
      x.innerHTML = x.innerText;
      return x.innerText;
    },
    async changeStatus(eve) {
      console.log("Status", eve);
      const url = this.getApiUrl("Tiers/emailTemplate");
      const res = await Axios.put(url, this.generateStatusPayLoad());
      if (res.data.error) {
        return false;
      } else {
        // this.setDefaults(res.data.data);
        // this.fetchTemplate();
      }
    },
    generateUpdatePayLoad() {
      return {
        // dynamic_variables: this.dynamic_variables,
        // email_footer: this.email_footer,
        // from: this.from,
        id_email: this.id_email,
        is_enabled: this.is_enabled == true ? 1 : 0,
        // message: this.message,
        subject: this.subject,
        template: this.template,
        // to: this.to,
      };
    },
    generateStatusPayLoad() {
      return {
        id_email: this.id_email,
        is_enabled: this.is_enabled == true ? 1 : 0,
      };
    },
    saveEmailSettings() {
      const url = this.getApiUrl("Tiers/emailTemplate");
      Axios.post(url, this.generateUpdatePayLoad()).then((res) => {
        if (res.data.error) {
          return false;
        } else {
          console.log(res);
          // this.setDefaults(res.data.data);
          this.fetchTemplate();
        }
      });
    },
    clearForm() {
      this.message = "";
      this.subject = "";
      this.goBack();
    },
  },
};
</script>

<style lang="less">
.amvip--EmailSettings {
  .amvip--pageHeader {
    justify-content: space-between;
  }
  .amvip--row {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin-bottom: 20px;
    font-size: 14px;

    @media (max-width: 599px) {
      flex-direction: column;
    }

    > *:nth-child(2n-1) {
      min-width: 200px;
      text-align: right;
      margin-right: 20px;
      font-weight: 600;
      font-size: 12px;
      color: var(--labelClr);

      @media (max-width: 599px) {
        text-align: left;
        min-width: auto;
        margin-bottom: 5px;
      }
    }
    > *:nth-child(2n) {
      max-width: 400px;

      @media (max-width: 599px) {
        min-width: auto;
        max-width: 100%;
      }
    }
    textarea {
      height: 275px;
      max-height: 700px;
      resize: none !important;
    }
    &.center {
      font-size: 12px;
    }
    .md-field {
      min-height: auto;
      margin: 0;
      padding-top: 0;
    }
  }
  .span_Dynamic {
    position: relative;
    [data-popover="dynamicVariables"] {
      top: 25px !important;
      left: 45px !important;
      position: absolute !important;
    }
  }
  input[type="text"],
  select,
  textarea {
    width: 100%;
    padding: 8px 10px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
}
</style>
