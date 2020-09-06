const bcrypt = require("bcryptjs");
const _ = require("underscore");

const compareHash = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

const generateHash = (data) => {
  return bcrypt.hashSync(data, 8);
};

const addSafeReadOnlyGlobal = (prop, val) => {
  Object.defineProperty(global, prop, {
    get: function () {
      return val;
    },
    set: function () {
      console.warn(
        "You are trying to set the READONLY GLOBAL variable `",
        prop,
        "`. This is not permitted. Ignored!"
      );
    },
  });
};

module.exports = { compareHash, generateHash, _, addSafeReadOnlyGlobal };
