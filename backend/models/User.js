// models/User.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  mobile: { type: String, required: true },
  otpSignup: { type: String },
  otp: { type: String },
  signupStatus: { type: Boolean, default: false },
  jwt: { type: String },
  jwtExpiration: { type: Date },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  modifiedBy: { type: String },
  createdBy: { type: String },
});

userSchema.pre('save', function(next) {
  if (this.mobile === null) {
    return next(new Error('Mobile number cannot be null'));
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
