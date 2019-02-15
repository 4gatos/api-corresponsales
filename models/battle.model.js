const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const battleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Battle needs a name']
  },
  place: {
    type: String,
    required: [true, 'Battle needs a place']
  },
  date: {
    type: String,
    required: [true, 'Battle needs a date']
  },
  duration: {
    type: String,
    required: [true, 'Battle needs a duration']
  },
  mainImg: {
    type: String,
    required: [true, 'Battle needs a main image']
  },
  slug: {
    type: String,
    required: [true, 'Battle needs a slug']
  },
  history: {
    type: String,
    required: [true, 'Battle needs a history']
  },
  geographicDescription: {
    type: String,
    required: [true, 'Battle needs a geographicDescription']
  },
  geographicLng: {
    type: Number,
    required: [true, 'Battle need a position']
  },
  geographicLat: {
    type: Number,
    required: [true, 'Battle need a position']
  },
  importantPeople: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false
  },
  otherFields: [{
    title: String,
    body: String,
    img: String
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

const Battle = mongoose.model('Battle', battleSchema);
module.exports = Battle;