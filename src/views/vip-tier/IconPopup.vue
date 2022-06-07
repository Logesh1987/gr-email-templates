<template>
  <transition name="fade">
    <div class="amvip--dialog amvip--iconPopup" v-if="validateIcons()">
      <div class="amvip--dialogBody">
        <h2>Choose Tier Icon</h2>
        <section>
          <div class="amvip--icon">
            <div
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
              style="width: 100%;"
            >
              <div class="dragDropBlock">
                <div class="amvip--btnPri amvip--btnUpload">
                  Browse
                  <input
                    type="file"
                    multiple="false"
                    name="fields[assetsFieldHandle][]"
                    id="assetsFieldHandle"
                    class="amvip--btnUploadHidden"
                    @change="selectedFile"
                    ref="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <div>
                  <label for="assetsFieldHandle">
                    or drag your image here
                  </label>
                  <span>Supports JPEG, JPEG2000, PNG and SVG</span>
                  <ul v-if="filelist.length > 0" v-cloak>
                    <li>
                      {{ filelist[0].name }}
                      <button
                        type="button"
                        @click="removeFiles()"
                        title="Remove file"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>Choose from library</h3>

            <div id="predefined_icon" v-if="iconArray.length > 0">
              <span
                v-for="(icon, key) in iconArray"
                :key="key"
                class="amvip--iconPreview"
                @click="selectIcon(key, icon)"
              >
                <svg :class="`icon-vip-${icon}`">
                  <use :xlink:href="`#icon-vip-${icon}`"></use>
                </svg>
                <span
                  class="fas fa-check-circle checkIcon"
                  v-if="selectedCustomIconIndex === key && isPredefinedicon"
                ></span>
              </span>
              <span
                v-if="selectedIcon.length > 0 && !isPredefinedicon"
                id="fileUpload"
                class="amvip--iconPreview custom-icon popup-icon"
                v-bind:style="
                  selectedIcon.length > 0 && !isPredefinedicon
                    ? {
                        backgroundImage: 'url(' + selectedIcon + ')',
                      }
                    : ''
                "
              >
                <span class="fas fa-check-circle checkIcon"></span>
              </span>
            </div>
          </div>
          <div class="amvip--row center">
            <span class="spacer"></span>
            <div class="amvip-actionFooter">
              <button class="amvip--btnSec" @click="hidePopup">Cancel</button>
              <button class="amvip--btnPri" @click="updateAndClose">
                Update
              </button>
            </div>
          </div>
        </section>
        <footer class="amvip-actionFooter"></footer>
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
    align-items: flex-start;
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
    span.amvip--iconPreview {
      margin: 0 10px 10px 0;
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
  .dragDropBlock {
    display: flex;
    padding: 20px;
    border: 1px #ccc dashed;
    border-radius: 4px;
    background: #f8f8f8;
    gap: 20px;
    label {
      font-weight: bold;
    }
    span {
      display: block;
      font-size: 12px;
    }
    ul {
      margin-top: 20px;
      li {
        margin-bottom: 10px;
        button {
          border: 1px solid #d1d1d1;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          color: #287cb8;
          font-size: 12px;
          &:hover {
            border: 1px solid #287cb8;
          }
        }
      }
    }
    .amvip--btnUpload {
      position: relative;
      height: 40px;
      min-width: auto;
      background: #287cb8;
      .amvip--btnUploadHidden {
        text-indent: -9999px;
        height: 40px;
        width: 88px;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
      }
    }
  }
  .dragOver {
    .dragDropBlock {
      background: #d1d1d1;
    }
  }
  .dragLeave {
    .dragDropBlock {
      background: #ededed;
    }
  }
}
[v-cloak] {
  display: none;
}
</style>

<script>
import Axios from "axios";
import Loader from "./../../components/Loader";
export default {
  delimiters: ["${", "}"], // Avoid Twig conflicts
  name: "IconPopup",
  props: ["showPopup"],
  event: ["close-btn-click", "cancel-btn-click"],
  data: function() {
    return {
      filelist: [], // Store our uploaded files
      enablePopup: false,
      active: false,
      value: null,
      iconConfig: null,
      loader: false,
      responseData: null,
      defaultIcon: "",
      isPredefinedicon: false,
      selectedIcon: [],
      iconArray: [`crown_1`, `crown_3`, `star_1`, `star_2`, `star_3`],
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
      this.filelist = file;
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
    onChange() {
      this.filelist = [...this.$refs.file.files];
    },
    removeFiles() {
      this.filelist = [];
      this.selectedIcon = [];
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("dragOver")) {
        event.currentTarget.classList.remove("dragLeave");
        event.currentTarget.classList.add("dragOver");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("dragLeave");
      event.currentTarget.classList.remove("dragOver");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      const dropEvent = { target: { files: event.dataTransfer.files } };
      this.selectedFile(dropEvent); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add("dragLeave");
      event.currentTarget.classList.remove("dragOver");
    },
  },
};
</script>
