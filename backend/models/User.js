module.exports= (sequelize,DataTypes) =>{

    const User = sequelize.define("User",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cin:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.ENUM('Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef',
                'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
                'Gabès', 'Medenine', 'Tataouine'),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'seller', 'client'),
            allowNull: false,
        },

    });

    User.associate = function (models) {
        User.hasMany(models.Order, {
            foreignKey: "userId",
            as: "orders",
        });

        User.belongsTo(models.Shop, {
            foreignKey: "shopId",
            as: "shop",
        });
    };

    return User;
}