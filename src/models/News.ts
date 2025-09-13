import mongoose from 'mongoose';

// Define the News schema
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create or get the model
const News = mongoose.models.News || mongoose.model('News', NewsSchema);

export default News;
