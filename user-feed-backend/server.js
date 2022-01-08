const express = require("express");
const app = express();

const PORT = process.env.PORT || 4444;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For CORS related issues
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    next();
});

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// const cors = require("cors");
// app.use(cors());

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on: http://localhost:${PORT}`);
    })
});