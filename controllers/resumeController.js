// import Resume from '../models/Resume.js';

// // @desc    Save a new resume
// // @route   POST /api/resumes
// // @access  Private
// const saveResume = async (req, res) => {
//   try {
//     const { name, data } = req.body;
//     const newResume = new Resume({
//       user: req.user._id,
//       name,
//       data
//     });

//     const savedResume = await newResume.save();
//     res.status(201).json(savedResume);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // @desc    Get all resumes for a user
// // @route   GET /api/resumes
// // @access  Private
// const getResumes = async (req, res) => {
//   try {
//     const resumes = await Resume.find({ user: req.user._id });
//     res.json(resumes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { saveResume, getResumes };

//23-11-24

import Resume from '../models/resumeModel.js';

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const resume = new Resume({
      user: req.user._id,
      name: req.body.name,
      data: req.body.data
    });

    const createdResume = await resume.save();
    res.status(201).json(createdResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (resume && resume.user.toString() === req.user._id.toString()) {
      res.json(resume);
    } else {
      res.status(404).json({ message: 'Resume not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createResume, getResumes, getResumeById };