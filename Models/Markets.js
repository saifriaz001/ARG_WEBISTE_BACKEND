import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true // Keep trimming here for uniqueness
    },
    heading: {
      type: String,
      required: true,
      index: true // ✅ indexed but not trimmed
    },
    description: {
      type: String,
      required: true,
      index: true // ✅ indexed to support full-text or keyword searches
    },
    imageUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// ✅ Slug generation based on name
marketSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[\s&]+/g, '-');
  }
  next();
});

// ✅ Optional compound index
marketSchema.index({ title: 1, heading: 1 }); // useful if you filter both

const Market = mongoose.model('Market', marketSchema);
export default Market;
