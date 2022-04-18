import Vue from "vue";
export default {
  renderTemplate: (data) =>
    data.email_template.length > 5
      ? data.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
          data.json_fields[property]
            ? data.json_fields[property].value
            : property
        )
      : "<div>Invalid Template</div>",
  createFormData: (data) => {
    let formData = new FormData();
    for (let key in data) {
      if (typeof data[key] === "object") {
        for (let subKey in data[key]) {
          formData.append(`${key}[${subKey}]`, data[key][subKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  },
  getAssetUrl: function(url) {
    return `${Vue.prototype.$asset_url}/assets/img/${url}`;
  },
  getImgUrl: function(value) {
    return `${window.Config.s3_image_url}/${value}`;
  },
  getApiUrl: function(url) {
    var hostname = window.location.hostname;
    if (hostname == "localhost") {
      const linker = url.includes("?") ? "&" : "?";
      return `${Vue.prototype.$callback_url}/${url}${linker}id_shop=${Vue.prototype.$shop_id}&admin_email=${Vue.prototype.$email}`;
    } else {
      return `${Vue.prototype.$callback_url}/${url}`;
    }
  },
  doCopy: function(code) {
    if (window.clipboardData && window.clipboardData.setData) {
      return window.clipboardData.setData("Text", code);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = code;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  },
};
