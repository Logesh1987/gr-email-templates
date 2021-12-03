<template>
  <div class="uploadWrap">
    <img
      v-if="data.value && data.value.length > 0"
      :src="getImgUrl(data.value)"
      alt=""
    />
    <label :for="id"
      ><md-tooltip md-direction="right">Replace image</md-tooltip>
      <i class="fal fa-upload" alt="Replace image"></i>
      <input :id="id" type="file" accept="image/*" @change="handleFileChange" />
    </label>
  </div>
</template>
<script>
export default {
  name: "ImgUploadPreview",
  props: ["id", "handleFileChange", "data"],
  mixins: ["getImgUrl"],
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
  min-height: 250px;
  position: relative;
  min-width: 200px;
  label {
    display: inline-flex;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  }
  i {
    cursor: pointer;
  }
  img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
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
