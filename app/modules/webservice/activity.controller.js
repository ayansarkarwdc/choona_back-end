const mongoose = require("mongoose");
const activityRepo = require('activity/repositories/activity.repository');
const express = require("express");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");




// var geocoder = NodeGeocoder(options);

class activityController {
	constructor() { }
    
    /* 
    // @Method: activityList
    // @Description: follower list
    */
	async activityList(req) {
		try {
			const activities = await activityRepo.list({'to_user_id':req.user._id});
			if (!_.isEmpty(activities)) {
				return { status: 200, data: activities, message: 'Your activities fetched successfully.' };
			}else {
				return { status: 201, data:[], message: 'no data found.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
    }
    
    
	
}

module.exports = new activityController();
