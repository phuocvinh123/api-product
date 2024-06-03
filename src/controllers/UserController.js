import UserService from '../services/UserService.js';
import { isEmail } from '../utils/index.js';
import variable from '../variable.js';
import { jwtDecode } from 'jwt-decode';

const createUser = async (req, res) => {
  try {
    const { email, username, password, gender, province, dob, lastName, firstName } = req.body;
    if (
      !email ||
      !username ||
      !password ||
      !gender ||
      !province ||
      !dob ||
      !lastName ||
      !firstName
    ) {
      return res.status(200).json(variable.NOT_EMPTY);
    }
    if (!isEmail(email)) return res.status(400).json(variable.INVALID_EMAIL);
    const response = await UserService.createUser(req.body);
    return res.status(response.status === 'OK' ? 200 : 400).json(response);
  } catch (error) {
    return res.status(400).json(variable.HAS_ERROR);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json(variable.NOT_EMPTY);
    if (!isEmail(email)) return res.status(400).json(variable.INVALID_EMAIL);

    const response = await UserService.loginUser(req.body);
    if (response.status === 'OK') return res.status(200).json(response);
    return res.status(400).json(response);
  } catch (error) {
    return res.status(400).json(variable.HAS_ERROR);
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwtDecode(token);
    const response = await UserService.getMe(decoded.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(variable.HAS_ERROR);
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(variable.HAS_ERROR);
  }
};

const UserController = {
  createUser,
  loginUser,
  getMe,
  getAll,
};
export default UserController;
