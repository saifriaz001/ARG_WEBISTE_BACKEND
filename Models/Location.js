import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
      index: true,
    },
    town: {
      type: String,
      required: true,
      index: true,
    }
  },
  {
    timestamps: true, 
  }
);

// Optional compound index for optimization
locationSchema.index({ country: 1, state: 1, town: 1 });

const Location = mongoose.model('Location', locationSchema);

export default Location;
