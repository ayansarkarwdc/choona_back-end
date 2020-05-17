const mongoose = require("mongoose");
const messageRepo = require('message/repositories/message.repository');
const express = require("express");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");




// var geocoder = NodeGeocoder(options);

class messageController {
	constructor() { }
    
    /* 
    // @Method: store
    // @Description: save song by user
    */
	async store(req) {
		try {
			
			
            let saveMesage = [];
			const start = async () => {
                await asyncForEach(req.body.reciever_id, async (data) => {
					/* song array in loop */
                    await asyncForEach(req.body.song, async (song, index) => {
						if(song !=undefined){
							let query = {
								reciever_id:mongoose.Types.ObjectId(data),
								sender_id:req.user._id,
								song:song
							}
							let message = await messageRepo.getByField(query);
							if(_.isEmpty(message)){ //insertin new data
								let querySave = {
									'reciever_id':mongoose.Types.ObjectId(data),
									'sender_id':req.user._id,
									song:song,
									
								}
								var save = await messageRepo.save(querySave);
								saveMesage.push(save)
							}/* else{ 
								let querySave = {
									'to_user_id':mongoose.Types.ObjectId(data),
									'from_user_id':req.user._id,
									$addToSet:{song:song},
								}
								var save = await messageRepo.updateById(querySave,message._id);
								saveMesage.push(save)
							} */
					    }
                    });
                    
                });
                console.log('done')
            }
            await start();
			if(!_.isEmpty(saveMesage)){
				return { status: 200, data:saveMesage, message: 'Message sent successfully.' };
			}else{
				return { status: 200, data:[], message: 'Something went wrong.' };
			}
            async function asyncForEach(array, callback) {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                }
            }
		}catch (e) {
			return { status: 500, data: [], message: e.message };
		}
	}
	

	/* 
    // @Method: list
    // @Description: Message list
    */
   async list(req) {
	try {
		/* const messages = await messageRepo.list({ $or: [{'reciever_id':req.user._id},{'sender_id':req.user._id}] }); */
		const messages = await messageRepo.list({'reciever_id':req.user._id});
		if (!_.isEmpty(messages)) {
			return { status: 200, data: messages, message: 'Your inbox fetched successfully.' };
		}else {
			return { status: 201, data:[], message: 'no data found.' };
		}
	}catch (e) {
		return { status: 500, data: [], message: e.message };
	}
}
    
    
	
}

module.exports = new messageController();
