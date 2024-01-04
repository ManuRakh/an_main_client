const { getAcademyHost } = require("../utils/getAcademyHost");
const usersService = require("./users.service");

const getAllUsers = async (req,res) => {
    try {
      const host = getAcademyHost(req.academy_host);

        const allUsers = await usersService.getAllUsers(host);
    
        res.jsonp({
          error: "",
          data: { result: allUsers },
        });
      } catch (e) {
        res.status(400).send({
          error: e.response?.data?.error || e.message,
          data: ""
      });
    }
}

module.exports = {
    getAllUsers,
}