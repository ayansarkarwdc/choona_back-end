const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const applemusicController = require('webservice/applemusic.controller');




/**
 * @api {get} /applemusic/token  Token applemusic
 
 * @apiGroup Activity
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktKN0RKQjM3NjgifQ.eyJpYXQiOjE1ODk0NjE4MzksImV4cCI6MTYwNTAxMzgzOSwiaXNzIjoiSDIzVzNFRVJMSyJ9.L-mhSqbspX_-YJhT5al5x05vGFePZ3VQK_ftUiQvjbhWdSxgNlFAA-O6HNKcnxWvZlmhWFelloz-TuXVIriIkg",
    "message": "Success"
}
*/

namedRouter.get("api.applemusic.token", '/applemusic/token', request_param.any(), async (req, res) => {
  try {
    const success = await applemusicController.getAppleMusicToken(req, res);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error);
  }
});


module.exports = router;