const {
  NO_PRODUCT_FOUND,
  GET_DATA_SUCCESS,
  PRODUCT_ADDED_TO_CART_SUCCESS,
  PRODUCT_ALREADY_IN_CART,
} = require("../../custom/responseMessages");

async function getCartListByUserId(limit, offset, user) {
  /**
   * Find the products from cart with limit and offset further we can add search also for a particular user
   *
   */
  const list = await db.carts
    .find({ user, isActive: true })
    .limit(+limit)
    .skip(+offset)
    .sort({ createdAt: -1 })
    .lean();

  if (!list || !list.length) {
    return { success: false, data: {}, status: NO_PRODUCT_FOUND };
  }

  return {
    success: true,
    data: { list },
    status: GET_DATA_SUCCESS,
  };
}

async function addPrductToCart(product, user) {
  /**
   * add the product to cart
   *
   */
  //check if proct is ther in DB or not
  let productData = await db.products.findOne({ _id: product }).lean();
  if (!productData)
    return { success: false, data: {}, status: NO_PRODUCT_FOUND };

  //check if product is already added or not
  let inCart = await db.carts.findOne({ product, user, isActive: true }).lean();
  if (inCart)
    return { success: false, data: {}, status: PRODUCT_ALREADY_IN_CART };
  let cartProduct = new db.carts({
    user,
    product,
  });
  await cartProduct.save();

  return {
    success: true,
    data: {},
    status: PRODUCT_ADDED_TO_CART_SUCCESS,
  };
}

module.exports = { getCartListByUserId, addPrductToCart };
