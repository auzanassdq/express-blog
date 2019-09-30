const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var blogSchema = new Schema(
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

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
