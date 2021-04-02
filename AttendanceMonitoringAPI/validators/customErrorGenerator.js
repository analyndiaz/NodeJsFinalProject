const customErrorGenerator = (path, errors) => {
  const customErrors = errors.map((err) => {
    const fieldLabel =
      err.local.label.charAt(0).toUpperCase() + err.local.label.slice(1);
    let limitLabel = "";

    switch (err.code) {
      case "any.required":
        return `${path} ${fieldLabel} is required.`;
      case "date.min":
        limitLabel =
          err.local.limit.key.charAt(0).toUpperCase() +
          err.local.limit.key.slice(1);
        return `${path} ${fieldLabel} must be greater than ${limitLabel}.`;
      case "any.ref":
        limitLabel =
          err.local.ref.key.charAt(0).toUpperCase() +
          err.local.ref.key.slice(1);
        return `${path} ${fieldLabel} reference for ${limitLabel} is missing.`;
      case "date.format":
        return `${path} ${fieldLabel} format is incorrect.`;
      default:
        break;
    }
  });
  return new Error(customErrors);
};

module.exports = customErrorGenerator;
