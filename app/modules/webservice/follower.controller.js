const mongoose = require("mongoose");
const follwerRepo = require('userFollower/repositories/follower.repository');
const activityRepo = require('activity/repositories/activity.repository');
const express = require("express");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");




// var geocoder = NodeGeocoder(options);

class userFollowerController {
	constructor() { }

    /* 
    // @Method: followUnfollow
    // @Description: follow and unfollow a user
    */
	async followUnfollow(req) {
		try {
          
			const follower = await follwerRepo.getByField({'user_id':req.user._id,'follower_id':req.body.follower_id});
			if (!_.isEmpty(follower)) {
                const followerRemoved = await follwerRepo.delete({'_id':mongoose.Types.ObjectId(follower._id)});
				return { status: 200, data: followerRemoved, message: 'Removed follower.' };
			}else {
                const savefollower = await follwerRepo.save({'user_id':req.user._id,'follower_id':req.body.follower_id});
				await activityRepo.save({'from_user_id':req.user._id,'to_user_id':req.body.follower_id,'activity_type':'following'});
				return { status: 201, data:savefollower, message: 'You have follwed this user successfully.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
    }
    
    /* 
    // @Method: followerList
    // @Description: follower list
    */
	async followerList(req) {
		try {
			const follower = await follwerRepo.followerList({'user_id':req.user._id});
			if (!_.isEmpty(follower)) {
				return { status: 200, data: follower, message: 'Your follower list fetched successfully.' };
			}else {
				return { status: 201, data:[], message: 'no data found.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
    }
    
    /* 
    // @Method: followerList
    // @Description: follower list
    */
	async followingList(req) {
		try {
			const follower = await follwerRepo.followinglist({'follower_id':req.user._id});
			if (!_.isEmpty(follower)) {
				return { status: 200, data: follower, message: 'Your following list fetched successfully.' };
			}else {
				return { status: 201, data:[], message: 'no data found.' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}



	
}

module.exports = new userFollowerController();
