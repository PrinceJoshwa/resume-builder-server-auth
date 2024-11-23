//23-11-24
//server/controllers/userController
// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// // @desc    Auth user with Google
// // @route   POST /api/users/google
// // @access  Public
// const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { name, email, sub: googleId } = ticket.getPayload();

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId,
//       });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export { googleAuth };

//GPT
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Updated to use id_token
const googleAuth = async (req, res) => {
  try {
    const { id_token } = req.body; // Updated to expect id_token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google authentication error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export { googleAuth };
