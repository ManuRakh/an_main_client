const { getAcademyHost } = require("../utils/getAcademyHost");
const usersService = require("./users.service");

const getAllUsers = async (req,res) => {
    try {
      const { query } = req;
      const { selected_academy: selectedAcademy } = query;
      const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);
  
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

const updateMe = async (req, res) => {
  try {
    const { query, body } = req;
    const { selected_academy: selectedAcademy } = query;
    const currentUserId = req.user_id;

    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

      const updatedMe = await usersService.updateMe(body, currentUserId, host);
  
      res.jsonp({
        error: "",
        data: { result: updatedMe },
      });
    } catch (e) {
      res.status(400).send({
        error: e.response?.data?.error || e.message,
        data: ""
    });
  }
};

const getMe = async (req, res) => {
  try {
    const { query } = req;
    const { selected_academy: selectedAcademy } = query;
    const currentUserId = req.user_id;

    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

      const updatedMe = await usersService.getMe(currentUserId, host);
  
      res.jsonp({
        error: "",
        data: { result: updatedMe },
      });
    } catch (e) {
      res.status(400).send({
        error: e.response?.data?.error || e.message,
        data: ""
    });
  }
};

const create = async (req, res) => {
  const { body } = req;
  const { query } = req;
  const { selected_academy: selectedAcademy } = query;
  const isAdmin = req.admin;
  
  const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

  try {
    if (!isAdmin) throw new Error("Only users with admin permissions are allowed to access this");

    const foundUser = await usersService.create(body, host);

    res.jsonp({
      error: "",
      data: { result: foundUser },
    });
  } catch (e) {
    res.status(400).send({ error: e?.response?.data?.error || e.message, data: {} });
  }
}

module.exports = {
    getAllUsers,
    updateMe,
    getMe,
    create,
}