const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postEventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  message: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("postEvent", postEventSchema);
