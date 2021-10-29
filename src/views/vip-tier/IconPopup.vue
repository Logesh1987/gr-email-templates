<template>
  <transition name="fade">
    <div class="amvip--dialog amvip--iconPopup" v-if="validateIcons()">
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
                :class="icon"
                @click="selectIcon(key, icon)"
              >
                <span
                  class="fas fa-check-circle checkIcon"
                  v-if="selectedCustomIconIndex === key && isPredefinedicon"
                ></span>
              </span>
              <input
                id="fileUploadHidden"
                type="file"
                accept="image/*"
                style="display:none;"
                hidden
                @change="selectedFile"
              />
              <span
                id="fileUpload"
                class="amvip--iconPreview custom-icon popup-icon"
                v-bind:class="
                  selectedIcon.length > 0 && !isPredefinedicon
                    ? 'far fa-edit'
                    : 'far fa-plus'
                "
                v-bind:style="
                  selectedIcon.length > 0 && !isPredefinedicon
                    ? {
                        backgroundImage: 'url(' + selectedIcon + ')',
                      }
                    : ''
                "
                @click="chooseFiles()"
              >
                <span
                  class="fas fa-check-circle checkIcon"
                  v-if="selectedIcon.length > 0 && !isPredefinedicon"
                ></span>
              </span>
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
  div#selectedIcon {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    flex-direction: column;
    .preview-header {
      font-size: 18px;
      margin: 10px 0;
    }
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
      z-index: 2;
      font-size: 24px;
      &::before {
        font-size: 40px;
      }
      > .checkIcon {
        top: -5px;
        right: -5px;
        position: absolute;
        font-size: 20px;
        color: #28d328;
        border-radius: 50%;
        text-align: center;
      }
    }
    span#fileUpload {
      &.amvip--iconPreview::before {
        font-size: 20px;
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
      isPredefinedicon: false,
      selectedIcon: "",
      iconArray: [
        `icon-vip-crown_1`,
        `icon-vip-crown_3`,
        `icon-vip-star_1`,
        `icon-vip-star_2`,
        `icon-vip-star_3`,
      ],
      selectedCustomIconIndex: -1,
      initialShow: true,
    };
  },
  components: { Loader },
  onConfirm() {
    this.value = "Agreed";
  },
  onCancel() {
    this.value = "Disagreed";
  },
  methods: {
    isAddOrEditTier() {
      return (
        window.location.href.includes("/edit-tier/") ||
        window.location.href.includes("/add-tier")
      );
    },
    validateIcons() {
      if (this.iconConfig && this.showPopup && this.initialShow) {
        if (this.defaultIcon === "") {
          this.defaultIcon = this.iconConfig?.icon;
          this.initialShow = false;
        }
        for (let index = 0; index < this.iconArray.length; index++) {
          const icon = this.iconArray[index];
          if (icon === this.iconConfig.icon) {
            this.selectedCustomIconIndex = index;
            this.isPredefinedicon = true;
            break;
          } else {
            this.selectedCustomIconIndex = -1;
            this.isPredefinedicon = false;
            if (this.iconConfig.icon) {
              this.selectedIcon = this.iconConfig.icon;
              this.defaultIcon = this.iconConfig.icon;
            }
          }
        }
      }
      return this.showPopup;
    },
    hidePopup(event) {
      this.$emit("close-btn-click", {
        event: event,
        iconData: this.iconConfig,
      });
      if (!this.isAddOrEditTier()) {
        this.resetPopupData();
      }
    },
    resetPopupData() {
      this.selectedCustomIconIndex = -1;
      this.initialShow = true;
      this.iconConfig.icon = this.defaultIcon;
      this.defaultIcon = "";
      this.isPredefinedicon = false;
      this.selectedIcon = "";
    },
    selectedFile(event) {
      const file = event.target.files;
      if (file.length === 0) {
        return false;
      }
      const formData = new FormData();
      formData.append("Filedata", file[0]);
      formData.append("suffix", "tier");
      this.loader = true;
      const imgUploadUrl = this.getApiUrl("S3Uploader/tier");
      Axios.post(imgUploadUrl, formData)
        .catch((err) => {
          this.responseData = err;
          this.showSnackbar = true;
        })
        .then((res) => {
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
            this.isPredefinedicon = false;
            const imageUrl = this.getImgUrl(res.data.img_name);
            this.iconConfig.icon = imageUrl;
            this.selectedIcon = imageUrl;
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateAndClose() {
      this.iconConfig.icon = this.selectedIcon;
      if (this.isAddOrEditTier()) {
        this.iconConfig.icon = this.selectedIcon;
        this.hidePopup();
        return false;
      } else {
        this.loader = true;
        const url = this.getApiUrl("Tiers/Managetiers/" + this.iconConfig.id);
        Axios.put(url, this.iconConfig)
          .catch((err) => {
            this.responseData = err;
            this.showSnackbar = true;
          })
          .then((res) => {
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
              this.defaultIcon = this.iconConfig.icon;
              window.sessionStorage.setItem("dataChanged", true);
              this.hidePopup();
              // this.resetPopupData();
            }
          })
          .finally(() => {
            this.loader = false;
          });
      }
    },
    selectIcon(key, icon) {
      this.selectedCustomIconIndex = key;
      this.selectedIcon = icon;
      this.isPredefinedicon = true;
    },
    getImagePath() {
      return `${this.$callback_url}/public/assets/img/library/tiers/`;
    },
    chooseFiles() {
      document.getElementById("fileUploadHidden").click();
    },
  },
};
</script>
