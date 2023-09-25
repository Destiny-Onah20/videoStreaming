const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  tutor: {
    type: String,
    require: [true, "This field is required!"]
  },
  title: {
    type: String,
    require: [true, "This field is required!"]
  },
  description: {
    type: String,
    require: [true, "This field is required!"]
  },
  videoFile: {
    type: String
  },
  videoId: {
    type: String
  },
  tags: {
    type: String,
    require: [true, "This field is required!"]
  },
  category: {
    type: String,
    require: [true, "This field is required!"]
  },
  minutes: {
    type: Date,
    require: [true, "This field is required!"]
  },
  seconds: {
    type: Date,
  },
  hours: {
    type: Date,
  },
  userView: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  views: {
    type: Number,
  },
  playlists: {
    type: String,
  },
  likers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  totalLikes: {
    type: Number,
  },
  totalDislike: {
    type: Number,
  },
  dislikers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins"
  }
}, {
  timestamps: true
});

const Videos = mongoose.model("Videos", videoSchema);

module.exports = Videos;