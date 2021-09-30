import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Row, Col } from "reactstrap";
import CustomImage from "../../../UI/customImage/CustomImage";
import defaultPath from "../../../../assets/images/medicine_default.png";
import "./BoxDetail.scss";

const BoxDetail = (props) => {
  const { product } = props;
  let images = [];

  if (product.imageDatas) {
    images = product.imageDatas;
  } else {
    // console.log(defaultPath);
    images = defaultPath;
  }
  // console.log(images);

  return (
    <React.Fragment>
      <Row>
        <Col xs="12" md="7" lg="7" className="mb-3">
          <CustomImage
            downloadPath={images}
            defaultPath={defaultPath}
            isImgDefault={true}
            alt="icon"
          />
        </Col>
        <Col xs="12" md="5" lg="5">
          <div className="title-link">
            <NavLink exact to={`editProduct/${product.id}`}>
              {product.gameName}
            </NavLink>
          </div>
          <br />
          <div className="subtitle">
            <br />
            {`License Price  ₹ ${product.licensePrice}
            `}
            <br />
            {`Exclusive License Price  ₹ ${product.exclusiveLicensePrice}
            `}
            {`Software Used  ₹ ${product.softwareUsed}`}
            <br />
            {`Plugins Used  ₹ ${product.plugins}`}
            <br />
            {`Downloads ${product.downloads}`}
            <br />
          </div>

          <br />
          <NavLink exact to={`editProduct/${product.id}`}>
            Edit
          </NavLink>
          <span> | </span>
          <NavLink
            to=""
            onClick={(event) => {
              const { product } = props;
              event.preventDefault();
              props.toggleDelete(event, product);
            }}
          >
            <span style={{ color: "red", fontSize: "medium" }}>Delete</span>
          </NavLink>
        </Col>
      </Row>
    </React.Fragment>
  );
};

BoxDetail.propTypes = {
  product: PropTypes.object.isRequired,
  toggleDelete: PropTypes.func.isRequired,
};

export default BoxDetail;
