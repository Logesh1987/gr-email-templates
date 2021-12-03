<template>
  <div class="embedLanding">
    <div class="leftPan">
      <div class="embed_visible change_design">
        <div class="title">
          <h3>Change embed design</h3>
          <p>Default template enabled</p>
          <md-button
            class="md-raised md-primary"
            @click="$router.push('/view/embed/style')"
            >Change design</md-button
          >
        </div>
      </div>
      <div class="embed_visible">
        <div class="title">
          <h3>Get embed code</h3>
          <md-button class="md-raised" @click.stop.prevent="doCopy"
            >Copy</md-button
          >
        </div>
        <textarea
          class="iframe-block"
          id="copiedText"
          v-model="message"
        ></textarea>
        <div class="link-block">
          <a href="#" class="">API Reference</a>
          <a href="#" class="">Developer Sample</a>
        </div>
        <p>
          By embedding our program on your site, you are agreeing to our API
          Terms of Service.
        </p>
      </div>
    </div>
    <div class="previewPan">
      <img src="../../assets/img/embed_template.png" alt="" />
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
      message:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/wd-deKqm3AU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
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

<style lang="less" scoped>
.embedLanding {
  margin: 4em 50px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .leftPan {
    flex: 1;
    margin-right: 40px;
    .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
      background: #007aff;
      width: 100%;
    }
  }

  .embed_visible {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px 25px;
    margin-bottom: 20px;

    .md-button.md-theme-default.md-raised:not([disabled]) {
      border: 1px solid #d1d1d1;
    }

    &.change_design {
      .title {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    p {
      font-size: 11px;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-size: 14px;
        color: #007aff;
      }
    }

    .iframe-block {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 4px;
      width: 100%;
      height: 130px;
      font-size: 12px;
      color: #66788a;
    }

    .link-block {
      margin: 10px 0;

      a {
        font-size: 11px;
        color: #007aff;
        text-decoration: underline;
        margin-right: 10px;
        display: inline-block;

        &:hover {
          color: #2a6496;
          text-decoration: underline;
        }
      }
    }
  }
  .previewPan {
    flex: 2;
  }
}
</style>
