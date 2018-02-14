module.exports = {
	NONE: {
		message: "Введите город",
		status: -1
	},
	OK: {
		message: "ОКЕЙ",
		status: 0
	},
	NO_EXIST: {
		message: "Такого города нет в базе данных",
		status: 1
	},
	MENTIONED: {
		message: "Этот город уже был",
		status: 2
	},
	BAD_CITY: {
		message: "Этот городо не подходит",
		status: 3
	}
}