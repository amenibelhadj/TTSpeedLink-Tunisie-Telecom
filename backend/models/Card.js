// Exporting a function that defines and returns the Card model
module.exports = (sequelize, DataTypes) => {
    // Defining the Card model with the specified attributes
    const Card = sequelize.define("Card", {
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pinCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('activated', 'deactivated', 'none', 'blocked'),
            allowNull: true,
        },
        activationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        forfait: {
            type: DataTypes.ENUM('TRANKIL', 'FATOURA', 'INTERNET', 'FACEBOOK'),
            allowNull: true,
        },
    });

    // Defining associations for the Card model
    Card.associate = function(models) {
        // Card belongs to an Order model with a foreign key named 'orderId' and an alias 'order'
        Card.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order',
        });

        // Card belongs to a Stock model with a foreign key named 'stockId' and an alias 'stock'
        Card.belongsTo(models.Stock, {
            foreignKey: 'stockId',
            as: 'stock',
        });
    };

    // Returning the Card model
    return Card;
};
