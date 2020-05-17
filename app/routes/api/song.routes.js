const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const songController = require('webservice/song.controller');


namedRouter.all('/song*', auth.authenticateAPI);

/**
 * @api {post} /song/store  Store Song
 * @apiGroup Song
 * @apiParam {id} song_id Song Id
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "_id": "5eb52192ecb87c2c4eedf42e",
        "song_id": "5ea174f4c7d64cd82bddd54a",
        "user_id": "5eb3e8bfc26a203c69957603",
        "createdAt": "2020-05-08T09:08:34.833Z",
        "__v": 0
    },
    "message": "Your song saved successfully."
}
*/
namedRouter.post("api.song.store", '/song/store', request_param.any(), async (req, res) => {
    try {
        const success = await songController.store(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /song/sent/store  Share / Send Song
 * @apiGroup Song
 * @apiParam {id} song_id Song Id
 * @apiParam {id} shared_user_id User id to send song
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "_id": "5eb523a9ed51692f40fcb817",
        "shared_user_id": "5eb3e8bfc26a203c69957603",
        "song_id": "5ea174f4c7d64cd82bddd54a",
        "user_id": "5eb3e8bfc26a203c69957603",
        "createdAt": "2020-05-08T09:17:29.522Z",
        "__v": 0
    },
    "message": "Your song shared successfully."
}
*/
namedRouter.post("api.song.send", '/song/sent/store', request_param.any(), async (req, res) => {
    try {
        const success = await songController.saveSent(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});





module.exports = router;