const express = require('express');
const bodyParser = require('body-parser');
const favouriteRouter = express.Router();
const Favourite = require('../models/favourites');
var authenticate = require('../authenticate');
const cors = require('./cors');

favouriteRouter.use(bodyParser.json());

favouriteRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
		Favourite.findOne({ user: req.user._id })
			.populate('user')
			.populate('dishes')
			.exec((err, favourites) => {
				if (err) return next(err);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(favourites);
			});
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
		Favourite.findOne({ user: req.user._id }, (err, favourite) => {
			if (err) return next(err);
			if (!favourite) {
				Favourite.create({ user: req.user._id })
					.then((favourite) => {
						for (i = 0; i < req.body.length; i++) {
							if (favourite.dishes.indexOf(req.body[i]._id === -1)) {
								favourite.dishes.push(req.body[i]);
							}
						}
						favourite.save().then((favourite) => {
							Favourite.findById(favourite._id)
								.populate('user')
								.populate('dishes')
								.then((favourite) => {
									res.statusCode = 200;
									res.setHeader('Content-Type', 'application/json');
									res.json(favourite);
								});
						});
					})
					.catch((err) => {
						return next(err);
					});
			} else {
				for (i = 0; i < req.body.length; i++) {
					if (favourite.dishes.indexOf(req.body[i]._id === -1)) {
						favourite.dishes.push(req.body[i]);
					}
				}
			}
			favourite.save().then((favourite) => {
				Favourite.findById(favourite._id)
					.populate('user')
					.populate('dishes')
					.then((favourite) => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json(favourite);
					});
			});
		}).catch((err) => {
			return next(err);
		});
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
		Favourite.remove({})
			.then(
				(resp) => {
					res.statusCode = 200;
					res.setHeader('Content-type', 'applicatin/json');
					res.json(resp);
				},
				(err) => {
					console.log(err);
				}
			)
			.catch((err) => {
				console.log(err);
			});
	});

favouriteRouter
	.route('/:dishId')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
		Favourite.findOne({ user: req.user._id })
			.then((favourites) => {
				if (!favourites) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					return res.json({ exists: false, favourites: favourites });
				} else {
					if (favourites.dishes.indexOf(req.params.dishId) < 0) {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						return res.json({ exists: false, favourites: favourites });
					} else {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						return res.json({ exists: true, favourites: favourites });
					}
				}
			})
			.catch((err) => {
				return next(err);
			});
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
		Favourite.findOne({ user: req.user._id }, (err, favourite) => {
			if (err) return next(err);
			if (!favourite) {
				Favourite.create({ user: req.user._id })
					.then((favourite) => {
						favourite.dishes.push({ _id: req.params.dishId });
						favourite.save().then((favourite) => {
							Favourite.findById(favourite._id)
								.populate('user')
								.populate('dishes')
								.then((favourite) => {
									res.statusCode = 200;
									res.setHeader('Content-Type', 'application/json');
									res.json(favourite);
								});
						});
					})
					.catch((err) => {
						return next(err);
					});
			} else {
				favourite.dishes.push({ _id: req.params.dishId });
			}
			favourite.save().then((favourite) => {
				Favourite.findById(favourite._id)
					.populate('user')
					.populate('dishes')
					.then((favourite) => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json(favourite);
					});
			});
		}).catch((err) => {
			return next(err);
		});
	})
	.delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
		Favourite.findOne({ user: req.user._id }, (err, favourite) => {
			if (err) return next(err);
			if (!favourite) {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'application/json');
				return res.end(`Dish ${req.params.dishId} is not present`);
			} else {
				var index = favourites.dishes.indexOf(req.params.dishId);
				if (index < 0) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					return res.json({ exists: false, favourites: favourites });
				} else {
					favourite.dishes.splice(index, 1);
					favourite.save().then((favourite) => {
						Favourite.findById(favourite._id)
							.populate('user')
							.populate('dishes')
							.then((favourite) => {
								res.statusCode = 200;
								res.setHeader('Content-Type', 'application/json');
								res.json(favourite);
							});
					});
				}
			}
		}).catch((err) => {
			return next(err);
		});
	});

module.exports = favouriteRouter;