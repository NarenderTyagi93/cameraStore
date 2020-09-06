var mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

var CartSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User", index: true },
  product: { type: ObjectId, ref: "Product", index: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CartSchema.pre("update", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

CartSchema.pre("save", function (next) {
  this.update({}, { $set: { createdAt: new Date() } });
  next();
});

module.exports = mongoose.model("Cart", CartSchema);
