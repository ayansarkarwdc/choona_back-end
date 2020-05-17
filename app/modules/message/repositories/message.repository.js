const mongoose = require('mongoose');
const Message = require('message/models/message.model');
const perPage = config.PAGINATION_PERPAGE;
var moment = require('moment');

const messageRepository = {

    list: async (param) => {
        try {
            let inbox = await Message.aggregate([
                {$match:param},
                /* { "$lookup": {
                    "from": "users",
                    "localField": "reciever_id",
                    "foreignField": "_id",
                    "as": "recieverDetails"
                    }
                }, */
                /* { "$unwind": "$recieverDetails" },*/
                { "$lookup": {
                    "from": "users",
                    "localField": "sender_id",
                    "foreignField": "_id",
                    "as": "senderDetails"
                    }
                },
                { "$unwind": "$senderDetails" },
                {
                    "$group":{
                        '_id':"$_id",
                        'sender_full_name':{$first:"$senderDetails.full_name"},
                        'sender_profile_image':{$first:"$senderDetails.profile_image"},
                        'sender_username':{$first:"$senderDetails.username"},
                        'sender_user_id':{$first:"$senderDetails._id"},
                        'song':{$first:"$song"},
                        'sender_user_id':{$first:"$recieverDetails._id"},
                        /* 'reciever_full_name':{$first:"$recieverDetails.full_name"},
                        'reciever_profile_image':{$first:"$recieverDetails.profile_image"},
                        'reciever_username':{$first:"$recieverDetails.username"},
                        'reciever_user_id':{$first:"$recieverDetails._id"},
                        'reciever_user_id':{$first:"$recieverDetails._id"}, */
                        'created_at':{$first:"$created_at"},
                    }
                }

            ]).sort({'created_at':-1});
            if (!inbox) {
                return null;
            }

            return inbox;

        } catch (e) {
            return e;
        }
    },
    
    getById: async (id) => {
        try {
            let messages = await Message.findById(id).exec();
            if (!messages) {
                return null;
            }
            return messages;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {

        try {
            let messages = await Message.findOne(params).exec();
            if (!messages) {
                return null;
            }
            return messages;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let messages = await Message.find(params).exec();
            if (!messages) {
                return null;
            }
            return messages;

        } catch (e) {
            return e;
        }
    },

    updateById: async (data, id) => {
        try {
            let messages = await Message.findByIdAndUpdate(id, data, { new: true});

            if (!messages) {
                return null;
            }
            return messages;
        } catch (e) {
            return e;
        }
    },

    

    delete: async (id) => {
        try {
            
        } catch (e) {
            return e;
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


   
   

    save: async (data) => {
        try {
            let messages = await Message.create(data);
            if (!messages) {
                return null;
            }
            return messages;
        } catch (e) {
            return e;
        }
    },
};

module.exports = messageRepository;