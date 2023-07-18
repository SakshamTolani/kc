import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  LADIES_PRODUCT_LIST_REQUEST,
  LADIES_PRODUCT_LIST_SUCCESS,
  LADIES_PRODUCT_LIST_FAIL,
  KIDS_PRODUCT_LIST_REQUEST,
  KIDS_PRODUCT_LIST_SUCCESS,
  KIDS_PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: false, products: [] };
      break;
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
      break;
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export const productLadiesListReducer = (
  state = { ladiesProducts: [] },
  action
) => {
  switch (action.type) {
    case LADIES_PRODUCT_LIST_REQUEST:
      return { loading: false, ladiesProducts: [] };
      break;
    case LADIES_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        ladiesProducts: action.payload.products,
        ladiesPage: action.payload.ladiesPage,
        ladiesPages: action.payload.ladiesPages,
      };
      break;
    case LADIES_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export const productKidsListReducer = (
  state = { kidsProducts: [] },
  action
) => {
  switch (action.type) {
    case KIDS_PRODUCT_LIST_REQUEST:
      return { loading: false, kidsProducts: [] };
      break;
    case KIDS_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        kidsProducts: action.payload.products,
        kidsPage: action.payload.kidsPage,
        kidsPages: action.payload.kidsPages,
      };
      break;
    case KIDS_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: false, ...state };
      break;
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
      break;
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
      break;
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
      break;
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
      break;
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
      break;
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
      break;

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
      break;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
      break;
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
      break;
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
      break;

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
      break;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
