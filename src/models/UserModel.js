import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    province: { type: String, required: true },
    dob: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    avatar: { type: String, default: 'https://source.unsplash.com/random' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
