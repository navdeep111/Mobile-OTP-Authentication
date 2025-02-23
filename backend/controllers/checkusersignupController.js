import User from '../models/User.js';
import jwt from 'jsonwebtoken';

function generateAccessToken(phoneNumber) {
  console.log('Generating token for:', phoneNumber);
	let x = jwt.sign({ mobileNumber: phoneNumber }, "secretKey");
  console.log('Token generated:', x);
	return x;
}

export const checkuserexistance = async (req, res) => {
  try {
    // const User = createUserModel(req.db);
    const { phoneNumber } = req.body;
    console.log('Received request to send OTP to:', phoneNumber);

    // Check if the user already exists
    const existingUser = await User.findOne({ mobile: phoneNumber });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    // If user does not exist, create a new one
    const user = await User.create({ mobile: phoneNumber });
    console.log('New user created:', user);

    return res.status(200).json({ message: 'User created successfully',user,token: generateAccessToken(phoneNumber) });
    
    // return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ msg: 'Error during user creation', error: err.message });
  }
};
