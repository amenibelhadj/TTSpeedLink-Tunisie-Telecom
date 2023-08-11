module.exports= (sequelize,DataTypes) =>{

    const Stock = sequelize.define("Stock",{
        sim_type:{
            type: DataTypes.ENUM('standard','nano','micro'),
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('available', 'out_of_stock'),
            allowNull: false,
        },
    });

    Stock.associate = function(models) {

        Stock.hasMany(models.Card, {
            foreignKey: 'stockId',
            as: 'cards',
        });

        Stock.belongsTo(models.Shop, {
            foreignKey: 'shopId',
            as: 'shop',
        });
    };

    return Stock;
}