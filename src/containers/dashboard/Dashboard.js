import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import AsyncComponentLoader from "../../hoc/asyncComponentLoader/AsyncComponentLoader";
import MainLayout from "../../hoc/layout/mainLayout/MainLayout";
import PageNotFound from "../../components/pageNotFound/PageNotFound";
import AlertModal from "../../components/UI/modals/alertModal/AlertModal";
import { resetErrorAuth } from "../../store/actions";

const Products = AsyncComponentLoader({
  loader: () => import("../products/Products"),
});
const EditProduct = AsyncComponentLoader({
  loader: () => import("../products/editProduct/EditProduct"),
});
const CreateProduct = AsyncComponentLoader({
  loader: () => import("../products/createProduct/CreateProduct"),
});

class Dashboard extends Component {
  state = {
    isOpenModal: false,
  };

  toggleModal = () => {
    if (this.state.isOpenModal) {
      this.props.resetErrorAuth();
    }
    this.setState((state, props) => ({
      isOpenModal: !state.isOpenModal,
    }));
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.error.code && !this.state.isOpenModal) {
      this.setState({
        isOpenModal: true,
      });
    }
    return true;
  }

  render() {
    const { error } = this.props;
    const { isOpenModal } = this.state;
    return (
      <MainLayout>
        {
          <Switch>
            <Route
              path={`${this.props.match.url}/products`}
              component={Products}
            />
            <Route
              path={`${this.props.match.url}/createProduct`}
              component={CreateProduct}
            />
            <Route
              path={`${this.props.match.url}/editProduct/:id`}
              component={EditProduct}
            />
            <Route
              exact
              path="/dashboard"
              render={() => <Redirect to="/dashboard/products" />}
            />
            <Route component={PageNotFound} />
          </Switch>
        }
        <AlertModal
          title="Unexpected Error"
          isOpenModal={isOpenModal}
          toggleModal={this.toggleModal}
        >
          {error.message}
        </AlertModal>
      </MainLayout>
    );
  }
}

Dashboard.propTypes = {
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    error: state.authData.error,
  };
};

const mapDispatchToProps = {
  resetErrorAuth: resetErrorAuth.trigger,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
