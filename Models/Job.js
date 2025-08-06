import mongoose from "mongoose";
import { trim } from "zod";

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Job title is required."],
      trim: true,
    },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    businessLine: {
      type: String,
      required: true,
    },

    careerArea: {
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

    description: {
      type: String,
      required: [true, "Job description is required."],
    },

    minRequirements: {
      type: [String],
      required: [true, "At least one minimum requirement is required."],
    },

    qualifications: {
      type: [String],
      required: [true, "At least one qualification is required."],
    },

    workLocation: {
      type: String,
      required: [true, "Work location name is required."],
      enum: ["Remote", "Hybrid", "On-site"],
    },
    applyFormLink: {
      type: String,
      required: [true, "Apply form link is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[\s&]+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }
  next();
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
