const express = require("express");
const { sequelize } = require("../models");
const db = require("../models");

const router = express.Router();

// Assumption: GET request for stats only takes place on page refresh
// For every GET request on stats, update views in the DB first, then respond with entry
router.get("/getStats/:postID", (req, res) => {
    // db.stat.findAll({
    //     where: {
    //         postID: req.params.postID
    //     }
    // }).then((stats) => res.send(stats));
    db.stat.update(
        { views: sequelize.literal('views + 1') }, 
        { where: { postID: req.params.postID } }
    ).then(() => db.stat.findAll({ where: {postID: req.params.postID} }))
    .then((stats) => res.send(stats));
});

router.post("/newStats", (req, res) => {
    db.stat.create({
        postID: req.body.postID,
        likes: 0,
        shares: 0,
        views: 0,
        comments: []
    }).then((newStats) => {
        res.send(newStats)
    });
});

router.put("/updateLikes/:postID", (req, res) => {
    db.stat.update(
        { likes: req.body.likes },
        { where: { postID: req.params.postID } }
    ).then(() => res.send({ message: "Likes updated successfully" }));
})

router.put("/updateShares/:postID", (req, res) => {
    db.stat.update(
        { shares: req.body.shares },
        { where: {postID: req.params.postID } }
    ).then(() => res.send({ message: "Shares updated succcessfully" }));
})

router.get("/getComments/:postID", (req, res) => {
    db.stat.findAll({
        where: {
            postID: req.params.postID
        }
    }).then((stats) => res.send(stats[0].comments));
});

router.put("/updateComments/:postID", (req, res) => {
    db.stat.update(
        { comments: req.body },
        { where: { postID: req.params.postID } }
    ).then(() => res.send({ message: "Comments updated successfully" }))
})

module.exports = router;