import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  }
});

export default mongoose.model('Game', GameSchema);
