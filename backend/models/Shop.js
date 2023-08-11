module.exports= (sequelize,DataTypes) =>{

    const Shop = sequelize.define("Shop",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('open', 'closed','renovation'),
            allowNull: false,
        },
    });

    Shop.associate = function(models) {

        Shop.hasMany(models.Stock, {
            foreignKey: 'shopId',
            as: 'stocks',
        });

        Shop.hasMany(models.User, {
            foreignKey: 'shopId',
            as: 'users',
        });
    };


    return Shop;
}