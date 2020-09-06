const {
  NO_PRODUCT_FOUND,
  GET_DATA_SUCCESS,
} = require("../../custom/responseMessages");

async function getProductList(limit, offset) {
  /**
   * Find the products with limit and offset further we can add search also
   *
   */
  const list = await db.products
    .find({ isActive: true })
    .limit(+limit)
    .skip(+offset)
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

module.exports = { getProductList };
