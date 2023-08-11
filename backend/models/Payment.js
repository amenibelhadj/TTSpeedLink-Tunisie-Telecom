module.exports= (sequelize,DataTypes) =>{

    const Payment = sequelize.define("Payment",{
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        method:{
            type: DataTypes.ENUM('cache', 'credit_card'),
            allowNull: false,
        },
    });

    Payment.associate = function(models) {

        Payment.belongsTo(models.Invoice, {
            foreignKey: 'invoiceId',
            as: 'invoice',
        });

    };
    return Payment;
}