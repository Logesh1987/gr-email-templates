<template>
  <tr>
    <td
      :class="[{ activeBlk: active }]"
      @click="handleClick"
      v-html="templateOutput"
    ></td>
  </tr>
</template>
<script>
export default {
  name: "PreviewRenderer",
  props: ["tData", "tHtml", "handleClick", "active"],
  computed: {
    templateOutput: function() {
      return this.tData ? this.renderTemplate(this.tData, this.tHtml) : null;
    },
  },
  methods: {
    renderTemplate: (data, html) =>
      html.length > 5
        ? html.replace(/\[\[(.*?)\]]/g, (full, property) => {
            if (data[property]) {
              if (property == "white_label_image")
                return data[property].value ? "block" : "none";
              else if (data[property].type === "file")
                return `${window.Config.s3_image_url}/${data[property].value}`;
              else return data[property].value;
            } else {
              return `[[${property}]]`;
            }
          })
        : "<div>Invalid Template</div>",
  },
};
</script>
<style lang="less" scoped>
.activeBlk {
  border: 2px dashed;
}
</style>
