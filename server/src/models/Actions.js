const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionsSchema = new Schema(
  {
    spaceUrl: { type: String, required: true },
    userName: { type: String, required: true },
    objectId: { type: String, required: true },
    objectOldDetails: { type: Schema.Types.Mixed },
    objectNewDetails: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Action = mongoose.model('Action', actionsSchema);

module.exports = Action;
