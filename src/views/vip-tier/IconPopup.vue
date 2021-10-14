<template>
  <transition name="fade">
    <div class="amvip--dialog amvip--iconPopup" v-if="showPopup">
      <div class="amvip--dialogBody">
        <span class="dialogClose" @click="hidePopup">&times;</span>
        <h2>Choose Tier Icon</h2>
        <section>
          <div class="amvip--icon">
            <div id="predefined_icon" v-if="iconArray.length > 0">
              <span
                v-for="(icon, key) in iconArray"
                :key="key"
                class="amvip--iconPreview"
                v-bind:style="{
                  backgroundImage: 'url(' + icon + ')',
                }"
                @click="selectIcon(key, icon)"
              >
                <span
                  class="icon-check1 checkIcon"
                  v-if="selectedCustomIconIndex === key"
                ></span>
              </span>
            </div>
            <div id="customIcon">
              <span
                v-if="iconConfig.icon"
                class="amvip--iconPreview"
                v-bind:style="{
                  backgroundImage: 'url(' + iconConfig.icon + ')',
                }"
              >
              </span>
              <md-field class="uploadFile">
                <label for="icon">Upload</label>
                <md-file
                  accept="image/*"
                  name="icon"
                  id="icon"
                  @md-change="selectedFile"
                />
              </md-field>
            </div>
          </div>
        </section>
        <footer class="amvip-actionFooter">
          <button class="amvip--btnPri" @click="updateAndClose">Update</button>
        </footer>
      </div>
      <Loader :status="loader"></Loader>
    </div>
  </transition>
</template>

<style lang="less">
@import url("./../../assets/vip-tier/less/_icon-dialog");
.amvip--dialog.amvip--iconPopup {
  .amvip--icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .amvip--dialogBody {
    h2 {
      margin: 0;
    }
  }
  .uploadFile {
    width: 300px;
  }
  .amvip-actionFooter {
    padding-top: 0;
    margin-top: 0;
  }
  div#customIcon {
    display: flex;
    margin: 20px 0;
  }

  div#predefined_icon {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 2px solid #ccc;
    margin: 0 25px;
    span.amvip--iconPreview {
      margin: 0 20px 20px;
      cursor: pointer;
      position: relative;
      > .checkIcon {
        top: 50%;
        left: 50%;
        position: absolute;
        font-size: 60px;
        color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

<script>
import Axios from "axios";
import Loader from "./../../components/Loader";
export default {
  name: "IconPopup",
  props: ["showPopup"],
  event: ["close-btn-click", "cancel-btn-click"],
  data: function() {
    return {
      enablePopup: false,
      active: false,
      value: null,
      iconConfig: null,
      loader: false,
      responseData: null,
      defaultIcon: "",
      iconArray: [
        `${window.Config.callback_url}/public/assets/img/library/tiers/crown_1.svg`,
        `${window.Config.callback_url}/public/assets/img/library/tiers/crown_2.svg`,
        `${window.Config.callback_url}/public/assets/img/library/tiers/crown_3.svg`,
        `${window.Config.callback_url}/public/assets/img/library/tiers/star_1.svg`,
        `${window.Config.callback_url}/public/assets/img/library/tiers/star_2.svg`,
        `${window.Config.callback_url}/public/assets/img/library/tiers/star_3.svg`,
      ],
      selectedCustomIconIndex: -1,
    };
  },
  components: { Loader },
  onConfirm() {
    this.value = "Agreed";
  },
  onCancel() {
    this.value = "Disagreed";
  },
  mounted() {
    console.log(this.iconConfig);
    this.defaultIcon = this.iconConfig.icon;
  },
  methods: {
    hidePopup(event) {
      this.$emit("close-btn-click", event);
    },
    selectedFile(file) {
      if (file.length === 0) {
        return false;
      }
      const formData = new FormData();
      formData.append("Filedata", file[0]);
      formData.append("suffix", "tier");
      this.loader = true;
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then(res => {
          if (res.data.error && res.data.error == 1) {
            this.responseData = res.data.msg;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.message != undefined) {
              this.responseData = res.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.iconConfig.icon = imageUrl;
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateAndClose() {
      this.loader = true;
      const url = this.getApiUrl("Tiers/Managetiers/" + this.iconConfig.id);
      Axios.put(url, this.iconConfig)
        .catch(err => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then(res => {
          if (res.data.error) {
            this.responseData = res.data.error.message;
            this.showSnackbar =
              this.responseData && this.responseData.length > 0;
            return false;
          } else {
            if (res.data.data.message != undefined) {
              this.responseData = res.data.data.message;
              this.showSnackbar =
                this.responseData && this.responseData.length > 0;
            }
            this.hidePopup();
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    selectIcon(key, icon) {
      if (this.defaultIcon === "") {
        this.defaultIcon = this.iconConfig.icon;
      }
      this.selectedCustomIconIndex = key;
      this.iconConfig.icon = icon;
      console.log(this.defaultIcon);
    },
  },
};
</script>
