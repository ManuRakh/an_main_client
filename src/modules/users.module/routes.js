const express = require("express");

const router = express.Router();
const { getAllUsers } = require("./users.controller");

router.get("/", async (req, res) => {
  /*
        #swagger.tags = ['External Users. Balances']
        #swagger.summary = 'Get an external user Balances.'
        #swagger.description = 'Get an external user Balances.'
    */

  await getAllUsers(req, res);
});

module.exports = router;
