module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
        name: { type: "TEXT", allowNull: false }
    },{
        timestamps: false,
        tableName: 'projects',
        classMethods: {
            associate : function (models) {
                Project.hasMany(models.Todo, {
                    foreignKey : "project_id"
                })
            }
        }
    });

    return Project;
};