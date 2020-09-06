const TOKEN_MISSING_404 = "Please log in first.";
const TOKEN_ERROR_401 = "Token is corrupt";

const USER_NOT_FOUND_OBJ = { code: 402, info: "User not found" };

const BAD_CLIENT_REQUEST_400_OBJ = { code: 400, info: "Bad request" };

const WRONG_PASSWORD_400_OBJ = { code: 400, info: "Incorrect password" };
const BAD_INTERNAL_500_OBJ = { code: 500, info: "Something went wrong" };
const TOKEN_EXPIRED_ERROR = {
  code: 401,
  info: "Session expired, Please login again",
};

const NO_PRODUCT_FOUND = {
  code: 403,
  info: "No Product Found",
};

const PRODUCT_ALREADY_IN_CART = {
  code: 403,
  info: "Product is already added to your cart",
};

const INACTIVE_ENTRY_OBJ = {
  code: 409,
  info: "Deactivated user",
};

const USER_UPDATE_SUCCESS = {
  code: 200,
  info: "User updated successfully",
};

const LOGIN_SUCCESS = {
  code: 200,
  info: "Login successful",
};

const GET_DATA_SUCCESS = {
  code: 200,
  info: "Data Feteched successfully",
};

const PRODUCT_ADDED_TO_CART_SUCCESS = {
  code: 200,
  info: "Product added to cart successfully",
};

module.exports = {
  TOKEN_ERROR_401,
  TOKEN_EXPIRED_ERROR,
  TOKEN_MISSING_404,
  LOGIN_SUCCESS,
  USER_UPDATE_SUCCESS,
  INACTIVE_ENTRY_OBJ,
  BAD_INTERNAL_500_OBJ,
  BAD_CLIENT_REQUEST_400_OBJ,
  WRONG_PASSWORD_400_OBJ,
  USER_NOT_FOUND_OBJ,
  GET_DATA_SUCCESS,
  NO_PRODUCT_FOUND,
  PRODUCT_ADDED_TO_CART_SUCCESS,
  PRODUCT_ALREADY_IN_CART,
};
