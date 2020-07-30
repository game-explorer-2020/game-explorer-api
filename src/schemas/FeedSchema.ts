import mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  }
});

export default mongoose.model('Feed', FeedSchema);
