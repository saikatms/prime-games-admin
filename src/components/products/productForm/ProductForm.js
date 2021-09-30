import React from "react";
import { NavLink } from "react-router-dom";
import { ErrorMessage } from "formik";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import CustomErrorMsg from "../../UI/customErrorMsg/CustomErrorMsg";
import "./ProductForm.scss";
import CustomImage from "../../UI/customImage/CustomImage";
import defaultPath from "../../../assets/images/medicine_default.png";
import { PATH_PRODUCTS } from "../../../shared/constant";

const ProductForm = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    iconDefault,
  } = props;
  let fileName = "";
  if (values.icon) {
    fileName = values.icon.name;
  }
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col lg={12}>
          All fields with &nbsp;
          <span className="required-asterisk">*</span>
          &nbsp; are mandatory
        </Col>
      </Row>
      <CustomImage
        downloadPath={values.downloadPath}
        defaultPath={defaultPath}
        isImgDefault={iconDefault}
        alt="Product icon"
      />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="gameName">
                Game Name <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="gameName"
                id="gameName"
                invalid={errors.gameName && touched.gameName}
                placeholder="Enter Product Name"
                title="product title"
                value={values.gameName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="gameName" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="softwareUsed">
                Software Used <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="softwareUsed"
                id="softwareUsed"
                invalid={errors.softwareUsed && touched.softwareUsed}
                placeholder="Enter Used Software"
                title="Software Used"
                value={values.softwareUsed}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="softwareUsed" component={CustomErrorMsg} />
            </FormGroup>
          </Col>

          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="category">Select Product Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={values.value}
                onChange={handleChange}
              >
                <option value="" label="Select a Category" />
                <option value="Category1" label="Category1" />
                <option value="Category2" label="Category2" />
                <option value="Category3" label="Category3" />
                <option value="Category4" label="Category4" />
                <option value="Category5" label="Category5" />
                <option value="Category6" label="Category6" />
                <option value="Category7" label="Category7" />
                <option value="Category8" label="Category8" />
                <option value="Category9" label="Category9" />
                <option value="Category10" label="Category10" />
              </Input>
            </FormGroup>
          </Col>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="original">Original?</Label>
              <Input
                type="select"
                name="original"
                id="original"
                value={values.value}
                onChange={handleChange}
              >
                <option value="" label="Select Yes or No" />
                <option value="Yes" label="Yes" />
                <option value="No" label="No" />
              </Input>
            </FormGroup>
          </Col>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="canChange">Can Change?</Label>
              <Input
                type="select"
                name="canChange"
                id="canChange"
                value={values.value}
                onChange={handleChange}
              >
                <option value="" label="Select Yes or No" />
                <option value="Yes" label="Yes" />
                <option value="No" label="No" />
              </Input>
            </FormGroup>
          </Col>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="plugins">
                Plugins <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="plugins"
                id="plugins"
                invalid={errors.plugins && touched.plugins}
                placeholder="Enter Product Name"
                title="plugins"
                value={values.plugins}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="plugins" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={4} md={3}>
            <FormGroup>
              <Label for="licensePrice">
                License Price <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="licensePrice"
                id="licensePrice"
                invalid={errors.licensePrice && touched.licensePrice}
                placeholder="e.g. 99.99"
                title="licensePrice"
                value={values.licensePrice}
                onBlur={(event) => {
                  let value = event.target.value;
                  if (event.target.value && !isNaN(event.target.value)) {
                    value = parseFloat(event.target.value).toFixed(2);
                  }
                  setFieldTouched("licensePrice", true);
                  setFieldValue("licensePrice", value);
                }}
                onChange={handleChange}
              />
              <ErrorMessage name="licensePrice" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3}>
            <FormGroup>
              <Label for="exclusiveLicensePrice">
                Exclusive License Price{" "}
                <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="exclusiveLicensePrice"
                id="exclusiveLicensePrice"
                invalid={
                  errors.exclusiveLicensePrice && touched.exclusiveLicensePrice
                }
                placeholder="e.g. 99.99"
                title="exclusiveLicensePrice"
                value={values.exclusiveLicensePrice}
                onBlur={(event) => {
                  let value = event.target.value;
                  if (event.target.value && !isNaN(event.target.value)) {
                    value = parseFloat(event.target.value).toFixed(2);
                  }
                  setFieldTouched("exclusiveLicensePrice", true);
                  setFieldValue("exclusiveLicensePrice", value);
                }}
                onChange={handleChange}
              />
              <ErrorMessage
                name="exclusiveLicensePrice"
                component={CustomErrorMsg}
              />
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3}>
            <FormGroup>
              <Label for="downloads">
                Downloads <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text"
                name="downloads"
                id="downloads"
                invalid={errors.downloads && touched.prdownloadsice}
                placeholder="e.g. 100K"
                title="downloads"
                value={values.downloads}
                onBlur={(event) => {
                  let value = event.target.value;
                  if (event.target.value && !isNaN(event.target.value)) {
                    value = parseFloat(event.target.value).toFixed(2);
                  }
                  setFieldTouched("downloads", true);
                  setFieldValue("downloads", value);
                }}
                onChange={handleChange}
              />
              <ErrorMessage name="downloads" component={CustomErrorMsg} />
            </FormGroup>
          </Col>

          {values.category !== "" ? (
            <Col sm={6} md={4}>
              <FormGroup>
                <div className="label-upload-file mb-1">Cover image</div>
                <CustomInput
                  type="file"
                  id="icon"
                  name="icon"
                  title={fileName || "choose an image file"}
                  label={fileName || "choose an image file"}
                  invalid={touched.icon && !!errors.icon}
                  multiple
                  onChange={(event) => {
                    setFieldTouched("icon", true);
                    setFieldValue("icon", event.currentTarget.files);
                  }}
                />
                {touched.icon && errors.icon && (
                  <FormFeedback className="invalid-feedback-file">
                    {errors.icon}
                  </FormFeedback>
                )}
                <div className="mt-1">
                  Maximum size: 5MB
                  <br />
                  Allowed extensions: .jpeg,&nbsp;&nbsp;.jpg,&nbsp;&nbsp;.png
                </div>
              </FormGroup>
            </Col>
          ) : null}
        </Row>
        <div className="mt-3">
          <Button
            type="submit"
            color="primary"
            className="pull-right"
            size="lg"
          >
            Save Product
          </Button>
          <NavLink exact to={PATH_PRODUCTS}>
            <Button color="secondary" size="lg">
              Back
            </Button>
          </NavLink>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ProductForm;
