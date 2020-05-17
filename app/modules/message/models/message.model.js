var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender_id: {type: Schema.Types.ObjectId, ref: 'User'},
  reciever_id: {type: Schema.Types.ObjectId, ref: 'User'},
  'song':{type:String},
  created_at: {type: Date, default: Date.now}
 });

module.exports = mongoose.model('Message', MessageSchema);