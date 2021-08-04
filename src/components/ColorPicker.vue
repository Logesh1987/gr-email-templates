<template>
  <div class="color-picker" ref="colorpicker">
    <input
      type="text"
      class="form-control"
      v-model="colorValue"
      @focus="showPicker"
      @input="updateFromInput"
    />
    <span class="color-picker-container">
      <span
        class="current-color"
        :style="'background-color: ' + colorValue"
        @click="togglePicker()"
      ></span>
      <chrome-picker
        :value="colors"
        @input="updateFromPicker"
        v-if="displayPicker"
      />
    </span>
  </div>
</template>
<script>
import { Chrome } from "vue-color";
export default {
  name: "ColorPicker",
  props: ["color"],
  components: {
    "chrome-picker": Chrome,
  },
  data: function() {
    return {
      colors: {
        hex: "#000000",
      },
      colorValue: "",
      displayPicker: false,
    };
  },
  mounted: function() {
    this.setColor(this.color || "#000000");
  },
  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color,
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3],
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    },
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit("input", val);
        //document.body.style.background = val;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.color-picker {
  display: flex;
  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 11px;
    height: 36px;
    width: 100%;
    border-radius: 5px 0 0 5px;
  }
  .color-picker-container {
    position: relative;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 35px;
    align-items: flex-end;

    .current-color {
      display: inline-block;
      width: 37px;
      height: 36px;
      background-color: #000;
      cursor: pointer;
      border: 1px solid #d2d2d2;
      border-radius: 0 5px 5px 0;
    }
  }
}
</style>
