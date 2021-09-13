// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="faqContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>

    <div class="faq">
      <md-list :md-expand-single="true">
        <md-list-item md-expand v-for="index in list" :key="index">
          <span class="count">{{ index.no }}</span>
          <span class="question"> {{ index.title }}</span>

          <div slot="md-expand">
            <span>{{ index.item }}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
    <div class="faqFooterBanner">
      <h2>Checkout our complete knowledge base here</h2>
      <ButtonPrimary btnName="Knowledge Base"></ButtonPrimary>
      <h2>Need Help ?</h2>
      <p>
        Email us at
        <a href="mailto:support@appsmav.com" target="_blank"
          >support@appsmav.com</a
        >
        if you need any help. We aim to respond to all emails within 2 hours.
        <br />
        If you don't hear back from us within 8 hours, please check your
        spam/junk folder.
      </p>
    </div>

    <Loader :status="loader" />

    <Footer />
  </div>
</template>

<script>
//import Axios from "axios";
import Loader from "@/components/Loader.vue";
import Footer from "../../components/Footer.vue";
import ButtonPrimary from "../../components/ButtonPrimary.vue";
import HeroBanner from "@/components/HeroBanner.vue";

export default {
  name: "Faq",
  components: {
    Loader,
    Footer,
    ButtonPrimary,
    HeroBanner
  },
  data: function() {
    return {
      loader: false,
      contentVisible: false,
      hero: [
         {
          heroHeading: "FAQs",
          heroDesc: "Check out tips, best practices, and frequently asked questions."
        }
      ],
      list: [
        {
          no: "1.",
          title: "How to enable or disable campaign widgets ?",
          item:
            "You can enable or disable campaigns and also select which campaign's widget and pop up will appear on your website."
        },
        {
          no: "2.",
          title: "What third party platform integrations are available ?",
          item:
            "With Gratisfaction, you can sync many email marketing apps to help you improve the way that you manage your campaigns. Gratisfaction currently integrates with the following apps: Active Campaign,Campaign Monitor, Mailerlite, SendinBlue, MailChimp, Klaviyo, Aweber, ConstantContact. These can be found in your Admin section--> 'Integrations'"
        },
        {
          no: "3.",
          title:
            "Can a customer earn points for doing the same action again ? For example, can a customer visit a Page more than once and receive additional points?",
          item:
            "No, the app does not allow participants to complete one action more than once. However, please note for some actions e.g. Booking Form' if allowed by you, then participants can enter multiple times.\n\n We are soon launching daily, weekly, monthly participation- If you add such actions, then participants will be able to come back and enter again (subject to the frequency of participation viz. daily/weekly/monthly set up by you)"
        },
        {
          no: "4.",
          title: "Can I make a suggestion ?",
          item:
            'Yes, absolutely! The only way we can meaningfully improve our products is by listening to our customers! We want to know what feature we should build next and why this is important for your business. If you have any suggestion, please email us at <a href="mailto:support@appsmav.com">support@appsmav.com'
        },
        {
          no: "5.",
          title:
            "How do I invite my customers to join my Loyalty program and Campaigns ?",
          item:
            "Since Gratisfaction allows you to set up many different types of campaigns including Loyalty-Rewards, Referral (Both double-sided and single-sided), Sweepstakes, Instant Win, and Giveaways, there are two ways to invite the customers and leads.\n\nLoyalty Program:\n If you have set up a 'Loyalty Program' Gratisfaction takes the customer accounts that are created in your store.\n	So after you have installed Gratisfaction, whenever a new customer creates an account at your store or existing customer signs in, they will be added to the loyalty program.\n 	If you would like to send a customer a link to create an account and join your program, you can use your account creation URL.\n\n    	Campaigns:\n 					If you've set up a 'Campaign', then Gratisfaction uses its own login. In this case, we provide you with many options (Click on your campaign and go to 'Install' tab to see all available options) including the Campaign URL, Facebook Tab URL (if you activated the campaign on your Facebook Page), Destination URL, etc. "
        },
        {
          no: "6.",
          title: "Facebook Share image not showing up ?",
          item:
            "This is a known issue and we have provided a quick solution for this.\n   The Facebook crawler has to see an image at least once before it can be rendered. This means that the first person who shares a piece of content won't see a rendered image. So we have to force a rescrape by using Facebook's 'Sharing Debugger'. We have provided a one-click solution for this in your admin panel (Click on 'Campaigns'--> Click on your campaign title --> Now click on the  'Facebook Sharing Debugger' button that appears on the top of the screen, next to the yellow shaded text message: 'If Facebook does not update the image, please click the following button'.\n  Check to ensure the image is appearing fine. If not please click on the button again or contact us.\n  Best of luck with your campaigns!"
        },
        {
          no: "7.",
          title: "Migrating customer details from another app",
          item:
            "We are super excited to welcome you as our customer. Yes, we can help migrate the data over to Gratisfaction. Please install the Gratisfaction app and then email us a CSV file (You can use the attached sample file) with Name, Email and points for each of the customers. We will then upload this data onto your Gratisfaction account. "
        },
        {
          no: "8.",
          title: "What are a Loyalty and Referral Program and Campaigns ?",
          item:
            "Campaigns' and 'Loyalty and Referral Program' have the same objective of helping you get more leads, build lists, followers, engament, sales, repeat sales, and referrals. \n    Gratisfaction helps you to not only run a loyalty and referral program but also instant win campaigns (E.g. Share to Save, Follow to Save, Enter to win, etc), giveaways and sweepstakes (E.g. Refer for a chance to win, Facebook Giveaway, Tweetstakes, etc.). And, these are done through two tabs:\n 	'Loyalty and Referral Program' - works only when the app is installed via an e-commerce platform. We currently support  BigCommerce, Ecwid, Shopify, and WooCommerce. So after successful activation, visitors to your website will see a 'Loyalty and Referral' Program widget and get points for shopping, signing up to your store, etc. Signup for the 'Loyalty and Referral Program' is through your store.\n 	'Campaigns' - help you run instant win promotions (E.g. Enter to Win, Share to Save, Follow to Save, etc), giveaways and sweepstakes (E.g. Refer for a Chance to Win, Facebook Giveaway, Tweetstakes, etc.). When you launch a campaign, the signup is through our 'lead form'. \n 	You can simultaneously run both 'Campaigns' and 'Purchase & Referral Program'."
        },
        {
          no: "9.",
          title: 'What are "Loyalty Members" ?',
          item:
            "A signup to your campaigns (With Gratisfaction you can launch Loyalty programs, Referral campaigns,  	Giveaways and Instant Win Campaigns) is considered as a member. For e.g. jane.doe@email com will be counted as one member, when she signs up to any of your campaigns. 	She can then continue to participate in any number campaign(s) that you may activate from time to time and she will still be counted as one member- So this will work to your advantage."
        },
        {
          no: "10.",
          title: "Can users customize their referral code ?",
          item:
            "Sorry, Referrals cannot modify the code as we track each code for referral goals and rewards."
        },
        {
          no: "11.",
          title:
            "If I set points to expire every year - is it calendar year January-December ? Or is it one year from the date I set the points to expire ?",
          item:
            "If you set up the earned points to expire every year, the points will go back to zero on the first day of the following year for example points earned for 2020 will expire and go back to zero on Jan 1st 2021."
        },
        {
          no: "12.",
          title:
            "Can I control or limit how many registered members our site can have ?",
          item:
            "Customers who signup to your store account are also registered into Gratisfaction. However, you can delete specific users and their details from the app."
        },
        {
          no: "13.",
          title: "How can I reward people for purchases?",
          item:
            'Using Gratisfaction, you can easily reward customers for purchases. \n\n 	<b>You can reward them as:</b>\n 	1. Fixed: I.e. Give X points for every Y$ of purchase- E.g. Give 1 point for every 1$ of purchase (The system will automatically pick your home currency)\n			 	2. Percentage of purchase value: I.e Give X% points for the amount purchases. E.g. give 2% of the purchase value of points would mean that if a customer purchased $200 (exclusive of shipping and taxes) from your store, they will get 2% i.e. 4 points.\n\n 		We exclude Taxes and Shipping from the point calculation.\n\n 		<b>To set this up:</b>\n 		1. Go to "Purchase & Referral Program" --> "Points Setup". \n 	2. Select "Yes" for "Give points on purchases"\n	3. Enable "Points should be" -> \n	"Fixed" and then enter For every "1"$ purchase, reward "1" Point(s). and click "Save" button.\n	Or\n	\'Percentage\' and enter the percentage value'
        },
        {
          no: "14.",
          title:
            "When are points awarded on a purchase? Are these points calculated before or after any discounts or coupons are applied?",
          item:
            "Points are calculated after discounts or coupons are applied and exclude shipping and tax charges."
        },
        {
          no: "15.",
          title:
            "How do I Import my existing customers or contacts who are not enrolled in the rewards program?",
          item:
            "We can help import such contacts into Gratisfaction. Please email us a CSV file (you can download the sample file here) with Name and Email address for each of the customers. We will then upload this data onto your Gratisfaction install."
        },
        {
          no: "16.",
          title: "Where can I see the entries and answers to the questions",
          item:
            "When you click on the 'Campaigns' tab, you will see a table-  Click on the number (this is in blue color) of  your desired 'campaign' in the 'Entries' column. You will now be redirected to the 'Entries' tab where you can see all the details."
        },
        {
          no: "17.",
          title: "How many winners can I draw for my giveaway?",
          item:
            "You can draw any number of winners. Further, you can draw daily, weekly, monthly or jackpot winners (i.e. at the end of your giveaway). Also, the winners can be drawn either randomly (We use random.org for complete randomization.) or based on the highest #entries."
        },
        {
          no: "18.",
          title: "My customer has points but still unable to redeem a reward",
          item:
            "Please check if the customer has enough 'Redeemable points' – These are the points that can be used by the customer to claim any rewards.\n	'Redeemable points' are controlled by 'Exclusion period' setting- This is a feature provided to safeguard you (the business) from a potential loss-making situation where you issue a refund to a customer, let's say after 10 days BUT the customer has already redeemed their points.\n 	So, points are not redeemable if they are in the exclusion period. Quick e.g.: Let's say you have setup the exclusion period= 30 days and Jane buys products from your store. She will get points for this purchase BUT she cannot redeem them for 30 days (the exclusion period).\n 	Exclusion period can be changed in Admin--> Business Settings---> Exclusion period for redemption (in days). The default is setup to 7 days as we have kept a cushion for order cancellations and refunds."
        },
        {
          no: "19.",
          title: "What is Exclusion period?",
          item:
            "'Exclusion period' is to protect you from a loss-making scenario where you issue a refund let's say after 10 days BUT the customer has already redeemed their points. \n 	Points are in 'hold' during the exclusion period and cannot be used to claim rewards. So for e.g. if you have setup exclusion period= 30 days and Jane buys products from you. Although, she will get the points BUT will be unable to redeem them for 30 days (the exclusion period). \n 	Exclusion period setting can be found in the \"Business Settings\" tab."
        }
      ]
    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.faqContainer {
  margin: 20px;
  font-size: 14px;
  .faq {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
    .boxTitle {
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    }
    .md-list {
      border: none;
      .md-list-item {
        .md-list-item-expand {
          border: none;
          &.md-button-clean {
            white-space: pre-line;
          }
          &.md-active .md-list-expand {
            padding: 16px;
          }
          .md-list-item-content {
            span.count {
              width: 20px;
            }
            span.question {
              width: 100%;
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
}
.faqFooterBanner {
  text-align: center;
  margin-top: 50px;
  h2 {
    font-size: 18px;
    color: #66788a;
  }
}
</style>

<style lang="less">
.faqContainer {
  .faq {
    .md-list .md-list-item-expand {
      &.md-active .md-list-expand {
        padding: 10px 10px 10px 45px;
        font-size: 14px;
      }
      .md-list-item-content {
        font-size: 16px;
        color: #0a94d6;
        .md-icon.md-theme-default.md-icon-image svg {
          fill: #0a94d6;
        }
        &:hover {
          .md-icon.md-theme-default.md-icon-image svg {
            fill: inherit;
          }
        }
      }
    }
  }
}
</style>
