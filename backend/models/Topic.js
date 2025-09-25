// backend/models/Topic.js
import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hints: [{ type: String, required: true }],
  snippets: [{ type: String, required: true }],
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
