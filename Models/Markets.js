import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate titles
      trim: true
    },
    mainHeading: {
      type: String,
      required: true,
      index: true
    },
    mainDescription: {
      type: String,
      required: true,
      index: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    secondHeading: {
      type: String
    },
    secondDescription: {
      type: String
    },
    descriptionImageUrl: {
      type: String
    },
    highlightsHeading: {
      type: String
    },
    highlightsDescriptions: {
      type: [String] // Array of bullet points
    },
    highlightsDescriptionImageUrl: {
      type: String
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// ✅ Slug generation based on title
marketSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[\s&]+/g, '-');
  }
  next();
});

// ✅ Optional compound index (removed invalid 'heading' field)
marketSchema.index({ title: 1, mainHeading: 1 });

const Market = mongoose.model('Market', marketSchema);
export default Market;
