const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      require: true,
      //trim is to eliminate white space before and after.
      trim: true
    },
    writtenBy: {
      type: String,
      requre: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      require: true
    },
    commentBody: {
      type: String,
      require: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

  // get total count of replies on retrieval
  CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

//const Comment = model('replies', ReplySchema);
const Comment = model('Comment', CommentSchema);

module.exports = Comment;