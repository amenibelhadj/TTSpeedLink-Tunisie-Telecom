module.exports = (sequelize, DataTypes) => {
    // Define the Invoice model with the specified attributes
    const Invoice = sequelize.define("Invoice", {
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Define associations for the Invoice model
    Invoice.associate = function(models) {
        // Invoice has one Payment model associated with it
        Invoice.hasOne(models.Payment, {
            foreignKey: 'invoiceId',
            as: 'invoice',
        });

        // Invoice belongs to an Order model
        Invoice.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order',
        });
    };

    // Return the Invoice model
    return Invoice;
};
