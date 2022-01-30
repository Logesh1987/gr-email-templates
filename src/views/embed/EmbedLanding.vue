<template>
  <div class="embedLanding">
    <div class="noCampaignWrapper" style="display:none;">
      <h3 class="heading">No Embed Campaign Page created</h3>
      <h5 class="SubHeading">Create your own custom campaign page design</h5>
      <figure class="campaign-img"></figure>
      <md-button class="md-raised md-primary primaryBtn mt-10"
        >Create Campaign Page</md-button
      >
    </div>
    <div class="campaignWrapper">
      <header class="pageHeader">
        <i class="fa fa-laptop-code"></i>
        Embed Campaign
      </header>
      <header class="subPageHeadder">
        <div class="leftArea">
          <span class="title"> Campaign Pages</span>
          <md-field class="searchBox">
            <label>Search</label>
            <md-input v-model="searchText"></md-input>
          </md-field>
        </div>
        <div class="rightArea">
          <md-button class="md-raised md-primary primaryBtn"
            >Create Campaign Page</md-button
          >
        </div>
      </header>
      <md-table v-model="users" md-card>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell
            md-label="Version Description"
            md-sort-by="vDescription"
            >{{ item.vDescription }}
            <i class="fas fa-pen editIcon"></i>
          </md-table-cell>
          <md-table-cell md-label="Created On" md-sort-by="createdOn">{{
            moment(item.createdOn).format("DD MMM YYYY h:mm A")
          }}</md-table-cell>
          <md-table-cell md-label="Updated By" md-sort-by="updatedBy">{{
            item.updatedBy
          }}</md-table-cell>
          <md-table-cell md-label="Updated On" md-sort-by="updatedOn">{{
            moment(item.updatedOn).format("DD MMM YYYY h:mm A")
          }}</md-table-cell>
          <md-table-cell md-label="Status" md-sort-by="status">
            <md-button class="md-raised primaryBtn statusBtn">{{
              item.status
            }}</md-button></md-table-cell
          >
          <md-table-cell md-label="Action" md-sort-by="title">
            <md-button class="md-icon-button md-raised actionButton">
              <i class="far fa-edit"></i> </md-button
            ><md-button class="md-icon-button md-raised actionButton">
              <i class="far fa-copy"></i> </md-button
            ><md-button class="md-icon-button md-raised actionButton">
              <i class="far fa-eye"></i> </md-button
            ><md-button class="md-icon-button md-raised actionButton">
              <i class="far fa-trash-alt"></i>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "../../components/Footer.vue";
export default {
  name: "EmailListing",
  components: {
    Footer,
  },
  data: function() {
    return {
      message: "",
      searchText: "",
      users: [
        {
          vDescription: "new year template",
          createdOn: "12/28/2019",
          updatedBy: "sdubbin0@geocities.com",
          updatedOn: "04/15/2021",
          status: "active",
        },
        {
          vDescription: "Version description 2",
          createdOn: "7/19/2020",
          updatedBy: "sdubbin0@geocities.com",
          updatedOn: "1/21/2022",
          status: "restore",
        },
        {
          vDescription: "Version description 3",
          createdOn: "2/18/2020",
          updatedBy: "sdubbin0@geocities.com",
          updatedOn: "7/25/2021",
          status: "unpublished",
        },
        {
          vDescription: "Version description 4",
          createdOn: "11/14/2019",
          updatedBy: "sdubbin0@geocities.com",
          updatedOn: "09/23/2021",
          status: "unpublished",
        },
        {
          vDescription: "Version description 5",
          createdOn: "07/20/2021",
          updatedBy: "sdubbin0@geocities.com",
          updatedOn: "01/15/2022",
          status: "restore",
        },
      ],
    };
  },
  mixins: ["createFormData"],
  computed: {},
  methods: {
    doCopy() {
      let codeToCopy = document.querySelector("#copiedText");
      codeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Embed code was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }
    },
  },
  mounted: function() {
    axios
      .get("https://run.mocky.io/v3/200413b9-05f1-4d42-bde2-1ebca27290d4")
      .then((res) => {
        this.message = res.data.embedCode;
      });
  },
};
</script>

<style lang="less">
@import url("./../../assets/styles/variables.less");
.embedLanding {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  button.md-button.primaryBtn {
    background-color: @primaryColor !important;
  }
  .noCampaignWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 115px);
    width: 100%;
    .campaign-img {
      background: url("./../../assets/img/onboarding.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 175px;
      height: 125px;
    }
  }
  .campaignWrapper {
    min-height: calc(100vh - 115px);
    width: 100%;
    .subPageHeadder {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .leftArea {
        width: 70%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > * {
          margin: 0 20px;
        }
        .searchBox {
          width: 350px;
          margin: 0;
          position: relative;
          top: -10px;
        }
      }
      .rightArea {
        width: 30%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .editIcon {
    margin: 0 20px;
  }
  .actionButton {
    margin-right: 10px;
  }
  .statusBtn {
    min-width: 130px;
  }
}
</style>
