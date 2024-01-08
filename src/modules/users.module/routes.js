const express = require("express");

const router = express.Router();
const { getAllUsers, updateMe, getMe, create } = require("./users.controller");

router.get("/", async (req, res) => {
  /*
        #swagger.tags = ['External Users. Balances']
        #swagger.summary = 'Get an external user Balances.'
        #swagger.description = 'Get an external user Balances.'
    */

  await getAllUsers(req, res);
});

router.patch("/me", async (req, res) => {
  await updateMe(req, res);
});

router.get("/me", async (req, res) => {
  await getMe(req, res);
});

router.post("/", async (req, res) => {
  await create(req, res);
})

module.exports = router;
