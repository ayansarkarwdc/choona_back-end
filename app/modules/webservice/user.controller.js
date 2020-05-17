const mongoose = require("mongoose");
const userRepo = require("user/repositories/user.repository");
const roleRepo = require("role/repositories/role.repository");
const userModel = require("user/models/user.model.js");
const express = require("express");
const routeLabel = require("route-label");
const helper = require("../../helper/helper.js");
const mailer = require("../../helper/mailer.js");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const gm = require("gm").subClass({
	imageMagick: true
});
const fs = require("fs");
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

const User = new userModel();
// const NodeGeocoder = require("node-geocoder");
//mail send
const { join } = require("path");
const ejs = require("ejs");
const { readFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);

// var geocoder = NodeGeocoder(options);

class userController {
	constructor() { }

	/* @Method: signup @Description: User Signup */
	async signup(req, res) {
		try {
			
			let role = await roleRepo.getByField({ 'role': 'user' });
			req.body.role = role._id;

			/* user has username */
			if (!_.isEmpty(req.body.username)) {
				let checkUsername = await userRepo.getByField({ "username": req.body.username, "isDeleted": false });
				if (!_.isEmpty(checkUsername)) {
					return { status: 201, data: [], "message": 'Username already exists.' };
				}
			}

			if (req.body.register_type && ( req.body.register_type == "spotify" || req.body.register_type == "apple")) {
				let checkSocial = await userRepo.getByField({ "social_id": req.body.social_id, "isDeleted": false });
				if (!_.isEmpty(checkSocial)) {
					return { status: 201, data: [], "message": 'User already exists.' };
				}
			}


			if (req.body.register_type && (req.body.register_type == "spotify" || req.body.register_type == "apple")) {
				req.body.social_id = req.body.social_id;
			}

			/* user has profile image */
			if (req.files.length > 0) {
                req.files.map(file => {
                    gm('./public/uploads/user/' + file.filename).resize(200, 200, '!')
                        .write('./public/uploads/user/thumb/' + file.filename, function (err, result) {
                            if (!err) console.log('done');
                        });
					req.body.profile_image = file.filename;
                });
            }
			
			//req.body.password = User.generateHash(req.body.password);


			let userData = await userRepo.save(req.body);
			console.log(userData)
			const payload = { id: userData._id };
			const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 2592000 });
			return { status: 200, data: userData, token: token, "message": 'Registration successful.' };
		}catch (e) {
			
			return { status: 500, "message": e.message };
		}
	}

	

	/* @Method: signin
	// @Description: User Login
	*/
	async signin(req, res) {
		try {

			if (_.has(req.body, 'social_id')) {
				if (req.body.social_type == "apple" || req.body.social_type == "spotify") {
					let checkUserData = await userRepo.getByField({"social_id": req.body.social_id,"isDeleted": false});
					if (!_.isEmpty(checkUserData)) {
						let roleInfo = await roleRepo.getById(checkUserData.role)
						if (roleInfo.role == "user") {
							if (checkUserData.isActive && checkUserData.isActive === true) {
								const payload = {id: checkUserData._id};
								const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 2592000});

								return { status: 200, data: checkUserData, isLoggedIn: true, token: token, "message": 'Login successful.' };
							}
							else {
								return { status: 201, data: [], isLoggedIn: false, "message": 'User status is inactive.' };
							}
						}
						else {
							return { status: 201, data: [], isLoggedIn: false, "message": 'Sorry user not found.' };
						}
					}else {
						return { status: 201, data: [], isLoggedIn: false, "message": 'User not found.' };
					}
				}else{
					return { status: 201, data: [], isLoggedIn: false, "message": 'Social type not found..' };
				}
			}else{
				return { status: 201, data: [], isLoggedIn: false, "message": 'Something went wrong.' };
			}
			
		}catch (e) {
            return res.status(500).send({status: 500,message: e.message});
		}
	}


	/* @Method: forgotPassword
	// @Description: To forgotPassword
	*/
	async forgotPassword(req, res) {
		try {

			const user = await userRepo.getByField({
				email: req.body.email
			});

			if (!_.isEmpty(user)) {
				let verification_code = randomInt(1000, 9999);

				const setting_data = await settingRepo.getAllByField({
					"isDeleted": false
				});
				var settingObj = {};
				if (!_.isEmpty(setting_data)) {
					setting_data.forEach(function (element) {
						settingObj[element.setting_name.replace(/\s+/g, "_")] = element.setting_value;
					});
				}
				let locals = {
					user_fullname: user.full_name,
					verification_code: verification_code,
					site_title: 'Choona'//settingObj.Site_Title
				};
				let isMailSend = await mailer.sendMail(`Admin<${process.env.MAIL_USERNAME}>`, req.body.email, 'Verification Code', 'forgot-password', locals);
				if (isMailSend) {
					await userRepo.updateById({
						verification_code: verification_code
					}, user._id);
					return { status: 200, data: [], "message": 'A verification code to reset your password sent to your registered email' };
				}
			}else {
				return { status: 201, data: [], message: 'No matching user found' };
			}
		}
		catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}


	/* @Method: logout
	// @Description: To logout user
	*/
	async logout(req, res) {
		try {
			var user_id = req.user._id;
			const result = await userRepo.getById(user_id);
			if (!_.isEmpty(result)) {
				var updateObj = { "deviceToken": "", "deviceType": "" };
				const updatedObj = await userRepo.updateById(updateObj, user_id);
				const payload = { id: user_id };
				const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 0 });
				//jwt.destroy(token)
				return { status: 200, data: [], isLoggedIn: false, "message": 'Logout successfully' };
			}else {
				return { status: 201, data: [], "message": 'No user found' };
			}
		}catch (e) {
			return res.status(500).send({ "message": e.message });
		}
	}



  
	async getMyProfile(req) {
		try {
			const user = await userRepo.getById(req.user._id);
			if (!_.isEmpty(user)) {
				return { status: 200, data: user, message: 'Profile Info fetched Successfully' };
			}else {
				return { status: 201, data: [], message: 'User not found' };
			}
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}


	async updateProfile(req) {
		try {
			const data = await userRepo.getById(req.user._id);

			if (!_.isEmpty(data.email)) {
				if (_.has(req.body, 'email') && (data.email != req.body.email)) {
					const result = await userRepo.getByField({ 'email': req.body.email, 'isDeleted': false });
					if (!_.isEmpty(result)) {
						return { status: 201, data: {}, "message": "This email address is already exist!" };
					}
				}else {
					if (_.has(req, 'files')) {
						if (req.files.length > 0) {
							if (!_.isEmpty(data)) {
								if (!_.isEmpty(data) && data.profile_image != '') {
									if (fs.existsSync('public/uploads/user/' + data.profile_image)) {
										const upl_resume = fs.unlinkSync('public/uploads/user/' + data.profile_image);
									}
									if (fs.existsSync('public/uploads/user/thumb/' + data.profile_image)) {
										const upl_thumb_resume = fs.unlinkSync('public/uploads/user/thumb/' + data.profile_image);
									}
								}
							}
							gm('public/uploads/user/' + req.files[0].filename).resize(100).write('public/uploads/user/thumb/' + req.files[0].filename, function (err) {
								if (err) throw new Error(err.message);
							});
							req.body.profile_image = req.files[0].filename;
						}
					}else {
						req.body.profile_image = data.profile_image;
					}
				}

				const result2 = await userRepo.updateById(req.body, req.user._id);
				return { status: 200, data: result2, "message": "User details updated successfully" };
			}else {
				return { status: 200, data: [], "message": "User not found" };
			}
		}catch (e) {
			return res.status(500).send({ status: 500, message: e.message });
		}
	}

	async searchUser(req) {
		try{
			let role = await roleRepo.getByField({ 'role': 'admin' });
			let query = {
							_id:{$ne:req.user._id},
							'role':{$ne:role._id},
							'isDeleted':false,
							'isActive':true,
							full_name:{'$regex' :req.body.keyword, '$options' : 'i'},
						}
			const data = await userRepo.getAllByField(query);
			if(!_.isEmpty(data)){
				return { status: 200, data: data, "message": "User list fetched successfully." };
			}else{
				return { status: 200, data: data, "message": "No user found." };
			}
			
		}catch(e){
			console.log(e);
		}
	}

	
}

module.exports = new userController();
