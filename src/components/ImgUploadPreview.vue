<template>
  <div class="uploadWrap">
    <label :for="id"
      ><md-tooltip md-direction="right">Replace image</md-tooltip>
      <i class="fal fa-upload" alt="Replace image"></i>
      <input :id="id" type="file" accept="image/*" @change="handleFileChange" />
    </label>
    <img
      :src="
        data.value.length > 0
          ? getImgUrl(data.value)
          : getAssetUrl('placeholder-img.jpg')
      "
      alt=""
    />
    <div class="fileDimension" v-if="data.width && data.height">
      {{ data.width }} X {{ data.height }} pixels
    </div>
  </div>
</template>
<script>
export default {
  name: "ImgUploadPreview",
  props: ["id", "handleFileChange", "data"],
  mixins: ["getImgUrl", "getAssetUrl"],
};
</script>
<style lang="less" scoped>
.uploadWrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  min-height: 40px;
  position: relative;
  i {
    cursor: pointer;
  }
  img {
    max-width: 50%;
    margin: 0 auto;
  }
  .fileDimension {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: #000;
    padding: 2px 4px 1px 11px;
    border-top-left-radius: 15px;
    color: #fff;
    font-size: 11px;
    opacity: 0.4;
  }
}
</style>
