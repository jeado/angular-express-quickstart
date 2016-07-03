module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("projects", {
        id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
        name: { type: "TEXT", allowNull: false }
    },{
        timestamps: false
    });

    return Project;
};