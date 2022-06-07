<template>
  <div class="home">
    <div class="emailheader">
      <div class="container">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100 emailListingHead">
            <h2>Email Templates</h2>
            <p>
              In this section you can setup email content which will be
              triggered when certain actions or activities occur
            </p>
            <!-- <ul>
              <li>
                <h4>147,789</h4>
                <small>Mails Opened</small>
              </li>
              <li>
                <h4>8,789</h4>
                <small>New subscribers</small>
              </li>
              <li>
                <h4>154</h4>
                <small>Unsubscribed</small>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
    <div class="emailListingContainer container">
      <div class="emailItems">
        <ul class="emailList">
          <li class="head">
            <div class="name">Email Name</div>
            <div>Status</div>
            <div>Action</div>
          </li>
          <li v-for="(mail, key) in activeList" :key="key">
            <div class="name">
              <div>
                <h5>{{ mail.title }}</h5>
                <p>
                  {{ mail.description }}
                </p>
              </div>
            </div>
            <div>
              <label
                class="switch"
                @click.prevent="
                  changeEmailStatus(mail.id_email, mail.is_enabled)
                "
                :for="mail.id_email"
                v-if="mail.id_email !== 2"
              >
                <md-tooltip md-direction="left">Update Status</md-tooltip>
                <input
                  type="checkbox"
                  name="mainSwitch"
                  :checked="mail.is_enabled == 1"
                  :id="mail.id_email"
                />
                <i></i>
              </label>
            </div>
            <div class="actions">
              <router-link :to="'/view/email/templates/' + mail.id_email">
                <i class="far fa-edit"
                  ><md-tooltip md-direction="left">Edit</md-tooltip></i
                >
              </router-link>
              <a href="#" @click.prevent="(e) => sendTestEmail(mail.id_email)">
                <i class="far fa-paper-plane"
                  ><md-tooltip md-direction="left"
                    >Send Test Email</md-tooltip
                  ></i
                >
              </a>
            </div>
          </li>
          <li v-if="activeList && activeList.length == 0">
            <div>No data</div>
          </li>
        </ul>
        <div v-if="inactiveList.length > 0" class="otherEmail">
          <ul class="emailList">
            <li class="head">
              <div class="name">Email Name</div>
              <div>Status</div>
              <div>Action</div>
            </li>
            <li v-for="(mail, key) in inactiveList" :key="key">
              <div class="name">
                <div>
                  <h5>{{ mail.title }}</h5>
                  <p>
                    {{ mail.description }}
                  </p>
                </div>
              </div>
              <div>
                <label
                  class="switch"
                  @click.prevent="
                    changeEmailStatus(mail.id_email, mail.is_enabled)
                  "
                  :for="mail.id_email"
                  v-if="mail.id_email !== 2"
                  ><md-tooltip md-direction="left">Update Status</md-tooltip>
                  <input
                    type="checkbox"
                    name="mainSwitch"
                    :checked="mail.is_enabled == 1"
                    :id="mail.id_email"
                  />
                  <i></i>
                </label>
              </div>
              <div class="actions">
                <router-link :to="'/view/email/templates/' + mail.id_email">
                  <i class="far fa-edit"
                    ><md-tooltip md-direction="left">Edit</md-tooltip></i
                  >
                </router-link>
                <a
                  href="#"
                  @click.prevent="(e) => sendTestEmail(mail.id_email)"
                >
                  <i class="far fa-paper-plane"
                    ><md-tooltip md-direction="left"
                      >Send Test Email</md-tooltip
                    ></i
                  >
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="todo-checklist">
        <div>
          <h4>
            <span
              >ATTENTION! These sections need <br />
              to be checked as well</span
            >
          </h4>
          <ul>
            <li class="clearfix">
              <b>Campaign Referral Reward Email</b>
              <div>
                Edit Campaigns<small class="fal fa-long-arrow-right"></small> 3.
                Referrals
              </div>
            </li>
            <li class="clearfix">
              <b>Referral program enrollment email</b>
              <div>
                Edit Loyalty and Referral Program
                <small class="fal fa-long-arrow-right"></small> Referral
                <small class="fal fa-long-arrow-right"></small> Email Setup
              </div>
            </li>
            <li class="clearfix">
              <b>Referral reward email</b>
              <div>
                Edit Loyalty and Referral Program
                <small class="fal fa-long-arrow-right"></small> Referral
                <small class="fal fa-long-arrow-right"></small> Email Setup
              </div>
            </li>
            <li class="clearfix">
              <b>Celebrate Event Reward Email</b>
              <div>
                Edit Celebrate event
                <small class="fal fa-long-arrow-right"></small> Mail before the
                event
              </div>
            </li>
            <li class="clearfix">
              <b>Celebrate Bonus Reward Email</b>
              <div>
                Edit Celebrate event
                <small class="fal fa-long-arrow-right"></small> Mail on the
                event day
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "EmailListing",
  data: function() {
    return {
      bol: 1,
      listData: [],
    };
  },
  mixins: ["createFormData"],
  computed: {
    activeList: function() {
      return this.listData.filter(({ is_enabled }) => is_enabled == 1);
    },
    inactiveList: function() {
      return this.listData.filter(({ is_enabled }) => is_enabled == 0);
    },
  },
  methods: {
    ...mapMutations(["toggleLoader", "updateApiResponse"]),
    changeEmailStatus: function(id, status) {
      this.toggleLoader(true);
      const params = {
        is_enabled: status ? 0 : 1,
        id_email: id,
      };
      const formData = new FormData();
      for (var key in params) {
        formData.append(key, params[key]);
      }
      Axios.post(
        `${window.Config.callback_url}/services/v2/email/updateEmailStatus`,
        formData
      ).then(({ data, status }) => {
        this.toggleLoader(false);
        if (status == 200) {
          this.updateApiResponse(
            `<i class="fas fa-check-circle"></i> ${data.msg}`
          );
          this.listData = this.listData.map((item) =>
            item.id_email == id
              ? { ...item, is_enabled: params.is_enabled }
              : item
          );
        } else
          this.updateApiResponse(
            `<i class="fas fa-exclamation-circle"></i> ${data.msg}`
          );
      });
    },
    sendTestEmail: function(id) {
      this.toggleLoader(true);
      Axios.post(
        `${window.Config.callback_url}/services/v2/email/sendTestEmail`,
        this.createFormData({ id_email: id })
      ).then(({ data, status }) => {
        this.toggleLoader(false);
        if (status == 200) {
          this.updateApiResponse(
            `<i class="fas fa-check-circle"></i> An email has been sent to ${data.mail_to}`
          );
        } else
          this.updateApiResponse(
            `<i class="fas fa-exclamation-circle"></i> There was an error sending mail to ${data.mail_to}`
          );
      });
    },
  },
  mounted: function() {
    this.toggleLoader(true);
    Axios.get(
      `${window.Config.callback_url}/services/v2/email/getEmailTemplates`
    ).then(({ data }) => {
      this.listData = data.data;
      this.toggleLoader(false);
    });
  },
};
</script>

<style lang="less" scoped>
.emailheader {
  background: url(https://s3.us-east-1.amazonaws.com/devam.pro/gr/master/upload/img/395/95/4395_logo_1613395827.jpg)
    no-repeat;
  background-size: cover;
}
.emailListing {
  padding-bottom: 5em;
}
.emailListingHead {
  color: #fff;
  padding: 5em 0 5em;

  h2 {
    font-size: 3.6em;
    font-weight: 100;
    margin: 0;
    line-height: normal;
  }

  h4 {
    font-size: 2em;
    font-weight: 100;
    margin: 0;
    line-height: normal;
  }

  p {
    font-size: 13px;
    line-height: 16px;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 2.5em 0;
  }

  li:not(:first-child) {
    border-left: 1px solid #546882;
    padding-left: 3em;
    margin-left: 3em;
  }
}
.activateEmail {
  margin: 2em 0 1.5em;
}
.emailNav {
  display: flex;
  background: #333333;
  margin-top: -56px;
  li {
    flex-grow: 1;
    flex-shrink: 0;
    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }

    a {
      color: #9a9a9a;
    }

    &.active {
      background: #fff;
      pointer-events: none;
      a {
        border: none;
        color: #007aff;
      }
    }
  }
}

.emailListingContainer {
  margin-top: -52px;
  display: flex;
  align-items: flex-start;
  .emailItems {
    flex-grow: 1;
  }
}
.todo-checklist {
  position: relative;
  width: 30%;
  margin: 0 2em 2em;
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 55%;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    bottom: -3px;
  }
  &:after {
    right: 4px;
    transform: rotate(3deg);
  }
  &:before {
    left: 4px;
    transform: rotate(-3deg);
  }
  & > div {
    border-radius: 4px;
    border: solid 1px #e6e8eb;
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 30px 20px;
    &:after {
      content: "";
      width: 40px;
      height: 124px;
      background: rgba(252, 242, 163, 0.78);
      transform: rotate(97.00002deg);
      position: absolute;
      top: -60px;
      left: 50%;
      margin-left: -20px;
    }
  }
  h4 {
    color: #333;
    margin: 0;
    padding: 16px 20px;
    font-weight: 500;
    text-align: center;
    position: relative;
    font-size: 15px;
    line-height: 1.4;
    border-bottom: 0;
    &:before,
    &:after {
      content: "";
      background: #ffe7e7;
      width: 165px;
      height: 16px;
      position: absolute;
      top: 17px;
      left: 50%;
      transform: translateX(-50%) rotate(1deg);
    }
    span {
      position: relative;
      z-index: 1;
    }
    &:after {
      top: 39px;
      width: 200px;
      transform: translateX(-50%) rotate(-3deg);
      height: 17px;
    }
  }
  ul {
    list-style: none;
    margin: 0 15px;
    padding: 0;
    counter-reset: section;
    li {
      padding: 12px 0;
      font-size: 12px;
      color: #333;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      a {
        float: right;
      }
      div {
        margin: 6px 14px 0;
      }
      &:last-child {
        border-bottom: 0;
      }
      &:before {
        counter-increment: section; /* Increment the value of section counter by 1 */
        content: counter(section) ".";
        display: inline-block;
        margin-right: 4px;
      }
    }
  }
}

.otherEmail {
  overflow: hidden;
}

.emailList {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #e2e2e2;
  margin-bottom: 50px;

  .noData {
    padding: 50px 0;
    text-align: center;
    justify-content: center;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
    margin-top: 3px;
  }

  h5 {
    font-size: 1.15em;
    line-height: normal;
    margin: 0 0 0.3em;
  }

  li {
    display: flex;
    padding: 0 40px;

    &.head {
      background: #e4f3f9;
      border-bottom: 1px solid #e2e2e2;

      div {
        font-weight: bold;
      }
    }
  }
}

.emailList li > div {
  flex-grow: 1;
  padding: 20px 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.emailList li:not(.head) {
  color: #000;
}

.emailList li:not(.head):not(:last-child) > div {
  border-bottom: 1px solid #e2e2e2;
}

.emailList li > div.name {
  width: 60%;
  line-height: 1;
  align-items: center;
}

.emailList li > div:not(.name) {
  text-align: center;
  width: 10%;
}

.emailList .actions a {
  font-size: 1.7em;
  color: rgba(34, 43, 69, 0.5);
  line-height: 1;

  &:first-child {
    margin-right: 10px;
  }
}

.emailListingContainer h3 {
  font-size: 2em;
  font-weight: 400;
  margin: 3em 0 1.5em;
}
</style>
