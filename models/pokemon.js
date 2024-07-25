module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define('Pokemon', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        base_experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Pokemon;
}