import React from "react";
import PropTypes from "prop-types";
import BoxDetail from "../../UI/panels/boxDetail/BoxDetail";
import ConfirmModal from "../../UI/modals/confirmModal/ConfirmModal";
import { Row, Col } from "reactstrap";
import "./ProductBoxes.scss";

const ProductBoxes = (props) => {
  return (
    <React.Fragment>
      <Row>
        {props.products.map((currentProduct, index) => (
          <Col xs="12" sm="6" xl="4" key={index}>
            <article className="col">
              <BoxDetail
                product={{ ...currentProduct }}
                toggleDelete={props.toggleDelete}
              />
            </article>
          </Col>
        ))}
      </Row>
      <ConfirmModal
        title="Product removal confirmation"
        isOpenModal={props.isOpenModal}
        toggleDelete={props.toggleDelete}
        confirm={props.deleteProduct}
      >
        Are you sure you want to remove selected Product ?
      </ConfirmModal>
    </React.Fragment>
  );
};

ProductBoxes.propTypes = {
  products: PropTypes.array.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleDelete: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default ProductBoxes;
