module.exports = function (sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        id :  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        content :  { type: DataTypes.TEXT, allowNull : false },
        done :  { type: DataTypes.BOOLEAN, allowNull : true },
        due_date : { type: DataTypes.STRING, allowNull : true  },
        priority :   { type: DataTypes.INTEGER, allowNull: true }
    },{
        timestamps: false,
        tableName: 'todos',
        classMethods: {
            associate : function (models) {
                Todo.belongsTo(models.Project, {
                    foreignKey : "project_id"
                })
            }
        }
    });

    return Todo;
}