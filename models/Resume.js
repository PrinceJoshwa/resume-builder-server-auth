import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;

