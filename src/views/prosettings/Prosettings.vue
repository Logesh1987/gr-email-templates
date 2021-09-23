// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="prosettingsContainer">
    <HeroBanner :heroBanner="hero"
    ></HeroBanner>
    <div class="headingBlock">
      <Heading2 :hero-heading="heroHeading"></Heading2>
      <ButtonPrimary btnName="Download"></ButtonPrimary>
    </div>

    <div class="prosettings">
      <p>{{ desc }}</p>
      <div class="allocatePts">
        <div class="allocatePtsTitle">
        <md-checkbox v-model="allocatePtsChecked">
          Do you want to allocate points to members who complete this action?
          <span class="material-icons">
            help
            <md-tooltip
              >Rewarding points is a good incentivization for your members to complete their profile.</md-tooltip
            >
          </span>
        </md-checkbox>
        </div>
        <div class="allocatePtsContent" v-if="allocatePtsChecked">
          
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <div class="row">
                <label for="rewardpts" class="flexBlock"
                  >Enter # Reward Points <span class="fa fa-asterisk asterisk"></span
                ><span class="material-icons">
                  help
                  <md-tooltip
                    >How many points do you want to reward to the users who complete this action. Tip! Reward more points for difficult actions or actions that are more valuable for your business / offer</md-tooltip
                  >
                </span>
                </label>
                <md-field md-inline>
                  <md-input
                    id="rewardpts"
                    v-model="inline"
                    placeholder="Enter # Reward Points"
                  ></md-input>
                </md-field>
              </div>
            </div>
            
            <div class="md-layout-item mar-top-23">
              <ButtonPrimary btnName="Save"></ButtonPrimary>
            </div>
            
            <div class="md-layout-item"></div>
          </div>
        </div>
      </div>
      <Heading3 :hero-heading="subheading1"></Heading3>
      
      <form>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33"
            v-for="defaultField in defaultFields"
             v-bind:key="defaultField.id">
              <div class="row">
                <label :for="defaultField.name">
                  {{ defaultField.labelHead }} <span class="fa fa-asterisk asterisk"></span>
                </label>
                <div class="radiobox">
                  <div v-for="radio in defaultField.radios" v-bind:key="radio.id">
                    <md-radio v-model="defaultField.value" :value="radio.value" :name="defaultField.name">{{ radio.txt }}</md-radio>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </form>

      <div>
        <md-dialog :md-active.sync="createCustomFields" class="modelWindow">
          <md-dialog-title>Custom Form Fields Settings</md-dialog-title>

          <form class="customForm">
            <p><small>* All form fields are required.</small></p>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <div class="row">
                  <label for="siteName"
                    >Field Name (max 100 char) <span class="fa fa-asterisk asterisk"></span
                  ></label>
                  <md-field md-inline>
                    <md-input
                      id="siteName"
                      v-model="inline"
                      placeholder="Your business name"
                    ></md-input>
                  </md-field>
                </div>
              </div>
              <div class="md-layout-item">
                <div class="row">
                  <label for="siteName"
                    >Data Type <span class="fa fa-asterisk asterisk"></span
                  ></label>
                  <md-field>
                    <md-select
                      v-model="dataType"
                      name="dataType"
                      id="dataType"
                      placeholder="Text"
                    >
                      <md-option
                        v-for="dataType in dataTypes"
                        v-bind:value="dataType.value"
                        :key="dataType.id"
                        >{{ dataType.text }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <div class="row">
                  <label for="enterOption"
                    >Options available </label>
                  <small>(Add the first option available for this custom field below and press the 'Add Option' button.)</small>
                  <div class="addedOpt">
                    <label>Added Option</label>
                    <div class="btnGrp">
                      <md-button class="md-icon-button md-primary">
                        <md-icon>arrow_upward</md-icon>
                      </md-button>

                      <md-button class="md-icon-button md-primary">
                        <md-icon>arrow_downward</md-icon>
                      </md-button>

                      <md-button class="md-icon-button md-primary">
                        <md-icon>edit</md-icon>
                      </md-button>

                      <md-button class="md-icon-button md-primary">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </div>
                  </div>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                      <md-field md-inline>
                        <md-input
                          id="enterOption"
                          v-model="inline"
                          placeholder="Enter the option"
                        ></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item mar-top-2">
                    <ButtonPrimary btnName="Add Option"></ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <md-dialog-actions>
            <md-button class="md-raised" @click="createCustomFields = false">Cancel</md-button>
            <md-button class="md-raised md-primary" @click="createCustomFields = false">Save</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-button class="md-primary md-raised" @click="createCustomFields = true">Create custom fields</md-button>
      </div>
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
import Heading3 from "@/components/Heading3.vue";

export default {
  name: "Prosettings",
  components: {
    Loader,
    Footer,
    ButtonPrimary,
    HeroBanner,
    Heading2,
    Heading3
  },
  data: function() {
    return {      
      radio: false,      
      allocatePtsChecked: false,
      createCustomFields: false,      
      dataType: null,
      hero: [
         {
          heroHeading: "User Profile Settings",
          heroDesc: "Use this section to see User Profile Settings"
        }
      ],
      heroHeading: "User Profile Settings",
      desc: "You can choose if you want to prompt the customer to fill in certain optional fields about themselves. This will help you with better targeting of challenges & also provide you with a better understanding of your customers' behaviour. We recommend disabling the fields you don’t need.",
      subheading1: "Default Fields",
      defaultFields: [
        {
          id: 1,
          labelHead: "Date of birth",
          value: null,
          name: "dob",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 2,
          labelHead: "Gender",
          value: null,
          name: "gender",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 3,
          labelHead: "Your profile image",
          value: null,
          name: "yourprofile",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 4,
          labelHead: "ZIP code",
          value: null,
          name: "zipcode",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 5,
          labelHead: "Country",
          value: null,
          name: "country",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 6,
          labelHead: "Write some details about yourself",
          value: null,
          name: "yourself",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 7,
          labelHead: "Work phone",
          value: null,
          name: "workphone",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 8,
          labelHead: "Home phone",
          value: null,
          name: "homephone",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 9,
          labelHead: "Lives in (Current city)",
          value: null,
          name: "livesin",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 10,
          labelHead: "Hometown",
          value: null,
          name: "hometown",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        },
        {
          id: 11,
          labelHead: "City of Birth",
          value: null,
          name: "cityofbirth",
          type: "radio",
          radios: [
            { txt: "Hidden", value: "Hidden" },
            { txt: "Optional", value: "Optional" },
            { txt: "Required", value: "Required" }
          ],
        }
      ],
      dataTypes: [
        { text: "Text", value: "1" },
        { text: "Number", value: "2" },
        { text: "Multiple Options (can only select one)", value: "3" },
        { text: "Multiple Options (can select many)", value: "4" },
        { text: "Date", value: "5" }
      ],
    }
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.prosettingsContainer {
  margin: 20px;
  font-size: 14px;
  .headingBlock {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .prosettings {
    background: #fff;
    border: solid 1px #ddd;
    padding: 20px;
    .allocatePts {
      background: #c9e2e9;
      .allocatePtsTitle {
        position: relative;
        padding-left: 15px;
        color: #fff;
        background-color: #448aff;
      }
      .allocatePtsContent {
        padding: 15px;
        .mar-top-23 {
          margin-top: 23px;
        }
      }
    }
    label {
      font-weight: bold;
    }
    .radiobox {
      display: flex;
      flex-direction: row;
    }
  }
}
.addedOpt {
  background: #f8f8f8;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  .btnGrp {
    border: 1px solid #d1d1d1;
    margin-left: 15px;
    button {
      border-left:1px solid #d1d1d1;
      &:first-child {
        border-left: none;
      }
      &.md-icon-button.md-button {
        padding: 0;
        i {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

<style lang="less">
.prosettingsContainer {
  .prosettings {
    .allocatePts {
      .allocatePtsTitle {
        label.md-checkbox-label {          
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.md-select-menu {
  z-index: 99999 !important;
}
</style>
