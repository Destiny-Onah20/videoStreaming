const Comment = require("../models/comment.model");
const Reply = require("../models/reply.models");
const Users = require("../models/users.models");
const Videos = require("../models/videos.model");

exports.videoComment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videoId = req.params.videoId;

    const { comment } = req.body;
    const theUser = await Users.findOne({ _id: userId });
    const theVideo = await Videos.findOne({ _id: videoId });
    if (!theVideo) {
      return res.status(400).json({
        message: "Video not found!"
      })
    };
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    const commentData = {
      comment,
      createdTime: formattedTime,
      userName: theUser.name
    }
    const Thecomments = await Comment.create(commentData);

    // Associate the comment with the video
    await Videos.updateOne(
      { _id: videoId },
      { $push: { comments: Thecomments._id } }
    );

    return res.status(201).json({
      message: "Success!",
      data: Thecomments
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
};

exports.getComment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;

    const theComment = await Comment.findById(commentId).populate("replies");
    if (!theComment) {
      return res.status(200).json({
        message: "No comment for now!"
      })
    }
    return res.status(200).json({
      data: theComment
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
}

exports.replyComment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;

    const { reply } = req.body;
    const theUser = await Users.findOne({ _id: userId });
    const theComment = await Comment.findOne({ _id: commentId });

    if (!theComment) {
      return res.status().json({
        message: "No comment found!"
      })
    }
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    const replyData = {
      reply,
      createdTime: formattedTime,
      userName: theUser.name
    };
    const replyy = await Reply.create(replyData);
    await Comment.updateOne(
      { _id: commentId },
      { $push: { replies: replyy._id, user: userId } }
    );

    return res.status(201).json({
      message: "Success!",
      data: replyy
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
};


exports.likeAcomment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    const theVideo = await Comment.findOne({
      _id: commentId,
      likers: userId
    });

    if (theVideo) {
      await Comment.updateOne({
        _id: commentId
      }, {
        $pull: {
          likers: userId
        },
        $inc: {
          totalLikes: -1
        }
      })
    } else {
      await Comment.updateOne({
        _id: commentId
      }, {
        $push: {
          likers: userId
        },
        $inc: {
          totalLikes: 1
        }
      })
    }

    return res.status(200).json({
      message: "Success!"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
};


exports.disLikeAcomment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    const theVideo = await Comment.findOne({
      _id: commentId,
      dislikers: userId
    });

    if (theVideo) {
      // Remove user from dislikers and decrease totalDislike count
      await Comment.updateOne(
        { _id: commentId },
        {
          $pull: { dislikers: userId },
          $inc: { totalDislike: -1 }
        }
      );
    } else {
      // Add user to dislikers and increase totalDislike count
      await Comment.updateOne(
        { _id: commentId },
        {
          $push: { dislikers: userId },
          $inc: { totalDislike: 1 }
        }
      );
    }

    return res.status(200).json({
      message: "Success!"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    });
  }
};


exports.likeAreply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const userId = req.params.userId;

    const theVideo = await Reply.findOne({
      _id: replyId,
      likers: userId
    });

    if (theVideo) {
      await Reply.updateOne({
        _id: replyId
      }, {
        $pull: {
          likers: userId
        },
        $inc: {
          totalLikes: -1
        }
      })
    } else {
      await Reply.updateOne({
        _id: replyId
      }, {
        $push: {
          likers: userId
        },
        $inc: {
          totalLikes: 1
        }
      })
    }

    return res.status(200).json({
      message: "Success!"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
};

exports.disLikeAreply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const userId = req.params.userId;

    const theVideo = await Reply.findOne({
      _id: replyId,
      dislikers: userId
    });

    if (theVideo) {
      // Remove user from dislikers and decrease totalDislike count
      await Reply.updateOne(
        { _id: replyId },
        {
          $pull: { dislikers: userId },
          $inc: { totalDislike: -1 }
        }
      );
    } else {
      // Add user to dislikers and increase totalDislike count
      await Reply.updateOne(
        { _id: replyId },
        {
          $push: { dislikers: userId },
          $inc: { totalDislike: 1 }
        }
      );
    }

    return res.status(200).json({
      message: "Success!"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    });
  }
};