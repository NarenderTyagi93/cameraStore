const express = require("express");
const {
  BAD_CLIENT_REQUEST_400_OBJ,
  BAD_INTERNAL_500_OBJ,
} = require("../../custom/responseMessages");
const sendResponse = require("../../custom/response");
const { getProductList } = require("../../services/product");

const product = express.Router();

product.get("/list", async (req, res) => {
  try {
    /*  Get the req.body and validate it */
    req
      .checkQuery("offset", "product skip should be a number")
      .optional()
      .isInt();
    req
      .checkQuery("limit", "product limit should be a number")
      .optional()
      .isInt();

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
    const result = await getProductList(limit, offset);
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

product.get("/", async (req, res) => {
  try {
    console.log(await db.products.find().lean());
    // let newProduct = new db.products({
    //   name: "Nikon D850)",
    //   description: "Product Description",
    //   price: 26.5,
    //   make: 2019,
    // });
    // await newProduct.save();
    res.status(200).json({ message: "Camera-Store HEALTH: OK!" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = product;
