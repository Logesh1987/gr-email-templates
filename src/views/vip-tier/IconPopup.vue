<template>
  <transition name="fade">
    <div class="amvip--dialog amvip--iconPopup" v-if="showPopup">
      <div class="amvip--dialogBody">
        <span class="dialogClose" @click="hidePopup">&times;</span>
        <h2>Choose Tier Icon</h2>
        <section>
          <div class="amvip--icon ">
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
  }
  .uploadFile {
    width: 300px;
  }
  .amvip-actionFooter {
    padding-top: 0;
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
  },
};
</script>
