import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
      index: true,
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Auto-generate slug from title if not provided
serviceSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[\s&]+/g, '-')         // spaces and "&" → "-"
      .replace(/[^\w\-]+/g, '')        // remove invalid characters
      .replace(/\-\-+/g, '-');         // collapse multiple dashes
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
