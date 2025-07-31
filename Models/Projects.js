import mongoose from 'mongoose';
import { required } from 'zod/mini';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    },
    country:{
      type: String,
      required: true,
      index: true,
    },
    state:{
      type: String,
      required: true,
      index: true,  
    },
    city:{
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // ✅ References
    market: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Market',
      required: true,
    }],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      }
    ],
  },
  {
    timestamps: true,
  }
);

// 🔁 Generate slug from title
projectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[\s&]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
