const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    title: String,
    publishBy: String,
    desc: String,
    tag: [],
    image: [
      {
        type: Schema.Types.ObjectId,
        ref: "blogImage"
      }
    ]
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
