const { User } = require("./../db/db");

const auth = async (request, response, next) => {
  const token = request.headers.token;
  if (!token) {
    return response.sendStatus(404);
  } 
  const user = await User.findOne({ where: { token: token } });
  if (!user) {
    return response.sendStatus(404);
  }
  next();
}

module.exports = {
    auth
};