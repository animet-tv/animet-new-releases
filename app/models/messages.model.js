const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Message = mongoose.Schema({
    title: { type: String },
    id: { type: String },
    episodeNumber: { type: Number },
    img_url: { type: String }
},{ _id : false });


const OldMessageSchema = mongoose.Schema({
    messages: [Message]
});
OldMessageSchema.plugin(beautifyUnique);

const OldMessage = module.exports = mongoose.model('OldMessage', OldMessageSchema);

module.exports.getOldMessage = async (callback) => {
    try {
        OldMessage.find({},{_id: 0})
        .then(
            _result => {
                callback(null, _result);
            }
        )
    } catch (error) {
        console.log(error);
        callback(null, false);
    }
}
