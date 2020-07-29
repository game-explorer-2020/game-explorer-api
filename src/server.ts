import app from './app';
import mongoose from 'mongoose';

app.listen(process.env.PORT || 3333);

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
