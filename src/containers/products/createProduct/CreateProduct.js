import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import ProductFormHOC from "../../../hoc/form/ProductFormHOC";
import { createProduct } from "../../../store/actions";
import { Card, CardBody, Row, Col } from "reactstrap";
import Loading from "../../../components/UI/loading/Loading";
import CustomFeedback from "../../../components/UI/customFeedback/CustomFeedback";

class CreateProduct extends React.Component {
  onSubmit = (formValue) => {
    console.log(formValue);
    const { history } = this.props;
    const dataProduct = { ...formValue };
    const imageProduct = dataProduct.icon;
    delete dataProduct.id;
    delete dataProduct.icon;
    dataProduct.uid = this.props.uid;
    this.props.createProduct({ dataProduct, imageProduct, history });
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
                additionalText="Error create game"
              />
              <h1 className="title">Add New Game</h1>
              <br />
              <Row>
                <Col xs="12" lg="12">
                  <ProductFormHOC product={{}} onSubmit={this.onSubmit} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

CreateProduct.propTypes = {
  uid: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    uid: state.authData.uid,
    loading: state.manageLoading.loading,
    error: state.productsData.error,
  };
};

const mapDispatchToProps = {
  createProduct: createProduct.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
