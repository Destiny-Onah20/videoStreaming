const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "This field is required!"]
  },
  email: {
    type: String,
    require: [true, "This field is required!"],
    unique: true
  },
  password: {
    type: String,
    require: [true, "This field is required!"]
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  subscribers: {
    type: Number
  },
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscriptions"
  }],
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlists"
  }],
  video: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Videos"
  }],
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "historys"
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "notifications"
  }]
}, {
  timestamps: true
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;