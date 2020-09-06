const express = require("express");
const {
  BAD_CLIENT_REQUEST_400_OBJ,
  BAD_INTERNAL_500_OBJ,
} = require("../../custom/responseMessages");
const sendResponse = require("../../custom/response");
const { getCartListByUserId, addPrductToCart } = require("../../services/cart");

const cart = express.Router();

cart.get("/list", async (req, res) => {
  try {
    /*  Get the req.body and validate it */
    req.checkQuery("offset", "cart skip should be a number").optional().isInt();
    req.checkQuery("limit", "cart limit should be a number").optional().isInt();

    const reqErrors = req.validationErrors();
    if (reqErrors) {
      return sendResponse(
        res,
        BAD_CLIENT_REQUEST_400_OBJ.code,
        {},
        reqErrors[0].msg
      );
    }
    const { limit = 100, offset = 0 } = req.query;
    const { _id: userId } = req.user;
    const result = await getCartListByUserId(limit, offset, userId);
    const { status } = result;
    if (!result.success) {
      return sendResponse(res, status.code, {}, status.info);
    }

    const { list } = result.data;
    const responseData = {
      list,
      limit,
      offset,
    };
    return sendResponse(res, status.code, responseData, status.info);
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      BAD_INTERNAL_500_OBJ.code,
      {},
      BAD_INTERNAL_500_OBJ.info
    );
  }
});

cart.post("/add/:productId", async (req, res) => {
  try {
    /*  Get the req.body and validate it */
    req.check("productId", "Product Id is incorrect").isMongoId();

    const reqErrors = req.validationErrors();
    if (reqErrors) {
      return sendResponse(
        res,
        BAD_CLIENT_REQUEST_400_OBJ.code,
        {},
        reqErrors[0].msg
      );
    }
    const { productId } = req.params;
    const { _id: userId } = req.user;
    const result = await addPrductToCart(productId, userId);
    const { status } = result;
    if (!result.success) {
      return sendResponse(res, status.code, {}, status.info);
    }

    const responseData = {};
    return sendResponse(res, status.code, responseData, status.info);
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      BAD_INTERNAL_500_OBJ.code,
      {},
      BAD_INTERNAL_500_OBJ.info
    );
  }
});

module.exports = cart;
