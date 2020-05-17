const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const messageController = require('webservice/message.controller');


namedRouter.all('/message*', auth.authenticateAPI);

/**
 * @api {post} /message/store  Store
 
 * @apiGroup Inbox
 * @apiParam {array} receiver_id Receiver User Id [receiver_id[0]=1,receiver_id[2]=2]
 * @apiParam {array} song song Selected Song [song[0]='aaa']
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [
        {
            "_id": "5eb538f5521e0638a5bceadb",
            "full_name": "Jhon doe",
            "profile_image": "profile_image_1588848830991_tst.jpg",
            "username": "spotify",
            "user_id": "5eb3e8bfc26a203c69957603",
            "activity_type": "following",
            "created_at": null
        }
    ],
    "message": "Your activities fetched successfully."
}
*/

namedRouter.post("api.message.store", '/message/store', request_param.any(), async (req, res) => {
    try {
        const success = await messageController.store(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /message/list   List
 
 * @apiGroup Inbox
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [
        {
            "_id": "5eb57a9e560f17264998e6a9",
            "sender_full_name": "Jhon doe",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "spotify",
            "sender_user_id": null,
            "song": "e",
            "created_at": "2020-05-08T15:28:30.698Z"
        },
        {
            "_id": "5eb57a9e560f17264998e6a8",
            "sender_full_name": "Jhon doe",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "spotify",
            "sender_user_id": null,
            "song": "d",
            "created_at": "2020-05-08T15:28:30.613Z"
        },
        {
            "_id": "5eb57a9e560f17264998e6a7",
            "sender_full_name": "Jhon doe",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "spotify",
            "sender_user_id": null,
            "song": "a",
            "created_at": "2020-05-08T15:28:30.532Z"
        },
        {
            "_id": "5eb57a9e560f17264998e6a6",
            "sender_full_name": "Jhon doe",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "spotify",
            "sender_user_id": null,
            "song": "e",
            "created_at": "2020-05-08T15:28:30.452Z"
        },
        {
            "_id": "5eb57a9e560f17264998e6a5",
            "sender_full_name": "Jhon doe",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "spotify",
            "sender_user_id": null,
            "song": "d",
            "created_at": "2020-05-08T15:28:30.369Z"
        },
        {
            "_id": "5eb57a9e560f17264998e6a4",
            "sender_full_name": "DJ OHEM",
            "sender_profile_image": "profile_image_1588848830991_tst.jpg",
            "sender_username": "ohem",
            "sender_user_id": null,
            "song": "a",
            "created_at": "2020-05-08T15:28:30.276Z"
        }
    ],
    "message": "Your inbox fetched successfully."
}
*/
namedRouter.get("api.message.list", '/message/list', request_param.any(), async (req, res) => {
    try {
        const success = await messageController.list(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


module.exports = router;