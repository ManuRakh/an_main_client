const dotenv = require("dotenv");
dotenv.config();

const getAcademyHost = (academy) => {
    let academyHost = "";
    if (academy === "math") academyHost = process.env.math;
    if (academy === "physics") academyHost = process.env.physics;
    if (!academyHost) throw new Error("Wrong academy choosen");

    return academyHost;
}

module.exports = {
    getAcademyHost,
}