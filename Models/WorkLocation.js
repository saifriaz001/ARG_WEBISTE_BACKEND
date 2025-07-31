import mongoose from "mongoose";

const { Schema } = mongoose;

const workLocationSchema = new Schema({
  name: {
    type: String,
    required: [true, "Work location name is required."],
    unique: true,
    enum: ["Remote", "Hybrid", "On-site"],
  },
});

const WorkLocation = mongoose.model("WorkLocation", workLocationSchema);

export default WorkLocation;
