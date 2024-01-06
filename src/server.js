const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.port || 3000;
const requests = require("./modules/requests.module/routes");
const workers = require("./modules/workers.module/routes");
const users = require("./modules/users.module/routes");
const { isAuthenticated } = require("./middlewares/auth.middleware");
const { login, logout, registerUser } = require("./modules/auth.module/login.controller");
const cors = require('cors');
const { sendMessage } = require("./modules/rabbit/send");
const { receiveMessage } = require("./modules/rabbit/receive");
const { mainQueue } = require("./modules/utils/queues");

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth/login", login);
app.use(isAuthenticated);

app.get("/supporting_academies", (req, res) => {
  res.jsonp({
    error: "",
    data: { result: ["math", "physics"] },
  });

})
app.use("/auth/logout", logout);
app.use("/auth/register_user", registerUser);

app.use("/requests", requests);
app.use("/workers", workers);
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

