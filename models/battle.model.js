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
  slug: {
    type: String,
    required: [true, 'Battle needs a slug']
  }
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