const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSourcesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Source needs a name']
  },
  place: {
    type: String,
  },
  mainImg: {
    type: String,
    required: [true, 'Source needs a main image']
  },
  slug: {
    type: String,
    required: [true, 'Source needs a slug']
  },
  geographicLng: {
    type: Number,
    required: [true, 'Source need a position']
  },
  geographicLat: {
    type: Number,
    required: [true, 'Source need a position']
  },
  approved: {
    type: Boolean,
    default: false
  },
  sources: [{
    type: Schema.Types.ObjectId,
    ref: 'Source',
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const GroupSources = mongoose.model('GroupSources', groupSourcesSchema);
module.exports = GroupSources;