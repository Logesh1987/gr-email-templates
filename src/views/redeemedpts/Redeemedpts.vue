// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="redeemedptsContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>
    <div class="headingBlock">
      <Heading2 :hero-heading="heroHeading" :dynamic-value="dynamicValue"></Heading2>
      <ButtonPrimary btnName="Download"></ButtonPrimary>
    </div>

    <div class="redeemedpts">
      <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="First Name" md-sort-by="First Name">{{ item.fname }}</md-table-cell>
          <md-table-cell md-label="Last Name" md-sort-by="Last Name">{{ item.lname }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="Email">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Reward Points" md-sort-by="Reward Points">{{ item.rewardpts }}</md-table-cell>
          <md-table-cell md-label="Comments" md-sort-by="Comments">{{ item.comments }}</md-table-cell>
          <md-table-cell md-label="Date" md-sort-by="Date">{{ item.date }}</md-table-cell>
        </md-table-row>
        <!--<md-table-row slot="md-table-row">
          <md-table-cell class="bg-info text-center">No users found</md-table-cell>
        </md-table-row>-->
      </md-table>
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
  name: "Redeemedpts",
  components: {
    Loader,
    Footer,
    ButtonPrimary,
    HeroBanner,
    Heading2
  },
  data: function() {
    return {
      hero: [
         {
          heroHeading: "Redeemed Points",
          heroDesc: "Use this section to see redeemed points"
        }
      ],
      heroHeading: "Redeemed Points",
      dynamicValue: "(0)",
      users: [
        {
          id: 1,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 2,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 3,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 4,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 5,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 6,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 7,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 8,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 9,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        },
        {
          id: 10,
          fname: "John",
          lname: "Peter",
          email: "text@google.com",
          rewardpts: "100",
          comments: "Dummy text",
          date: "DD/MM/YYYY"
        }
      ],
    }
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.redeemedptsContainer {
  margin: 20px;
  font-size: 14px;
  .headingBlock {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .redeemedpts {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
  }
}
</style>

<style lang="less">
.redeemedptsContainer {
}
</style>
