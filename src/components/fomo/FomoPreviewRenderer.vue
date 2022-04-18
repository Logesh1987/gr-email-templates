<template>
  <div v-html="templateOutput"></div>
</template>
<script>
export default {
  name: "FomoPreviewRenderer",
  props: ["tData", "tHtml"],
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
              if (data[property].type === "file")
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
