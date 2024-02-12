module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define(
        "RefreshToken",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            token: DataTypes.STRING(100)
        },
        {
            timestamps: false,
        }
    );
    return RefreshToken;
};