import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import SearchByParam from "../../components/UI/searchByParam/SearchByParam";
import CustomPagination from "../../components/UI/customPagination/CustomPagination";
import ProductBoxes from "../../components/products/productBoxes/ProductBoxes";
import {
  getAllProducts,
  deleteProduct,
  getProductsFromNumberPage,
  getProductsFromSearch,
} from "../../store/actions";
import { Card, CardBody } from "reactstrap";
import Loading from "../../components/UI/loading/Loading";
import CustomFeedback from "../../components/UI/customFeedback/CustomFeedback";

class Products extends React.Component {
  state = {
    typeOrder: null,
    isOpenModal: false,
    productSelected: null,
  };

  componentDidMount() {
    const { uid } = this.props;
    this.props.getAllProducts({ uid });
  }

  updateSearchText = (event) => {
    this.props.getProductsFromSearch({ searchText: event });
  };

  updateCurrentPage = (event) => {
    this.props.getProductsFromNumberPage({ currentPage: event });
  };

  toggleDelete = (event, product) => {
    console.log(product);
    this.setState((state, props) => ({
      isOpenModal: !state.isOpenModal,
      productSelected: product,
    }));
  };

  deleteProduct = () => {
    const { id, fullPath } = this.state.productSelected;
    this.props.deleteProduct({ id, fullPath });
    this.setState({
      isOpenModal: false,
      productSelected: null,
      currentPage: 0,
    });
  };

  render() {
    const {
      loading,
      products,
      numTotalProducts,
      pageSize,
      currentPage,
      error,
      searchText,
    } = this.props;
    console.log(products);
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
                additionalText="Error get products"
              />
              <h1 className="title">Products</h1>
              <SearchByParam
                numElements={numTotalProducts}
                nameSection="Products"
                pathNew="createProduct"
                endPlaceholder="Title"
                searchText={searchText}
                updateSearchText={this.updateSearchText}
              />
              <ProductBoxes
                products={products}
                isOpenModal={this.state.isOpenModal}
                toggleDelete={this.toggleDelete}
                deleteProduct={this.deleteProduct}
              />
              {/* <ProductBoxes
                products={products}
                isOpenModal={this.state.isOpenModal}
                toggleDelete={this.toggleDelete}
                deleteProduct={this.deleteProduct}
              /> */}
              <CustomPagination
                pageSize={pageSize}
                currentPage={currentPage}
                numTotalElements={numTotalProducts}
                updateCurrentPage={this.updateCurrentPage}
              />
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  uid: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  products: PropTypes.array.isRequired,
  numTotalProducts: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    uid: state.authData.uid,
    products: state.productsData.currentProducts,
    numTotalProducts: state.productsData.numTotalProducts,
    searchText: state.productsData.searchText,
    currentPage: state.productsData.currentPage,
    pageSize: state.productsData.pageSize,
    loading: state.manageLoading.loading,
    error: state.productsData.error,
  };
};

const mapDispatchToProps = {
  getAllProducts: getAllProducts.trigger,
  deleteProduct: deleteProduct.trigger,
  getProductsFromNumberPage: getProductsFromNumberPage.trigger,
  getProductsFromSearch: getProductsFromSearch.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
