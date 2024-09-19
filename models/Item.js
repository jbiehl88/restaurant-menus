const { db, DataTypes, Model } = require("../db")

class Item extends Model {}

Item.init(
	{
		name: DataTypes.STRING,
		image: DataTypes.STRING,
		price: DataTypes.INTEGER,
		vegetarian: DataTypes.BOOLEAN,
	},
	{
		sequelize: db,
		modelName: "Item",
	}
)

module.exports = { Item }
