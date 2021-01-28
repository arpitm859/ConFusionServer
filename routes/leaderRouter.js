const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
const cors = require('./cors');
const Leaders = require('../models/leaders');
var authenticate = require('../authenticate');


leaderRouter
	.route('/')
	.get(cors.cors, (req, res, next) => {
		Leaders.find({})
			.then(
				(leaders) => {
					res.statusCode = 200;
					res.setHeader('Content-type', 'applicatin/json');
					res.json(leaders);
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
			Leaders.create(req.body)
				.then(
					(leader) => {
						console.log('leader created', leader);
						res.statusCode = 200;
						res.setHeader('Content-type', 'applicatin/json');
						res.json(leader);
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
			res.end('PUT operation not supported on /leaders');
		}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Leaders.remove({})
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

leaderRouter
	.route('/:leaderId')
	.get(cors.cors, (req, res, next) => {
		Leaders.findById(leader.params.leaderId)
			.then(
				(leader) => {
					res.statusCode = 200;
					res.setHeader('Content-type', 'applicatin/json');
					res.json(leader);
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
			res.end('POST operation not supported on /leaders/' + req.params.leaderId);
		}
	)
	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Leaders.findByIdAndUpdate(
				leader.params.leaderId,
				{
					$set: req.body,
				},
				{ new: true }
			)
				.then(
					(leader) => {
						res.statusCode = 200;
						res.setHeader('Content-type', 'applicatin/json');
						res.json(leader);
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
			Leaders.findByIdAndDelete(leader.params.leaderId)
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

module.exports = leaderRouter;