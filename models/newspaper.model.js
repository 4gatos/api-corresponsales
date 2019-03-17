const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newspaperSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Newspaper needs a name']
  },
  place: {
    type: String,
    required: [true, 'Newspaper needs a place']
  },
  type: {
    type: String,
  },
  ideology: {
    type: String,
  },
  editor: {
    type: String,
  },
  director: {
    type: String,
  },
  firstNumber: {
    type: String,
  },
  lastNumber: {
    type: String,
  },
  pages: {
    type: String,
  },
  language: {
    type: String,
  },
  foundLocalization: {
    type: String,
  },
  format: {
    type: String,
  },
  print: {
    type: String,
  },
  mainImg: {
    type: String,
    required: [true, 'Newspaper needs a main image']
  },
  description: {
    type: String,
    required: [true, 'Newspaper needs a description']
  },
  slug: {
    type: String,
    required: [true, 'Newspaper needs a slug']
  },
  geographicLng: {
    type: Number,
    required: [true, 'Newspaper need a position']
  },
  geographicLat: {
    type: Number,
    required: [true, 'Newspaper need a position']
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

const Newspaper = mongoose.model('Newspaper', newspaperSchema);
module.exports = Newspaper;