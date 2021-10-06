import { withFormik } from "formik";
import PropTypes from "prop-types";
import ProductValidation from "../../components/products/productForm/ProductValidation";
import ProductForm from "../../components/products/productForm/ProductForm";

const mapPropsToValues = (props) => {
  const { product } = props;

  return {
    id: product.id || null,
    gameName: product.gameName || "",
    licensePrice: product.licensePrice || "",
    exclusiveLicensePrice: product.exclusiveLicensePrice || "",
    downloads: product.downloads || "",
    softwareUsed: product.softwareUsed || "",
    description: product.description || "",

    plugins: product.plugins || "",
    category: product.category || "",
    canChange: product.canChange || "",
    original: product.original || "",

    downloadPath: product.downloadPath || "",
    icon: {},
  };
};

const configForm = {
  enableReinitialize: true,
  mapPropsToValues,
  validationSchema: ProductValidation,
  handleSubmit: (values, { props, setErrors }) => {
    props.onSubmit(values);
  },
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withFormik(configForm)(ProductForm);
