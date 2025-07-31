import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Job title is required."],
      trim: true,
    },

    location: {
      country: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
    },

    businessLine: {
      type: String,
      required: true,
      enum: [
        "Urban Design",
        "Commercial Buildings",
        "Residential Architecture",
        "Landscape Architecture",
      ],
    },

    careerArea: {
      type: String,
      required: true,
      enum: [
        "Architectural Design",
        "Project Management",
        "Interior Design",
        "Sustainability Consulting",
      ],
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

    qualifications: {
      type: [String],
      required: [true, "At least one qualification is required."],
    },

    workLocation: {
      type: String,
      required: [true, "Work location name is required."],
      enum: ["Remote", "Hybrid", "On-site"],
    },

    // status: {
    //   type: String,
    //   required: false,
    //   enum: ["Open", "Closed", "On Hold"],
    //   default: "Open",
    // },
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
