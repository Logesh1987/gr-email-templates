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
    label {
      font-weight: bold;
    }
    .radiobox {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>

<style lang="less">
.prosettingsContainer {
}
</style>
