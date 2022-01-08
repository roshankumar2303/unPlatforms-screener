module.exports = (sequelize, DataTypes) => {
    const stat = sequelize.define("stat", {
        postID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shares: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.JSON,
            allowNull: false
        }
    });
    return stat;
}