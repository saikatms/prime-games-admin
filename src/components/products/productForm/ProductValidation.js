import Yup from "yup";

const ProductValidation = Yup.object().shape({
  gameName: Yup.string().required("Required field"),
  softwareUsed: Yup.string().required("Required field"),
  plugins: Yup.string().required("Required field"),
  description: Yup.string().required("Required field"),
  licensePrice: Yup.string()
    .matches(/^\d+(?:\.{0,1}\d{0,2})$/, {
      message: "Enter a valid amount",
      excludeEmptyString: true,
    })
    .required("Required field"),
  exclusiveLicensePrice: Yup.string()
    .matches(/^\d+(?:\.{0,1}\d{0,2})$/, {
      message: "Enter a valid amount",
      excludeEmptyString: true,
    })
    .required("Required field"),
  downloads: Yup.string().required("Required field"),

  icon: Yup.mixed()
    .test("fileType", "Unsupported File Format", function (value) {
      value = !value ? {} : value;
      const arrayTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (value.type === undefined || arrayTypes.includes(value.type)) {
        return true;
      } else {
        return false;
      }
    })
    .test("fileSize", "File Size is too large", function (value) {
      value = !value ? {} : value;
      const maxSize = 5 * 1024 * 1024;
      if (value.size === undefined || value.size <= maxSize) {
        return true;
      } else {
        return false;
      }
    }),
});

export default ProductValidation;
