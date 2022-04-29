module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("Notes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        assigneesId: {
            type: Sequelize.STRING
        },
        priority: {
            type: Sequelize.INTEGER
        }
    });
    return Notes;
};