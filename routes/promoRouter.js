const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
const authenticate = require('../authenticate');
const Promotions = require("../models/promotions");
const cors = require('./cors');


promoRouter.use(bodyParser.json());

promoRouter
	.route('/')
	.get(cors.cors, (req, res, next) => {
		Promotions.find({})
			.then(
				(promotions) => {
					res.statusCode = 200;
					res.setHeader('Content-type', 'applicatin/json');
					res.json(dishes);
				},
				(err) => {
					console.log(err);
				}
			)
			.catch((err) => {
				console.log(err);
			});
	})
	.post(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Promotions.create(req.body)
				.then(
					(promo) => {
						console.log('promo created', promo);
						res.statusCode = 200;
						res.setHeader('Content-type', 'applicatin/json');
						res.json(dish);
					},
					(err) => {
						console.log(err);
					}
				)
				.catch((err) => {
					console.log(err);
				});
		}
	)

	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			res.statusCode = 403;
			res.end('PUT operation not supported on /promotions');
		}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Promotions.remove({})
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
		}
	);

promoRouter
	.route('/:promoId')
	.get(cors.cors, (req, res, next) => {
		Promotions.findById(promo.params.promoId)
			.then(
				(promo) => {
					res.statusCode = 200;
					res.setHeader('Content-type', 'applicatin/json');
					res.json(promo);
				},
				(err) => {
					console.log(err);
				}
			)
			.catch((err) => {
				console.log(err);
			});
	})
	.post(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			res.statusCode = 403;
			res.end('POST operation not supported on /promotions/' + req.params.promoId);
		}
	)
	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Promotions.findByIdAndUpdate(
				promo.params.promoId,
				{
					$set: req.body,
				},
				{ new: true }
			)
				.then(
					(promo) => {
						res.statusCode = 200;
						res.setHeader('Content-type', 'applicatin/json');
						res.json(promo);
					},
					(err) => {
						console.log(err);
					}
				)
				.catch((err) => {
					console.log(err);
				});
		}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Promotions.findByIdAndDelete(promo.params.promoId)
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
		}
	);

module.exports = promoRouter;