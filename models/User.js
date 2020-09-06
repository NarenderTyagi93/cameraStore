var mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    match: [
      /^[1-9][0-9]{9}$/,
      "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
    ],
  },
  imageUrl: {
    type: String,
  },
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

UserSchema.pre("update", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

UserSchema.pre("save", function (next) {
  this.update({}, { $set: { createdAt: new Date() } });
  next();
});

module.exports = mongoose.model("User", UserSchema);
