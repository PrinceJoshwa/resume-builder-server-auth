import Resume from '../models/Resume.js';

// @desc    Save a new resume
// @route   POST /api/resumes
// @access  Private
const saveResume = async (req, res) => {
  try {
    const { name, data } = req.body;
    const newResume = new Resume({
      user: req.user._id,
      name,
      data
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { saveResume, getResumes };

