//23-11-24

import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
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
    personalInfo: {
      name: String,
      title: String,
      email: String,
      phone: String,
      location: String
    },
    skills: [String],
    experience: [{
      title: String,
      company: String,
      startDate: String,
      endDate: String,
      description: String
    }],
    education: [{
      degree: String,
      school: String,
      startDate: String,
      endDate: String
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String
    }]
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
