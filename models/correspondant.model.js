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
  mainImg: {
    type: String,
    required: [true, 'Correspondant needs a main image']
  },
  backgroundImg: {
    type: String,
    required: [true, 'Correspondant needs a background image']
  },
  slug: {
    type: String,
    required: [true, 'Correspondant needs a slug']
  },
  historicDetails: {
    type: String,
    required: [true, 'Correspondant needs a history']
  },
  geographicDescription: {
    type: String,
    required: [true, 'Correspondant needs a geographic description']
  },
  coordinates : [{
    type: Array,
  }],
  geographicLng: {
    type: Number,
    required: [true, 'Battle need a position']
  },
  geographicLat: {
    type: Number,
    required: [true, 'Battle need a position']
  },
  battle: {
    type: Schema.Types.ObjectId,
    ref: 'Battle',
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

const Correspondant = mongoose.model('Correspondant', correspondantSchema);
module.exports = Correspondant;