import mongoose from 'mongoose';

const projectArraySchema = new mongoose.Schema(
  {
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectArray = mongoose.model('ProjectArray', projectArraySchema);
export default ProjectArray;