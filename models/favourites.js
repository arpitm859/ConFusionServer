var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dish = new Schema({
	dishId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'dish',
	},
});

var Favourite = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
        },
        dishes: [dish],
	},
	{
		timestamps: true,
	}
);  

module.exports = mongoose.model('Favourite', Favourite);