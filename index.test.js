const { db } = require("./db")
const { Restaurant, Menu, Item } = require("./models/index")
const { seedRestaurant, seedMenu } = require("./seedData")

describe("Restaurant and Menu Models", () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeAll(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await db.sync({ force: true })
	})

	test("can create a Restaurant", async () => {
		const restaurant = await Restaurant.create({ name: "Chuys", location: "Fort Worth", cuisine: "TexMex" })
		expect(restaurant.cuisine).toEqual("TexMex")
	})

	test("can create a Menu", async () => {
		const menu = await Menu.create({ title: "TexMex Foods" })
		expect(menu.title).toEqual("TexMex Foods")
	})

	test("can find Restaurants", async () => {
		let foundRestaurant = await Restaurant.findByPk(1)
		expect(foundRestaurant.name).toEqual("Chuys")
	})

	test("can find Menus", async () => {
		let foundMenu = await Menu.findByPk(1)
		expect(foundMenu.title).toEqual("TexMex Foods")
	})

	test("can delete Restaurants", async () => {
		const restaurant2 = await Restaurant.create({ name: "Popeyes", location: "FW", cuisine: "chicken" })
		let deleteRestaurant = await restaurant2.destroy()
		expect(deleteRestaurant.name).toEqual("Popeyes")
	})

	test("can delete Restaurants", async () => {
		const menu2 = await Menu.create({ title: "Chicken" })
		let deleteMenu = await menu2.destroy()
		expect(deleteMenu.title).toEqual("Chicken")
	})

	it("check Restaurant/Menu association", async () => {
		const restaurant = await Restaurant.create({ name: "Taco Bell", location: "FW", cuisine: "Tacos" })
		const menu = await Menu.create({ title: "Taco Taco" })
		await menu.setRestaurant(restaurant)
		const restaurantMenus = await Restaurant.findOne({
			where: {
				name: "Taco Bell",
			},
			include: Menu,
		})
		expect(restaurantMenus.Menus[0].title).toBe("Taco Taco")
	})

	it("check Menu/Item association", async () => {
		const menu = await Menu.create({ title: "BBQ" })
		const item = await Item.create({ name: "Pork Ribs", image: "ribs.jpg", price: 30, vegetarian: false })
		await item.addMenu(menu)
		const menuItems = await Menu.findOne({
			where: {
				title: "BBQ",
			},
			include: Item,
		})
		expect(menuItems.Items[0].name).toBe("Pork Ribs")
	})
})
