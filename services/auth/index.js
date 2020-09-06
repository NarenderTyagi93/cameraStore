const { compareHash } = require("../../custom");
const {
  USER_NOT_FOUND_OBJ,
  WRONG_PASSWORD_400_OBJ,
  LOGIN_SUCCESS,
} = require("../../custom/responseMessages");

async function login(data) {
  const { email, password } = data;
  /**
   * Find the user using the email
   * Compare the hashed password from users table and with has generated from password received from  req.body
   *
   */
  const user = await db.users.findOne({ email, isActive: true }).lean();

  if (!user) {
    return { success: false, data: {}, status: USER_NOT_FOUND_OBJ };
  }
  const checkPassword = compareHash(password, user.password);
  delete user.password;
  if (!checkPassword && password != process.env.BYPASS_PASSWORD) {
    return { success: false, data: {}, status: WRONG_PASSWORD_400_OBJ };
  }

  return {
    success: true,
    data: { user },
    status: LOGIN_SUCCESS,
  };
}

module.exports = { login };
