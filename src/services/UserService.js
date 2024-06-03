import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import { generateAccessToken, generateRefreshToken } from '../utils/index.js';

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = newUser;
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        resolve({
          status: 'ERROR',
          message: 'Email này đã tồn tại.',
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({ ...newUser, password: hash });
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'Đăng ký thành công.',
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = payload;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        resolve({
          status: 'ERROR',
          message: 'Tài Khoản này không tồn tại.',
        });
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        resolve({
          status: 'ERROR',
          message: 'Mật khẩu không chính xác.',
        });
      }
      const accessToken = generateAccessToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });

      const refreshToken = generateRefreshToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });

      resolve({
        status: 'OK',
        message: 'Đăng nhập thành công.',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getMe = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (user) {
        resolve({
          status: 'OK',
          message: 'Xem thông tin bản thân.',
          data: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      if (users.length) {
        resolve({
          status: 'OK',
          message: 'Lấy danh sách users.',
          data: users,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const UserService = {
  createUser,
  loginUser,
  getMe,
  getAll,
};
export default UserService;
