import { put, takeEvery } from "redux-saga/effects";
import {
  manageLoading,
  genericActionsProducts,
  getAllProducts,
  getInitialProducts,
  getPopularProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../actions";
import {
  getCollection,
  getDocById,
  addDoc,
  updateDoc,
  deleteDoc,
  saveFileOnStorage,
  deleteFileOnStorage,
  getPathReference,
  addImage,
} from "./firebaseAPI";
import { PRODUCTS } from "../../shared/constant";
import { sortByNumber, getElementsFromDocs } from "../../shared/utility";
import { sortAlphabetically } from "../../shared/utility";
import { PATH_PRODUCTS } from "../../shared/constant";

/*
function that returns all products to which
the authenticated user is associated
*/
function* getAllProductsSaga({ payload }) {
  try {
    yield put(manageLoading.request());
    const { uid } = payload;
    const querySnapshot = yield getCollection(PRODUCTS, uid);
    const products = getElementsFromDocs(querySnapshot);
    const productsOrdered = sortAlphabetically(products, "gameName", "ASC");
    yield put(getInitialProducts.success({ products: productsOrdered }));
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}

/*
function that returns popular products to which
the authenticated user is associated
*/
function* getPopularProductsSaga({ payload }) {
  try {
    yield put(manageLoading.request());
    const { uid } = payload;
    const querySnapshot = yield getCollection(PRODUCTS, uid);
    const products = getElementsFromDocs(querySnapshot);
    const orderedProducts = sortByNumber(products, "numSold", "DESC");
    let popularProducts = [];
    for (let i = 0; i < 3; i++) {
      popularProducts[i] = { ...orderedProducts[i] };
    }
    yield put(getPopularProducts.success({ products: popularProducts }));
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}

/*
function that returns the corresponding product
to the id passed as a parameter
*/
function* getProductSaga({ payload: idProduct }) {
  try {
    yield put(manageLoading.request());
    const doc = yield getDocById(PRODUCTS, idProduct);
    const product = { ...doc.data(), id: doc.id };
    yield put(getProduct.success({ product }));
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}

/*
function that saves products selected with 
associated icon in the firebase DB
*/
function* createProductSaga({ payload }) {
  console.log({ payload });

  try {
    yield put(manageLoading.request());
    const { dataProduct, imageProduct, history } = payload;
    const saveResponse = yield addDoc(PRODUCTS, dataProduct);

    if (imageProduct instanceof FileList) {
      let imgFileList = [];
      for (let index = 0; index < imageProduct.length; index++) {
        const uniqueFilename = `${
          imageProduct[index].name
        }_${new Date().getTime()}`;
        const newFullPath = `${PRODUCTS}/${uniqueFilename}`;
        const metadata = { customMetadata: { uid: dataProduct.uid } };
        const uploadResponse = yield saveFileOnStorage(
          newFullPath,
          imageProduct[index],
          metadata
        );
        const { snapshot } = uploadResponse.task;
        const pathReference = yield getPathReference(snapshot.ref.fullPath);
        const downloadUrl = yield pathReference.getDownloadURL();
        const updatedProperties = {
          downloadPath: downloadUrl,
          fullPath: newFullPath,
        };
        imgFileList.push(updatedProperties);
      }
      yield addImage(PRODUCTS, saveResponse.id, imgFileList);
    }
    history.push(PATH_PRODUCTS);
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}
/*
function that modifies products selected with 
associated icon in the firebase DB
*/
// function* editProductSaga({ payload }) {
//   console.log({ payload });
//   try {
//     yield put(manageLoading.request());
//     const { idProduct, dataProduct, imageProduct, fullPath, history } = payload;
//     yield updateDoc(PRODUCTS, idProduct, dataProduct);
//     if (imageProduct instanceof File) {
//       if (dataProduct.downloadPath) {
//         yield deleteFileOnStorage(fullPath);
//       }
//       const uniqueFilename = imageProduct.name + "_" + new Date().getTime();
//       const newFullPath = `${PRODUCTS}/${uniqueFilename}`;
//       const metadata = { customMetadata: { uid: dataProduct.uid } };
//       const uploadResponse = yield saveFileOnStorage(
//         newFullPath,
//         imageProduct,
//         metadata
//       );
//       const { snapshot } = uploadResponse.task;
//       const pathReference = yield getPathReference(snapshot.ref.fullPath);
//       const downloadUrl = yield pathReference.getDownloadURL();
//       const updatedProperties = {
//         downloadPath: downloadUrl,
//         fullPath: newFullPath,
//       };
//       yield updateDoc(PRODUCTS, idProduct, updatedProperties);
//     }
//     history.push(PATH_PRODUCTS);
//   } catch (error) {
//     yield put(genericActionsProducts.failure({ error }));
//   } finally {
//     yield put(manageLoading.fulfill());
//   }
// }
function* editProductSaga({ payload }) {
  try {
    yield put(manageLoading.request());
    console.log(payload);
    const { idProduct, dataProduct, imageProduct, fullPath, history } = payload;
    // console.log(imageProduct);
    yield updateDoc(PRODUCTS, idProduct, dataProduct);
    if (imageProduct instanceof FileList) {
      let imgFileList = [];
      for (let index = 0; index < imageProduct.length; index++) {
        const uniqueFilename = `${
          imageProduct[index].name
        }_${new Date().getTime()}`;
        const newFullPath = `${PRODUCTS}/${uniqueFilename}`;
        const metadata = { customMetadata: { uid: dataProduct.uid } };
        const uploadResponse = yield saveFileOnStorage(
          newFullPath,
          imageProduct[index],
          metadata
        );
        const { snapshot } = uploadResponse.task;
        const pathReference = yield getPathReference(snapshot.ref.fullPath);
        const downloadUrl = yield pathReference.getDownloadURL();
        const updatedProperties = {
          downloadPath: downloadUrl,
          fullPath: newFullPath,
        };
        imgFileList.push(updatedProperties);
      }
      yield addImage(PRODUCTS, idProduct, imgFileList);
    }
    history.push(PATH_PRODUCTS);
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}

/*
function that removes products selected with the associated 
icon from the firebase DB 
*/
function* deleteProductSaga({ payload }) {
  try {
    yield put(manageLoading.request());
    const { id, fullPath } = payload;
    yield deleteDoc(PRODUCTS, id);
    if (fullPath) {
      yield deleteFileOnStorage(fullPath);
    }
    yield put(deleteProduct.success({ id }));
  } catch (error) {
    yield put(genericActionsProducts.failure({ error }));
  } finally {
    yield put(manageLoading.fulfill());
  }
}

export const productsSagas = [
  takeEvery(getAllProducts.TRIGGER, getAllProductsSaga),
  takeEvery(getPopularProducts.TRIGGER, getPopularProductsSaga),
  takeEvery(getProduct.TRIGGER, getProductSaga),
  takeEvery(createProduct.TRIGGER, createProductSaga),
  takeEvery(editProduct.TRIGGER, editProductSaga),
  takeEvery(deleteProduct.TRIGGER, deleteProductSaga),
];
