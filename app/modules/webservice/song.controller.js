const mongoose = require("mongoose");
const songRepo = require('song/repositories/song.repository');
const express = require("express");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");




// var geocoder = NodeGeocoder(options);

class songController {
	constructor() { }

	async store(req) {
		try {
			const songStore = await songRepo.save({song_id:req.body.song_id,user_id:req.user._id});
			if (!_.isEmpty(songStore)) {
				return { status: 200, data: songStore, message: 'Your song saved successfully.' };
			}else {
				return { status: 201, data:[], message: 'Something went wrong.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}

	async saveSent(req) {
		try {
			const songSentStore = await songRepo.saveSent({shared_user_id:req.body.shared_user_id,song_id:req.body.song_id,user_id:req.user._id});
			if (!_.isEmpty(songSentStore)) {
				return { status: 200, data: songSentStore, message: 'Your song shared successfully.' };
			}else {
				return { status: 201, data:[], message: 'Something went wrong.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}



	
}

module.exports = new songController();
