var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  from_user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  to_user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  'activity_type':{type:String,default:'normal',enum:['following']},
  createdAt: {type: Date, default: Date.now}
 });

module.exports = mongoose.model('Activity', ActivitySchema);