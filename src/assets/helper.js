export const createFormData = (data) => {
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
};

export const renderTemplate = (data) =>
  data.email_template.length > 5
    ? data.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
        data.json_fields[property] ? data.json_fields[property].value : property
      )
    : "<div>Invalid Template</div>";
