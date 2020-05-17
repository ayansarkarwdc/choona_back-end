const mongoose = require('mongoose');
const Activity = require('activity/models/activity.model');
const perPage = config.PAGINATION_PERPAGE;
var moment = require('moment');

const activityRepository = {

    list: async (param) => {
        try {
            let activities = await Activity.aggregate([
                {$match:param},
                { "$lookup": {
                    "from": "users",
                    "localField": "from_user_id",
                    "foreignField": "_id",
                    "as": "fromUsers"
                    }
                },
                { "$unwind": "$fromUsers" },
                {
                    "$group":{
                        '_id':"$_id",
                        'full_name':{$first:"$fromUsers.full_name"},
                        'profile_image':{$first:"$fromUsers.profile_image"},
                        'username':{$first:"$fromUsers.username"},
                        'user_id':{$first:"$fromUsers._id"},
                        'activity_type':{$first:"$activity_type"},
                        'created_at':{$first:"$created_at"},
                    }
                }

            ]).sort({'created_at':-1});
            if (!activities) {
                return null;
            }

            return activities;

        } catch (e) {
            return e;
        }
    },
    
    getById: async (id) => {
        try {
            let activities = await Activity.findById(id).exec();
            if (!activities) {
                return null;
            }
            return activities;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {

        try {
            let activities = await Activity.findOne(params).exec();
            if (!activities) {
                return null;
            }
            return activities;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let activities = await Activity.find(params).exec();
            if (!activities) {
                return null;
            }
            return activities;

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
            let activities = await Activity.create(data);
            if (!activities) {
                return null;
            }
            return activities;
        } catch (e) {
            return e;
        }
    },
};

module.exports = activityRepository;