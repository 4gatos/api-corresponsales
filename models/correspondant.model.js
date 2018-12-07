const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const correspondantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Correspondant needs a name']
  },
  country: {
    type: String,
    required: [true, 'Correspondant needs a country']
  },
  date: {
    type: String,
    required: [true, 'Correspondant needs a date']
  },
  newspaper: {
    type: String,
    required: [true, 'Correspondant needs a newspaper']
  },
  slug: {
    type: String,
    required: [true, 'Correspondant needs a slug']
  },
  battle: {
    type: Schema.Types.ObjectId,
    ref: 'Battle',
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

const Correspondant = mongoose.model('Correspondant', correspondantSchema);
module.exports = Correspondant;