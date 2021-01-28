const mongoose = require("mongoose");
const schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leaderSchema = new schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
			required: true,
		},
		abbr: {
			type: Currency,
			default: "",
		},
		featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

var Leaders = mongoose.model("leader", leaderSchema);

module.exports = Leaders;
