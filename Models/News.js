import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    }],
    markets: [{
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
    date: {
        type: String, // use ISO string (e.g., "2024-07-25")
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    imageUrl: {
        type: String,
        default: '', // optional field
    }
}, {
    timestamps: true,
});

// ✅ Slug generation based on name
newsSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title.toLowerCase().replace(/[\s&]+/g, '-');
    }
    next();
});


const News = mongoose.model('News', newsSchema);

export default News;
