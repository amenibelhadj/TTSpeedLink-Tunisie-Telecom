module.exports = (sequelize, DataTypes) => {
    // Define the Order model with the specified attributes
    const Order = sequelize.define("Order", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    // Define associations for the Order model
    Order.associate = function (models) {
        // Order belongs to a User model
        Order.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });

        // Order has one Invoice model associated with it
        Order.hasOne(models.Invoice, {
            foreignKey: "orderId",
            as: "invoice",
        });

        // Order has many Card models associated with it
        Order.hasMany(models.Card, {
            foreignKey: "orderId",
            as: "cards",
        });
    };

    // Return the Order model
    return Order;
};
