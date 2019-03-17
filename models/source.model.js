const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Source needs a name']
  },
  place: {
    type: String,
    required: [true, 'Source needs a place']
  },
  date: {
    type: String,
  },
  dateNewspaper: {
    type: String,
    required: [true, 'Source needs a date']
  },
  mainImg: {
    type: String,
    required: [true, 'Source needs a main image']
  },
  description: {
    type: String,
    required: [true, 'Source needs a description']
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
  newspaper: {
    type: Schema.Types.ObjectId,
    ref: 'Newspaper',
  },
  approved: {
    type: Boolean,
    default: false
  },
  otherFields: [{
    title: String,
    body: String,
    img: String,
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

const Source = mongoose.model('Source', sourceSchema);
module.exports = Source;