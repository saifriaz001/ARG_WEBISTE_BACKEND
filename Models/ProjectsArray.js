import mongoose from 'mongoose';

const projectArraySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Optional: for a unique identifier like "navbar"
            trim: true,
        },
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
