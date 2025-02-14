
import mongoose from 'mongoose';
const ArticleSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ArticleModels = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
export default ArticleModels
