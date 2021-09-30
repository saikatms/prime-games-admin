import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getProduct, editProduct } from "../../../store/actions";
import ProductFormHOC from "../../../hoc/form/ProductFormHOC";
import { Card, CardBody, Row, Col } from "reactstrap";
import Loading from "../../../components/UI/loading/Loading";
import CustomFeedback from "../../../components/UI/customFeedback/CustomFeedback";

class EditProduct extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  onSubmit = (formValue) => {
    console.log(formValue);
    const { history } = this.props;
    const dataProduct = { ...formValue };
    const idProduct = dataProduct.id;
    const imageProduct = dataProduct.icon;
    const { fullPath } = this.props.detailProduct;
    delete dataProduct.id;
    delete dataProduct.icon;
    dataProduct.uid = this.props.uid;
    this.props.editProduct({
      idProduct,
      dataProduct,
      imageProduct,
      fullPath,
      history,
    });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <div
          className={classnames("", {
            "d-none": !loading,
          })}
        >
          <Loading />
        </div>
        <div
          className={classnames("", {
            "d-none": loading,
          })}
        >
          <Card>
            <CardBody>
              <CustomFeedback
                type="danger"
                message={error.message}
                additionalText="Error edit Product"
              />
              <h1 className="title">Edit Product</h1>
              <br />
              <Row>
                <Col xs="12" lg="12">
                  <ProductFormHOC
                    product={this.props.detailProduct}
                    // iconDefault={true}
                    onSubmit={this.onSubmit}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

EditProduct.propTypes = {
  uid: PropTypes.string.isRequired,
  detailProduct: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    uid: state.authData.uid,
    detailProduct: state.productsData.detailProduct,
    loading: state.manageLoading.loading,
    error: state.productsData.error,
  };
};

const mapDispatchToProps = {
  getProduct: getProduct.trigger,
  editProduct: editProduct.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
