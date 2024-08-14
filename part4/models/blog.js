import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      content: String,
      id: mongoose.Types.ObjectId,
    },
  ],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.comments) {
      returnedObject.comments.forEach((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;
      });
    }
  },
});

export default mongoose.model("Blog", blogSchema);
