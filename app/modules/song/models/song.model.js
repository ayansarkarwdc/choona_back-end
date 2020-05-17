var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  song_id: { type:String},
  createdAt: {type: Date, default: Date.now}
 });

module.exports = mongoose.model('song', SongSchema);